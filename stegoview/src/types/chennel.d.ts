export interface SessionData {
    channelId: string
    channelName: string
    channelExpiredAt: number
    rsaPublicKey?: string
    rsaPublicKeyBase64: string
    signiture: string
}

export interface SocketAuthPayload {
    channelId: string
    sessionKey: string
}
