import { Router } from 'express'
import appController from './controllers/app.controller'
import channelControler from './controllers/channel.controler'
import { saveCoverImage } from './multer.storage'

/** Endpoint level: /api/* */
const api = Router()

/**
 * Root API.
 */
api.get('/', appController.getApiStatus)

/**
 * Root Channel API.
 */
api.post('/channel', saveCoverImage.single('coverImage'), channelControler.createStegoChannel)

export default api
