import path from 'path'
import fs from 'fs-extra'
import randomString from 'randomstring'
import { type Request, type Response } from 'express'
import { SHA256, enc } from 'crypto-js'
import rsa from '../../modules/RSA/rsa'
import redis from '../databases/redis.db'
import rpeImage from '../../modules/RPE/rpe-image'
import { APP_BASE_URL } from '../../constants/environment'
import { type StegoDecodeData } from '../../modules/RPE/rpe-type'
import { type ChannelStegoPayload, type ChannelAuthPayload } from '../types/chennel'

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
                res.status(400).json({ error: 'Invalid request body.' })
                return
            }

            // Generate RSA key, seed, chanelId and channel screeat key.
            const rsaKey = rsa.generateKeys()
            const seed: string = randomString.generate({ charset: 'numeric', length: 16 })
            const channelId: string = randomString.generate(32)
            const channelSecretKey: string = randomString.generate(1024)

            // Generate embedding message.
            const channelStegoPayload: ChannelStegoPayload = {
                channelId,
                channelName: name,
                channelExpiredAt: new Date().getTime() + (expired * 1_000),
                rsaPublicKeyBase64: enc.Base64url.stringify(enc.Utf8.parse(rsaKey.public))
            }
            const channelStegoPayloadBase64: string = enc.Base64url.stringify(
                enc.Utf8.parse(JSON.stringify(channelStegoPayload))
            ).toString()
            const channelStegoPayloadSigniture: string = SHA256(channelStegoPayloadBase64 + channelSecretKey).toString()
            const embeddingMessage = channelStegoPayloadBase64 + '.' + channelStegoPayloadSigniture

            // Calculate message bit size.
            const messageSize: number = embeddingMessage.length * 8

            // Validate cover image capasity.
            const coverCapacity = await rpeImage.getCapacity(file.path)
            if (coverCapacity < (messageSize * 2)) {
                res.json({ error: 'Image file size is too small.' })
                return
            }

            // Hide message to image.
            const stegoImagePath = file.path.replace('upload-images', 'public-images')
            const stego = await rpeImage.encoding(file.path, embeddingMessage, Number(seed))
            fs.moveSync(stego.stegoPath, stegoImagePath, { overwrite: true })

            // Save RPE seed to redis with ttl.
            const stegoImageBuffer = fs.readFileSync(stegoImagePath)
            const hashOfStegoImage: string = SHA256(Buffer.from(stegoImageBuffer).toString('base64')).toString()
            const redisRpeSeedKey = 'rpe-seed:' + hashOfStegoImage
            await redis.set(redisRpeSeedKey, seed, { EX: expired })

            // Save channel auth payload to redis with ttl.
            const channelAuthPayload: ChannelAuthPayload = {
                channelId,
                channelName: name,
                rsaPrivateKey: rsaKey.private,
                channelSecretKey
            }
            const redisChannelKey = 'channel:' + channelId
            await redis.set(redisChannelKey, JSON.stringify(channelAuthPayload), { EX: expired })

            // Create stego download link.
            const stegoImageUrl = `${APP_BASE_URL}/images/${path.basename(stegoImagePath)}`

            // Done.
            res.json({
                data: {
                    stegoImage: stegoImageUrl,
                    message: embeddingMessage
                }
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Getting error!' })
        }
    },

    /**
     * Get Stego Chennel Info.
     */
    async getStegoChannelInfo (req: Request, res: Response): Promise<void> {
        try {
            // Get the request data.
            const file: Express.Multer.File | undefined = req.file

            // Validate request data.
            if (file === undefined) {
                res.status(400).json({ error: 'Invalid request body.' })
                return
            }

            // Get rpe seed from redis.
            const stegoImageBuffer = fs.readFileSync(file.path)
            const hashOfStegoImage: string = SHA256(Buffer.from(stegoImageBuffer).toString('base64')).toString()
            const redisRpeSeedKey = 'rpe-seed:' + hashOfStegoImage
            const seed: string | null = await redis.get(redisRpeSeedKey)
            if (seed === null) {
                res.status(400).json({ error: 'No data inner image.' })
                return
            }

            // Get message from image.
            const stegoDecode: StegoDecodeData = await rpeImage.decoding(file.path, Number(seed))

            // Validate signiture.
            const [base64Payload, signiture] = stegoDecode.message.split('.')
            const channelStegoPayload: ChannelStegoPayload = JSON.parse(
                enc.Base64url.parse(base64Payload).toString(enc.Utf8)
            )
            const chennelAuthPayloadData: string | null = await redis.get(`channel:${channelStegoPayload.channelId}`)
            if (chennelAuthPayloadData === null) {
                res.status(400).json({ error: 'No data inner image.' })
                return
            }
            const channelAuthPayload: ChannelAuthPayload = JSON.parse(chennelAuthPayloadData)
            const serverSignature: string = SHA256(base64Payload + channelAuthPayload.channelSecretKey).toString()
            if (signiture !== serverSignature) {
                res.status(400).json({ error: 'Stego signature is not valid.' })
                return
            }

            // Done.
            res.json({
                data: {
                    ...channelStegoPayload,
                    signiture
                }
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Getting error!' })
        }
    }
}
