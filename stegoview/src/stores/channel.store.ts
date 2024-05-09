import forge from 'node-forge'
import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'
import { AES, enc } from 'crypto-js'
import socket from '@/socket'
import { STORAGE_SC_NAME_KEY, STORAGE_SC_SESSION_KEY } from '@/middlewares/auth.middleware'
import { type SocketAuthPayload, type SessionData, type ChatMessagePayload, type Chat } from '@/types/chennel'
import { ChatTypeEnum } from '@/types/enums'

interface ChannelStore {
    name: string
    sessionKey: string
    session: SessionData
    chats: Chat[]
}

export const SOTRAGE_SC_CHATS = 'sc_chats'

export const useChannelStore = defineStore('channel', {
    /**
     * States.
     */
    state: (): ChannelStore => ({
        name: '',
        sessionKey: '', // Random by frontend.
        session: {
            channelId: '',
            channelName: '',
            channelExpiredAt: 0,
            rsaPublicKey: '',
            rsaPublicKeyBase64: '',
            signiture: ''
        },
        chats: []
    }),

    /**
     * Actions.
     */
    actions: {
        channelInit (): void {
            this.loadLocalStorageData()
            this.socketMessageHandler()
            this.createSocketConnection()
        },

        socketMessageHandler (): void {
            // Event message handler.
            socket.on('event', (key: string) => {
                if (key === 'exit') this.exitChannel()
            })

            // Chat message handler.
            socket.on('message', (chiperMessage: string) => {
                // Decrypt message.
                const chatMessageJsonString = AES.decrypt(chiperMessage, this.sessionKey).toString(enc.Utf8)
                const chatMessagePayload = JSON.parse(chatMessageJsonString) as ChatMessagePayload

                // Save message to state and store.
                const chat: Chat = {
                    type: ChatTypeEnum.ANOTHER,
                    payload: chatMessagePayload
                }
                this.chats.push(chat)
                localStorage.setItem(SOTRAGE_SC_CHATS, JSON.stringify(this.chats))
                console.log('incoming chat message:', chatMessagePayload)
            })
        },

        sendChatMessage (message: string): void {
            // Encrypt chat payload using AES-256 with session key.
            const chatMessagePayload: ChatMessagePayload = {
                id: uuidv4(),
                name: this.name,
                timestamp: new Date().getTime(),
                content: message
            }
            const chiperMessage = AES.encrypt(JSON.stringify(chatMessagePayload), this.sessionKey).toString()

            // Send message.
            socket.emit('message', chiperMessage)

            // Save message to state and store.
            const chat: Chat = {
                type: ChatTypeEnum.ME,
                payload: chatMessagePayload
            }
            this.chats.push(chat)
            localStorage.setItem(SOTRAGE_SC_CHATS, JSON.stringify(this.chats))
        },

        createSocketConnection (): void { // Handshake
            if (this.session.rsaPublicKey === undefined) {
                this.exitChannel()
                return
            }

            // Generate session key.
            this.generateSessionKey(64)

            // Generate auth payload and encrypt with RSA.
            const publicKey = this.session.rsaPublicKey
            const publicKeyObject = forge.pki.publicKeyFromPem(publicKey)
            const chiperName = publicKeyObject.encrypt(this.name, 'RSA-OAEP', {
                md: forge.md.sha256.create()
            })
            const chiperSessionKey = publicKeyObject.encrypt(this.sessionKey, 'RSA-OAEP', {
                md: forge.md.sha256.create()
            })
            const authPayload: SocketAuthPayload = {
                event: 'handshake',
                channelId: this.session.channelId,
                name: forge.util.encode64(chiperName),
                sessionKey: forge.util.encode64(chiperSessionKey)
            }

            // Create connection.
            socket.auth = authPayload
            socket.connect()
        },

        loadLocalStorageData (): void {
            // Load sc_name;
            this.name = localStorage.getItem(STORAGE_SC_NAME_KEY) ?? 'unknown'

            // Load session.
            const session = localStorage.getItem(STORAGE_SC_SESSION_KEY)
            if (session !== null) {
                const sessionData = JSON.parse(session) as SessionData
                sessionData.rsaPublicKey = enc.Utf8.stringify(enc.Base64url.parse(sessionData.rsaPublicKeyBase64))
                this.session = sessionData
            }

            // Load chat data.
            const chats = localStorage.getItem(SOTRAGE_SC_CHATS)
            if (chats !== null) {
                this.chats = JSON.parse(chats) as Chat[]
            }
        },

        generateSessionKey (length: number = 64): void {
            this.sessionKey = ''
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            const charactersLength = characters.length
            for (let i = 0; i < length; i++) {
                this.sessionKey += characters.charAt(Math.floor(Math.random() * charactersLength))
            }
            localStorage.setItem('sc_session_key', this.sessionKey)
        },

        exitChannel (): void {
            localStorage.clear()
            window.location.href = '/join'
        }
    }
})

export default { useChannelStore }
