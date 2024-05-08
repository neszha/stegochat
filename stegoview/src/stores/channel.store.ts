import { enc } from 'crypto-js'
import { defineStore } from 'pinia'
import { type SessionData } from '@/types/chennel'
import { STORAGE_SC_NAME_KEY, STORAGE_SC_SESSION_KEY } from '@/middlewares/auth.middleware'

interface ChannelStore {
    name: string
    sessionKey: string
    session: SessionData
}

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
        }
    }),

    /**
     * Actions.
     */
    actions: {
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
