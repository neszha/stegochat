import fs from 'fs-extra'
import * as path from 'path'
import { SHA256 } from 'crypto-js'
import * as randomString from 'randomstring'
import rpeImage from '../rpe-image'
import { type StegoDecodeData } from '../rpe'

describe('Test Get Capacity of Images', () => {
    it('Success get message capacity from image 01', async () => {
        const coverImagePath = path.join(__dirname, 'examples/img-01.png')
        const capacity = await rpeImage.getCapacity(coverImagePath).catch(console.log)
        expect(capacity).toEqual(6_000_000)
    })

    it('Success get message capacity from image 02', async () => {
        const coverImagePath = path.join(__dirname, 'examples/img-02.png')
        const capacity = await rpeImage.getCapacity(coverImagePath).catch(console.log)
        expect(capacity).toEqual(1_500_000)
    })
})

describe('Test Encoding and Decoding for Image', () => {
    it('Success make stego image from image 01', async () => {
        // Encoding.
        const seed: string = randomString.generate({ charset: 'numeric', length: 6 })
        const message = randomString.generate(1024)
        const coverImagePath = path.join(__dirname, 'examples/img-01.png')
        const stegoData = await rpeImage.encoding(coverImagePath, message, Number(seed))
        expect(stegoData.coverSize).toEqual(6_000_000)
        expect(stegoData.messageSize).toBeDefined()
        expect(fs.existsSync(stegoData.coverPath)).toEqual(true)
        expect(fs.existsSync(stegoData.stegoPath)).toEqual(true)

        // Compare cover and stego image.
        const coverImageData = fs.readFileSync(stegoData.coverPath, 'utf8').toString()
        const stegoImageData = fs.readFileSync(stegoData.stegoPath, 'utf8').toString()
        expect(SHA256(coverImageData).toString()).not.toEqual(SHA256(stegoImageData).toString())

        // Decoding: Extract the message.
        const stegoDecodeData: StegoDecodeData = await rpeImage.decoding(stegoData.stegoPath, Number(seed))
        expect(stegoDecodeData.message).toEqual(message)
    })

    it('Success make stego image from image 02', async () => {
        // Encoding.
        const seed: string = randomString.generate({ charset: 'numeric', length: 6 })
        const message = randomString.generate(1024)
        const coverImagePath = path.join(__dirname, 'examples/img-02.png')
        const stegoData = await rpeImage.encoding(coverImagePath, message, Number(seed))
        expect(stegoData.coverSize).toEqual(1_500_000)
        expect(stegoData.messageSize).toBeDefined()
        expect(fs.existsSync(stegoData.coverPath)).toEqual(true)
        expect(fs.existsSync(stegoData.stegoPath)).toEqual(true)

        // Compare cover and stego image.
        const coverImageData = fs.readFileSync(stegoData.coverPath, 'utf8').toString()
        const stegoImageData = fs.readFileSync(stegoData.stegoPath, 'utf8').toString()
        expect(SHA256(coverImageData).toString()).not.toEqual(SHA256(stegoImageData).toString())

        // Decoding: Extract the message.
        const stegoDecodeData: StegoDecodeData = await rpeImage.decoding(stegoData.stegoPath, Number(seed))
        expect(stegoDecodeData.message).toEqual(message)
    })
})
