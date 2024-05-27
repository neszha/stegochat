/**
 * Random Pixel Embedding (RPE) Algorithm Module
 */
import fs from 'fs-extra'
import * as path from 'path'
import sharp, { type OutputInfo, type Metadata } from 'sharp'
import PRNG from '../PRNG'
import { type StegoDecodeData, type StegoData } from './rpe-type'

// Global configs.
const N_LSB = 2
const MESSAGE_BRACKET = ':\\\\:message://::'

/**
 * Get hex color pixels from image.
 */
const getHexColorPixelsImage = async (imageData: Buffer, imageInfo: OutputInfo): Promise<string[]> => {
    const hexColorPixels: string[] = []
    for (let i = 0; i < imageData.length; i += imageInfo.channels) {
        for (let j = 0; j < imageInfo.channels; j++) {
            const hexPixel = imageData[i + j].toString(16).padStart(2, '0')
            hexColorPixels.push(hexPixel)
        }
    }
    return hexColorPixels
}

/**
 * Convert biner to string.
 */
const getStringFromBinnary = (stringBinner: string): string => {
    let message: string = ''
    for (let i = 0; i < stringBinner.length; i += 8) {
        const bin8bit = stringBinner.slice(i, i + 8)
        const charMessage = String.fromCharCode(parseInt(bin8bit, 2))
        message += charMessage
    }
    return message
}

export default {
    /**
     * Get capacity of cover image.
     */
    async getCapacity (imagePath: string): Promise<number> {
        // Check image path.
        if (!fs.existsSync(imagePath)) {
            return 0
        }

        // Get image meta data.
        const meta: Metadata = await sharp(imagePath).metadata()
        if (meta.width === undefined || meta.height === undefined || meta.channels === undefined) {
            return 0
        }

        // Calculate capacity.
        return N_LSB * meta.width * meta.height * meta.channels
    },

    /**
     * Encoding to stego image.
     */
    async encoding (imagePath: string, message: string, seed: number): Promise<StegoData> {
        // Check image path.
        if (!fs.existsSync(imagePath)) {
            throw new Error('File image not exits.')
        }

        // Convert message to binary matrix.
        const messageBinarry: string[] = []
        const messageWordBinarry: string[] = []
        const messageWithBracket = MESSAGE_BRACKET.replace('message', message)
        for (let i = 0; i < messageWithBracket.length; i++) {
            let binary = messageWithBracket.charCodeAt(i).toString(2)
            while (binary.length < 8) {
                binary = '0' + binary
            }
            for (let j = 0; j < binary.length / N_LSB; j++) {
                messageBinarry.push(binary.slice(j * N_LSB, (j * N_LSB) + N_LSB))
            }
            messageWordBinarry.push(binary)
        }

        // Validate message capasity.
        const messageSize = messageBinarry.length * 2
        const capacity = await this.getCapacity(imagePath)
        if (messageSize > capacity) {
            throw new Error('Message size is too large.')
        }

        // Get data color pixel from image.
        const { data, info } = await sharp(imagePath).raw().toBuffer({ resolveWithObject: true })
        const hexColorPixels = await getHexColorPixelsImage(data, info)

        // Embbed binary message to image data.
        const rand = new PRNG(seed)
        const mapPixels: boolean[] = Array.from({ length: hexColorPixels.length }, () => false)
        let messageBinarryIndex = 0
        while (messageBinarryIndex !== messageBinarry.length - 1) {
            const messageBinarryData = messageBinarry[messageBinarryIndex]

            // Get image pixel index.
            const randomNumber: number = rand.random()
            const targetIndex: number = randomNumber % mapPixels.length
            if (mapPixels[targetIndex]) continue

            // Inject messahe to image color pixel.
            const pixelColoHex: string = hexColorPixels[targetIndex]
            let pixelColorBinarry: string = parseInt(pixelColoHex, 16).toString(2)
            while (pixelColorBinarry.length < 8) {
                pixelColorBinarry = '0' + pixelColorBinarry
            }
            const pixelColorEmbeddedBinarry = pixelColorBinarry.slice(0, 8 - N_LSB) + messageBinarryData
            const hexColorEndPixel = parseInt(pixelColorEmbeddedBinarry, 2).toString(16)
            hexColorPixels[targetIndex] = hexColorEndPixel

            // Next loop.
            mapPixels[targetIndex] = true
            messageBinarryIndex++
        }

        // Render data image to stego image.
        const ext = path.extname(imagePath)
        const tempDir = path.join(__dirname, '.rpe')
        const stegoData: StegoData = {
            message,
            coverSize: capacity,
            messageSize: messageBinarry.length,
            coverPath: path.join(tempDir, `cover-image${ext}`),
            stegoPath: path.join(tempDir, `stego-image${ext}`)
        }
        if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true })
        fs.mkdirSync(tempDir)
        await sharp(data, { raw: info }).toFile(stegoData.coverPath)
        const dataBuffer = Buffer.from(hexColorPixels.map(hex => parseInt(hex, 16)))
        await sharp(dataBuffer, { raw: info }).png().toFile(stegoData.stegoPath)

        // Done.
        return stegoData
    },

    /**
     * Decoding to stego image.
     */
    async decoding (stegoImagePath: string, seed: number): Promise<StegoDecodeData> {
        // Check image path.
        if (!fs.existsSync(stegoImagePath)) {
            throw new Error('File image not exits.')
        }

        // Get data color pixel from image.
        const { data, info } = await sharp(stegoImagePath).raw().toBuffer({ resolveWithObject: true })
        const hexColorPixels = await getHexColorPixelsImage(data, info)

        // Find embeded message from stego image.
        let message: string = ''
        let messageBinarry: string = ''
        const rand = new PRNG(seed)
        const mapPixels: boolean[] = Array.from({ length: hexColorPixels.length }, () => false)
        while (!message.includes('://:')) {
            // Get image pixel index.
            const randomNumber: number = Number(rand.random().toString().replace('.', ''))
            const targetIndex: number = randomNumber % mapPixels.length
            if (mapPixels[targetIndex]) continue

            // Extract the binary message.
            const pixelColoHex: string = hexColorPixels[targetIndex]
            let pixelColorBinarry: string = parseInt(pixelColoHex, 16).toString(2)
            while (pixelColorBinarry.length < 8) {
                pixelColorBinarry = '0' + pixelColorBinarry
            }
            messageBinarry += pixelColorBinarry.slice(8 - N_LSB, 8)

            // Convert message to string.
            if (messageBinarry.length % 8 === 0) {
                message = getStringFromBinnary(messageBinarry)

                // Check start message bracket.
                if (message.length === 4 && message !== ':\\\\:') {
                    throw new Error('No data inside.')
                }
            }

            // Next loop.
            mapPixels[targetIndex] = true
        }

        // Done.
        const result: StegoDecodeData = {
            message: message.replace(':\\\\:', '').replace('://:', '')
        }
        return result
    }
}
