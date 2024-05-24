import sharp from 'sharp'
import mse from './mse'

export const getPixelDataFromImagePath = async (imagePath: string): Promise<number[]> => {
    // Get image data from image path.
    const { data: imageData, info: imageInfo } = await sharp(imagePath).raw().toBuffer({ resolveWithObject: true })

    // Convert hex to decimal each pixel.
    const imageDecimalData: number[] = []
    for (let i = 0; i < imageData.length; i += imageInfo.channels) {
        for (let j = 0; j < imageInfo.channels; j++) {
            const hexPixel = imageData[i + j].toString(16).padStart(2, '0')
            const deximalValue = parseInt(hexPixel, 16)
            imageDecimalData.push(deximalValue)
        }
    }

    // Done.
    return imageDecimalData
}

/**
 * Good pnr is > 30dB.
 */

// Thanks for your source code: https://github.com/bytespider/psnr/blob/master/src/psnr.js
const max = 255
export default (originalPixel: number[], noisyPixel: number[]): number => {
    const mseResult: number = mse(originalPixel, noisyPixel, 1)
    const psnr: number = 10 * Math.log10(max / mseResult)
    if (psnr === Infinity) return 0
    return psnr
}
