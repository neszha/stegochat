import path from 'path'
import fs from 'fs-extra'
import randomString from 'randomstring'
import { type Request, type Response } from 'express'
import { SHA256, enc } from 'crypto-js'
import rsa from '../../modules/RSA/rsa'
import redis from '../databases/redis.db'
import rpeImage from '../../modules/RPE/rpe-image'
import { type ChannelStegoPayload, type ChannelAuthPayload } from '../types/chennel'
import { APP_BASE_URL } from '../../constants/environment'

export default {

    /**
     * Create Stego Channel
     */
    async createStegoChannel (req: Request, res: Response): Promise<void> {
        try {
            // Get the request data.
            const name: string = req.body.name
            const file: Express.Multer.File | undefined = req.file
            const expired: number = Number(req.body.expired ?? 0)

            // Validate request data.
            if (file === undefined || name === undefined) {
                res.status(400).json({
                    error: 'Invalid request body.'
                })
                return
            }

            // Generate RSA key, seed, chanelId and channel screeat key.
            const rsaKey = rsa.generateKeys()
            const seed: number = Number(randomString.generate({ charset: 'numeric', length: 16 }))
            const channelId: string = randomString.generate(64)
            const channelSecretKey: string = randomString.generate(1024)

            // Save channel auth payload to redis with ttl.
            const channelAuthPayload: ChannelAuthPayload = {
                channelId,
                channelName: name,
                rsaPrivateKey: rsaKey.private,
                channelSecretKey,
                seed
            }
            const redisChannelKey = 'channel:' + channelId
            await redis.set(redisChannelKey, JSON.stringify(channelAuthPayload), { EX: expired })

            // Generate embedding message.
            const channelStegoPayload: ChannelStegoPayload = {
                channelId,
                channelName: name,
                rsaPublicKey: rsaKey.public,
                channelExpiredAt: new Date().getTime() + (expired * 60 * 1_000)
            }
            const channelStegoPayloadBase64: string = enc.Base64url.stringify(enc.Utf8.parse(JSON.stringify(channelStegoPayload))).toString()
            const channelStegoPayloadSigniture: string = SHA256(channelStegoPayloadBase64 + channelStegoPayloadBase64).toString()
            const embeddingMessage = channelStegoPayloadBase64 + '.' + channelStegoPayloadSigniture

            // Validate cover image capasity.
            const coverCapacity = await rpeImage.getCapacity(file.path)
            if (coverCapacity < 10_000) {
                res.json({
                    error: 'Ukuran file image terlalu kecil.'
                })
                return
            }

            // Hide message to image.
            const stegoImagePath = file.path.replace('cover-images', 'stego-images')
            const stego = await rpeImage.encoding(file.path, embeddingMessage, seed)
            fs.moveSync(stego.stegoPath, stegoImagePath, { overwrite: true })

            // Create stego download link.
            const stegoImageUrl = `${APP_BASE_URL}/stego-images/${path.basename(stegoImagePath)}`

            // Done.
            res.json({
                data: {
                    stegoImage: stegoImageUrl,
                    message: embeddingMessage
                }
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                error: 'Terjadi masalah!'
            })
        }
    }
}
