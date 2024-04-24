import { io } from 'socket.io-client'
import { API_BASE_URL } from './constants/environment'

/** Create socket connection. */
const socket = io(API_BASE_URL, {
    path: '/ws',
    auth: {
        token: ''
    },
    transports: ['websocket']
})

export default socket
