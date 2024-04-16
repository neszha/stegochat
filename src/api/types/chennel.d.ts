export interface ChannelAuthPayload {
    channelId: string
    channelName: string
    rsaPrivateKey: string
    channelSecretKey: string
}

export interface ChannelStegoPayload {
    channelId: string
    channelName: string
    channelExpiredAt: number
    rsaPublicKeyBase64: string
}
