import { type Socket, type Server } from 'socket.io'
import redis from './api/databases/redis.db'
import { type ChannelAuthPayload } from './api/types/chennel'
import { type SocketAuthPayload } from './types/socket'

export const io: Server | null = null

const sendExitEvent = (socket: Socket): void => {
    socket.emit('event', 'exit')
}

export const socketConnectionHandler = (ioServer: Server): void => {
    // Register io to io state.
    const io = ioServer

    // Client connection callback.
    io.on('connection', async (socket: Socket): Promise<void> => {
        console.log('clinet connected:', socket.id)

        // Clinet disconnection callback.
        socket.on('disconnect', () => {
            console.log('clinet disconnected:', socket.id)
        })

        // Handdle handshake payload.

        // Validate auth connections.
        const authPayload = socket.handshake.auth as SocketAuthPayload
        const channelDataJsonString = await redis.get(`channel:${authPayload.channelId}`)
        if (channelDataJsonString === null || authPayload.sessionKey === undefined) {
            // Send exit event.
            sendExitEvent(socket)
            return
        }
        const channelData = JSON.parse(channelDataJsonString) as ChannelAuthPayload

        // Decrypt session key inner auth payload.
        // const nodeRSA = new NodeRSA(channelData.rsaPrivateKey)
        // console.log({ channelData, authPayload })
        // authPayload.sessionKey = nodeRSA.decrypt(authPayload.sessionKey, 'utf8')

        // Create private channel.
        const roomChannelKey = `room:${authPayload.channelId}`
        await socket.join(roomChannelKey)
    })
}
