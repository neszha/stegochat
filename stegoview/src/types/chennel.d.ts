import { type ChatTypeEnum } from './enums'

export interface SessionData {
    channelId: string
    channelName: string
    channelExpiredAt: number
    rsaPublicKey?: string
    rsaPublicKeyBase64: string
    signiture: string
}

export interface SocketAuthPayload {
    event: string
    channelId: string
    name: string
    sessionKey: string
}

export interface ChatMessagePayload {
    id: string
    name: string
    timestamp: number
    content: string
    timestampString?: string
}

export interface Chat {
    type: ChatTypeEnum
    payload: ChatMessagePayload
}
