import { PNG } from 'pngjs';
import { readFile } from 'fs';
import _ from 'lodash';

class PngCompare {
  static async loadPngFile(pathOrBuffer) {
    // Load buffer of path
    if (!(pathOrBuffer instanceof Buffer)) {
      pathOrBuffer = await new Promise((resolve, reject) => {
        readFile(pathOrBuffer, (err, data) => {
          if (err) return reject(err)
          resolve(data)
        });
      })
    }

    // Load PNG from buffer
    return new Promise((resolve, reject) => {
      const png = new PNG(this.pngOptions)
      png.parse(pathOrBuffer, err => {
        if (err) return reject(err)
        resolve(png)
      })
    })
  }

  static async mse(png1, png2) {
    const pngs = [png1, png2];
    for (let i in pngs) {
      if (!(pngs[i] instanceof PNG)) pngs[i] = await this.loadPngFile(pngs[i])
    }

    if (pngs[0].width !== pngs[1].width || pngs[0].height !== pngs[1].height) {
      throw new Error('Width or height does not equal')
    }

    if (pngs[0].data.length !== pngs[1].data.length) {
      throw new Error('Data buffer length does not equal')
    }

    const square = (a) => a * a,
      channelIndex = [0, 1, 2],
      channelMax = 255 * 255,
      area = pngs[0].width * pngs[1].height

    let mse = 0
    for (let i = 0; i < pngs[0].data.length; i += 4) {
      const rgbas = pngs.map(png => png.data.slice(i, i + 4))
      const rgbs = rgbas.map(rgba => channelIndex.map(i => rgba[i] * rgba[3]))
      channelIndex.forEach(i => mse += square(rgbs[0][i] - rgbs[1][i]))
    }

    return mse / 3.0 / (channelMax * channelMax) / area
  }

  static async psnr(png1, png2) {
    const mse = await this.mse(png1, png2)
    return 10 * Math.log10(1 / mse)
  }
}

export default PngCompare;