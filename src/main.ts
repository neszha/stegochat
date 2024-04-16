import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import { createServer } from 'http'
import { APP_PORT } from './constants/environment'
import apiRouter from './api/router'
import redis from './api/databases/redis.db'
import { STEGO_IMAGE_DIR_PATH } from './api/multer.storage'

/**
 * Create express app.
 * */
const app = express()
const httpServer = createServer(app)

/**
 * Middlewhare express in main level.
 * */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: true }))
app.use(morgan('tiny'))

/**
 * Setup routes express.
 * */
app.use('/api', apiRouter)
app.use('/stego-images', express.static(STEGO_IMAGE_DIR_PATH))

/** Starting HTTP server. */
httpServer.listen(APP_PORT, async () => {
    console.clear()
    await redis.connect()
    console.log(`Stegochat server listening on *:${APP_PORT}`)
})
