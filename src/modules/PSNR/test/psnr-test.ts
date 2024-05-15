// eslint-disable-next-line import/no-duplicates
import { countPSNR } from '../psnr'
// eslint-disable-next-line import/no-duplicates
import PngCompare from '../psnr.js'
import Path from 'path'
import Fs from 'fs'

const img1 = 'storage/upload-images/1d0ee4efbfbd9ae55ec76a55e6960ae0e82eebee.png'
const img2 = 'storage/public-images/1d0ee4efbfbd9ae55ec76a55e6960ae0e82eebee.png'

const recount = async (img1: string, img2: string): Promise<void> => {
    console.log('dari TS', await countPSNR(img1, img2))
}
// const psnr = PngCompare.psnr(
//     Path.join(img1),
//     Path.join(img2)
// )
const getPsnr = async (img1: string, img2: string): Promise<number> => {
    const bufferA = Fs.readFileSync(Path.join(img1))
    const bufferB = Fs.readFileSync(Path.join(img2))
    const pnsrBuffer = await PngCompare.psnr(bufferA, bufferB)
    return pnsrBuffer
}

// console.log(psnr)
// console.log(pnsrBuffer)
void getPsnr(img1, img2).then((result) => {
    console.log('dari JS', result)
})
void recount(img1, img2)
