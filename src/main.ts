import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { APP_PORT } from './constants/environment'
import apiRouter from './api/router'
import redis from './api/databases/redis.db'
import { PUBLIC_IMAGE_DIR_PATH } from './api/multer.storage'
import { socketConnectionHandler } from './socket'

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
app.use('/images', express.static(PUBLIC_IMAGE_DIR_PATH))

/** Starting web socker server. */
const ioServer: Server = new Server(httpServer, { path: '/ws' })
socketConnectionHandler(ioServer)

/** Starting HTTP server. */
httpServer.listen(APP_PORT, async () => {
    console.clear()
    await redis.connect()
    console.log(`Stegochat server listening on *:${APP_PORT}`)
})
