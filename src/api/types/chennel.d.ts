// Data saved in redis db.
export interface ChannelAuthPayload {
    channelId: string
    channelName: string
    rsaPrivateKey: string
    channelSecretKey: string
}

// Data for inject into cover image.
export interface ChannelStegoPayload {
    channelId: string
    channelName: string
    channelExpiredAt: number
    rsaPublicKeyBase64: string
}
