export interface ChannelAuthPayload {
    channelId: string
    channelName: string
    rsaPrivateKey: string
    channelSecretKey: string
    seed: number
}

export interface ChannelStegoPayload {
    channelId: string
    channelName: string
    rsaPublicKey: string
    channelExpiredAt: number
}
