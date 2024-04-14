import fs from 'fs-extra'
import * as path from 'path'
import * as randomString from 'randomstring'
import rpeImage from '../rpe-image'

describe('Test Get Capacity of Images', () => {
    it('Success get message capacity from image 01', async () => {
        const coverImagePath = path.join(__dirname, 'examples/img-01.jpg')
        const capacity = await rpeImage.getCapacity(coverImagePath).catch(console.log)
        expect(capacity).toEqual(6_000_000)
    })

    it('Success get message capacity from image 02', async () => {
        const coverImagePath = path.join(__dirname, 'examples/img-02.jpg')
        const capacity = await rpeImage.getCapacity(coverImagePath).catch(console.log)
        expect(capacity).toEqual(1_500_000)
    })
})

describe('Test Encoding and Decoding for Image', () => {
    it('Success make stego image from image 01', async () => {
        // Encoding.
        const seed: string = randomString.generate({ charset: 'numeric', length: 6 })
        const message = randomString.generate(1024)
        const coverImagePath = path.join(__dirname, 'examples/img-01.jpg')
        const stegoData = await rpeImage.encoding(coverImagePath, message, Number(seed))
        expect(stegoData.coverSize).toEqual(6_000_000)
        expect(stegoData.messageSize).toBeDefined()
        expect(fs.existsSync(stegoData.coverPath)).toEqual(true)
        expect(fs.existsSync(stegoData.stegoPath)).toEqual(true)
    })

    it('Success make stego image from image 02', async () => {
        // Encoding.
        const seed: string = randomString.generate({ charset: 'numeric', length: 6 })
        const message = randomString.generate(1024)
        const coverImagePath = path.join(__dirname, 'examples/img-02.jpg')
        const stegoData = await rpeImage.encoding(coverImagePath, message, Number(seed))
        expect(stegoData.coverSize).toEqual(1_500_000)
        expect(stegoData.messageSize).toBeDefined()
        expect(fs.existsSync(stegoData.coverPath)).toEqual(true)
        expect(fs.existsSync(stegoData.stegoPath)).toEqual(true)
    })
})
