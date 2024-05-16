import path from 'path'
import psnr, { getPixelDataFromImagePath } from '../psnr'

describe('Test PSNR Module', () => {
    it('Success get PSNR 0 with 4x4 sampe pixel data', () => {
        const originalPixel = [0, 0, 0, 255]
        const noisyPixel = [0, 0, 0, 255]
        const psnrResult = psnr(originalPixel, noisyPixel)
        expect(psnrResult).toEqual(0)
    })

    it('Success get PSNR with 4x4 different pixel data', () => {
        const originalPixel = [0, 0, 0, 255]
        const noisyPixel = [0, 15, 0, 255]
        const psnrResult = psnr(originalPixel, noisyPixel)
        expect(psnrResult).not.toEqual(0)
    })

    it('Success get PSNR with image path.', async () => {
        const coverImagePath = path.join(__dirname, 'examples/cover-image.png')
        const stegoImagePath = path.join(__dirname, 'examples/stego-image.png')

        // Get pixel data from image path.
        const coverImagePixelData: number[] = await getPixelDataFromImagePath(coverImagePath)
        const stegoImagePixelData: number[] = await getPixelDataFromImagePath(stegoImagePath)

        // Get PSNR.
        const psnrResult = psnr(coverImagePixelData, stegoImagePixelData)
        expect(psnrResult > 30).toBe(true) // Good value of psnr is > 30dB.
    })
})
