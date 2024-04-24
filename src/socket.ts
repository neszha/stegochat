import { type Socket, type Server } from 'socket.io'

export const io: Server | null = null

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
    })
}
