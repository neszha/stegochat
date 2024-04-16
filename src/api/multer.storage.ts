import path from 'path'
import fs from 'fs-extra'
import multer from 'multer'
import { SHA1 } from 'crypto-js'

const STORAGE_PATH = path.join(process.cwd(), 'storage')
export const UPLOAD_IMAGE_DIR_PATH = path.join(STORAGE_PATH, 'upload-images')
export const PUBLIC_IMAGE_DIR_PATH = path.join(STORAGE_PATH, 'public-images')

if (!fs.existsSync(UPLOAD_IMAGE_DIR_PATH)) fs.mkdirSync(UPLOAD_IMAGE_DIR_PATH)
if (!fs.existsSync(PUBLIC_IMAGE_DIR_PATH)) fs.mkdirSync(PUBLIC_IMAGE_DIR_PATH)

/**
 * Upload image.
 */
const uploadImageStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, UPLOAD_IMAGE_DIR_PATH)
    },
    filename: function (req, file, callback) {
        const fileNameHash = SHA1(JSON.stringify(file)).toString()
        callback(null, fileNameHash + path.extname(file.originalname))
    }
})
export const uploadImage = multer({ storage: uploadImageStorage })
