// Thansk for your source code: https://github.com/bytespider/psnr/blob/master/src/psnr.js
export default (originalPixel: number[], noisyPixel: number[], step: number = 1): number => {
    let error: number
    let sum: number = 0
    let i: number = 0

    for (i = 0; i < originalPixel.length; i += step) {
        error = originalPixel[i] - noisyPixel[i]
        sum += error * error
    }
    return sum / originalPixel.length
}
