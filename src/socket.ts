import { AES, enc } from 'crypto-js'
import { type Socket, type Server } from 'socket.io'
import rsa from './modules/RSA/rsa'
import redis from './api/databases/redis.db'
import { type ChannelAuthPayload } from './api/types/chennel'
import { type SocketConnectionKey, type ClientSocketConnection, type SocketAuthPayload, type ChatMessagePayload } from './types/socket'

export let io: Server | null = null

// Client connection store.
const clinetConnections: ClientSocketConnection = {}

const broadcastMessageToAnotherClient = (chatMessagePayload: ChatMessagePayload, channelId: string, mySocketId: string): void => {
    if (io === null) return

    // Get another client connection data in same channel.
    const clientConnectionKeys = Object.keys(clinetConnections)
        .filter(key => key.includes(channelId))
        .filter(key => !key.includes(mySocketId))
    const channelClientConnections: SocketAuthPayload[] = []
    for (const key of clientConnectionKeys) {
        const data: SocketAuthPayload = clinetConnections[key]
        if (data !== undefined && data.socketId !== mySocketId) {
            channelClientConnections.push(data)
        }
    }

    // Send message each client connection.
    for (const clientConnectionData of channelClientConnections) {
        if (clientConnectionData.socketId === undefined) continue
        if (clientConnectionData.sessionKey === undefined) continue

        // Get socket objek of client id.
        const socket = io.sockets.sockets.get(clientConnectionData.socketId)
        if (socket === undefined) continue

        // Encrypt chat payload using AES-256 with session key.
        const chiperMessage = AES.encrypt(JSON.stringify(chatMessagePayload), clientConnectionData.sessionKey).toString()

        // Send message.
        socket.emit('message', chiperMessage)
        console.log('send message:', {
            from: mySocketId,
            to: clientConnectionData.socketId,
            payload: chiperMessage
        })
    }
}

const sendExitEvent = (socket: Socket): void => {
    socket.emit('event', 'exit')
}

export const socketConnectionHandler = (ioServer: Server): void => {
    // Register io to io state.
    io = ioServer

    // Client connection callback.
    io.on('connection', async (socket: Socket): Promise<void> => {
        console.log('clinet connected:', { id: socket.id })

        // Validate auth connections.
        const authPayload = socket.handshake.auth as SocketAuthPayload
        const channelDataJsonString = await redis.get(`channel:${authPayload.channelId}`)
        if (channelDataJsonString === null || authPayload.sessionKey === undefined || authPayload.name === undefined) {
            // Send exit event.
            sendExitEvent(socket)
            return
        }
        const channelData = JSON.parse(channelDataJsonString) as ChannelAuthPayload

        // Decrypt and ans session key inner auth payload using RSA.
        authPayload.name = rsa.decrypt(authPayload.name, channelData.rsaPrivateKey)
        authPayload.sessionKey = rsa.decrypt(authPayload.sessionKey, channelData.rsaPrivateKey)
        authPayload.socketId = socket.id

        // Store connection into private channel.
        const socketConnectionKey: SocketConnectionKey = `${channelData.channelId}_${socket.id}`
        clinetConnections[socketConnectionKey] = authPayload

        // Message handler callback.
        socket.on('message', (chiperMessage: string) => {
            try {
                // Decrypt message.
                if (authPayload.sessionKey === undefined) return
                const chatMessageJsonString = AES.decrypt(chiperMessage, authPayload.sessionKey).toString(enc.Utf8)
                const chatMessagePayload = JSON.parse(chatMessageJsonString) as ChatMessagePayload

                // Broadcast message.
                broadcastMessageToAnotherClient(chatMessagePayload, channelData.channelId, socket.id)
            } catch (error) {
                console.log(error)
            }
        })

        // Clinet disconnection callback.
        socket.on('disconnect', () => {
            console.log('clinet disconnected:', { id: socket.id })

            // Delete client from connection store.
            if (Object.prototype.hasOwnProperty.call(clinetConnections, socketConnectionKey)) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete clinetConnections[socketConnectionKey]
            }
        })
    })
}
