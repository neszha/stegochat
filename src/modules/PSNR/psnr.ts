import { PNG } from 'pngjs'
import fs from 'fs-extra'

const readImg = async (pathOrBuffer: any): Promise<Buffer> => {
    let fileBuffer = pathOrBuffer
    // load buffer of path
    if (!(pathOrBuffer instanceof Buffer)) {
        fileBuffer = await new Promise((resolve, reject) => {
            fs.readFile(pathOrBuffer as fs.PathOrFileDescriptor, (err: any, data: any) => {
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (err) reject(err)
                resolve(data)
            })
        })
    };

    // load PNG from buffer
    return await new Promise((resolve, reject) => {
        const png = new PNG()
        png.parse(fileBuffer as string | Buffer, (err: any, data: any) => {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (err) reject(err)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            resolve(data)
        })
    })
}

const countMSE = async (img1: string, img2: string): Promise<number> => {
    const png = [await readImg(img1), await readImg(img2)]

    // check image size
    if (png[0].width !== png[1].width || png[0].height !== png[1].height) {
        throw new Error('Image size mismatch')
    }

    // check length
    if (png[0].data.length !== png[1].data.length) {
        throw new Error('Image length mismatch')
    }

    // constant squared error
    const square = (a: number): number => a * a
    const channelIndex = [0, 1, 2]
    const channelMax = 255 * 255
    const area = png[0].width * png[1].height

    // calculate MSE
    let mse = 0
    for (let i = 0; i < png[0].data.length; i += 4) {
        const rgbas = png.map(png => png.data.slice(i, i + 4))
        const rgbs = rgbas.map(rgba => channelIndex.map(i => rgba[i]))
        channelIndex.forEach(i => {
            mse += square(rgbs[0][i] - rgbs[1][i])
        })
    }

    return mse / 3.0 / (channelMax * channelMax) / area
}

const countPSNR = async (img1: string, img2: string): Promise<number> => {
    const mse = await countMSE(img1, img2)
    return 10 * Math.log10(1 / mse)
}

export { countPSNR }
