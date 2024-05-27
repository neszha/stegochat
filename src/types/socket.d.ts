export type SocketConnectionKey = string // channlId + _ + socketId

export interface SocketAuthPayload {
    event: string
    channelId: string | undefined
    name: string | undefined
    sessionKey: string | undefined
    socketId: string | undefined
}

export type ClientSocketConnection = Record<SocketConnectionKey, SocketAuthPayload>

export interface ChatMessagePayload {
    id: string
    name: string
    timestamp: number
    content: string
}
