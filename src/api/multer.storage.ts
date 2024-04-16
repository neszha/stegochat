import path from 'path'
import fs from 'fs-extra'
import multer from 'multer'
import { SHA1 } from 'crypto-js'

const STORAGE_PATH = path.join(process.cwd(), 'storage')
export const COVER_IMAGE_DIR_PATH = path.join(STORAGE_PATH, 'cover-images')
export const STEGO_IMAGE_DIR_PATH = path.join(STORAGE_PATH, 'stego-images')

if (!fs.existsSync(COVER_IMAGE_DIR_PATH)) fs.mkdirSync(COVER_IMAGE_DIR_PATH)
if (!fs.existsSync(STEGO_IMAGE_DIR_PATH)) fs.mkdirSync(STEGO_IMAGE_DIR_PATH)

/**
 * Upload cover image.
 */
const saveCoverImageStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, COVER_IMAGE_DIR_PATH)
    },
    filename: function (req, file, callback) {
        const fileNameHash = SHA1(JSON.stringify(file)).toString()
        callback(null, fileNameHash + path.extname(file.originalname))
    }
})
export const saveCoverImage = multer({ storage: saveCoverImageStorage })
