import { Router } from 'express'
import appController from './controllers/app.controller'
import channelControler from './controllers/channel.controler'
import { uploadImage } from './multer.storage'

/** Endpoint level: /api/* */
const api = Router()

/**
 * Root API.
 */
api.get('/', appController.getApiStatus)

/**
 * Root Channel API.
 */
api.post('/channel', uploadImage.single('coverImage'), channelControler.createStegoChannel)
api.post('/channel/info', uploadImage.single('stegoImage'), channelControler.getStegoChannelInfo)

export default api
