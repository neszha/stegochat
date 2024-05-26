import fs from 'fs-extra'
import * as path from 'path'
import { SHA256 } from 'crypto-js'
import * as randomString from 'randomstring'
import rpeImage from '../rpe-image'
import { type StegoDecodeData } from '../rpe-type'
import psnr, { getPixelDataFromImagePath } from '../../PSNR/psnr'

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

describe('Test Evaluation RPE each size variants', () => {
    const seed: string = '123'
    const message100Btye = randomString.generate(100)
    const result: any[] = []

    it('Evaluation RPE with img-10x10.png', async () => {
        const coverImagePath = path.join(__dirname, 'examples/img-10x10.png')
        try {
            await rpeImage.encoding(coverImagePath, message100Btye, Number(seed))
        } catch (error) {
            result.push({
                imageSize: '10x10',
                capacity: (10 * 10) * 3 * 2,
                PSNR: 'error',
                extractSuccess: false
            })
        }
    })

    it('Evaluation RPE with img-100x100.png', async () => {
        const coverImagePath = path.join(__dirname, 'examples/img-100x100.png')
        const stegoData = await rpeImage.encoding(coverImagePath, message100Btye, Number(seed))
        const stegoDecodeData = await rpeImage.decoding(stegoData.stegoPath, Number(seed))
        const coverImagePixelData: number[] = await getPixelDataFromImagePath(stegoData.coverPath)
        const stegoImagePixelData: number[] = await getPixelDataFromImagePath(stegoData.stegoPath)
        result.push({
            imageSize: '100x100',
            capacity: (100 * 100) * 3 * 2,
            PSNR: psnr(coverImagePixelData, stegoImagePixelData),
            extractSuccess: (stegoDecodeData.message === message100Btye)
        })
    })

    it('Evaluation RPE with img-250x250.png', async () => {
        const coverImagePath = path.join(__dirname, 'examples/img-250x250.png')
        const stegoData = await rpeImage.encoding(coverImagePath, message100Btye, Number(seed))
        const stegoDecodeData = await rpeImage.decoding(stegoData.stegoPath, Number(seed))
        const coverImagePixelData: number[] = await getPixelDataFromImagePath(stegoData.coverPath)
        const stegoImagePixelData: number[] = await getPixelDataFromImagePath(stegoData.stegoPath)
        result.push({
            imageSize: '250x250',
            capacity: (250 * 250) * 3 * 2,
            PSNR: psnr(coverImagePixelData, stegoImagePixelData),
            extractSuccess: (stegoDecodeData.message === message100Btye)
        })
    })

    it('Evaluation RPE with img-500x500.png', async () => {
        const coverImagePath = path.join(__dirname, 'examples/img-500x500.png')
        const stegoData = await rpeImage.encoding(coverImagePath, message100Btye, Number(seed))
        const stegoDecodeData = await rpeImage.decoding(stegoData.stegoPath, Number(seed))
        const coverImagePixelData: number[] = await getPixelDataFromImagePath(stegoData.coverPath)
        const stegoImagePixelData: number[] = await getPixelDataFromImagePath(stegoData.stegoPath)
        result.push({
            imageSize: '500x500',
            capacity: (500 * 500) * 3 * 2,
            PSNR: psnr(coverImagePixelData, stegoImagePixelData),
            extractSuccess: (stegoDecodeData.message === message100Btye)
        })
    })

    it('Evaluation RPE with img-1000x1000.png', async () => {
        const coverImagePath = path.join(__dirname, 'examples/img-1000x1000.png')
        const stegoData = await rpeImage.encoding(coverImagePath, message100Btye, Number(seed))
        const stegoDecodeData = await rpeImage.decoding(stegoData.stegoPath, Number(seed))
        const coverImagePixelData: number[] = await getPixelDataFromImagePath(stegoData.coverPath)
        const stegoImagePixelData: number[] = await getPixelDataFromImagePath(stegoData.stegoPath)
        result.push({
            imageSize: '1000x1000',
            capacity: (1000 * 1000) * 3 * 2,
            PSNR: psnr(coverImagePixelData, stegoImagePixelData),
            extractSuccess: (stegoDecodeData.message === message100Btye)
        })
    })

    it('Show result', () => {
        console.table(result)
    })
})
