<script setup lang="ts">
import ChatHeader from '@/components/chat/ChatHeader.vue'
import ChatBody from '@/components/chat/ChatBody.vue'
import ChatFooter from '@/components/chat/ChatFooter.vue'
</script>

<template>
    <div class="card mb-0" style="border-radius: 0; height: 100vh; min-height: 500px;">
        <ChatHeader />
        <ChatBody />
        <ChatFooter />
    </div>
</template>

<script lang="ts">
import forge from 'node-forge'
import { mapState, mapActions } from 'pinia'
import socket from '../socket'
import { useChannelStore } from '@/stores/channel.store'
import { type SocketAuthPayload } from '@/types/chennel'

export default {

    computed: {
        ...mapState(useChannelStore, ['session', 'sessionKey'])
    },

    methods: {
        ...mapActions(useChannelStore, [
            'loadLocalStorageData',
            'generateSessionKey',
            'exitChannel'
        ]),

        async encryptMessage (publicKey: CryptoKey, plainText: string): Promise<string> {
            const encodedMessage = new TextEncoder().encode(plainText)
            const encryptedBuffer = await window.crypto.subtle.encrypt(
                {
                    name: 'RSA-OAEP'
                },
                publicKey,
                encodedMessage
            )
            const encryptedArray = Array.from(new Uint8Array(encryptedBuffer))
            const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray))
            console.log(encryptedBase64)
            return encryptedBase64
        },

        createSocketConnection () { // Handshake
            if (this.session.rsaPublicKey === undefined) {
                this.exitChannel()
                return
            }

            // Generate session key.
            this.generateSessionKey(64)

            // Generate auth payload and encrypt with RSA.
            const publicKey = this.session.rsaPublicKey as string
            const publicKeyObject = forge.pki.publicKeyFromPem(publicKey)
            const encryptedData = publicKeyObject.encrypt(this.sessionKey as string, 'RSA-OAEP', {
                md: forge.md.sha256.create()
            })
            const authPayload: SocketAuthPayload = {
                channelId: this.session.channelId,
                sessionKey: forge.util.encode64(encryptedData)
            }

            // Create connection.
            socket.auth = authPayload
            socket.connect()
        },

        socketMessageHandler () {
            // Event message handler
            socket.on('event', (key: string) => {
                // if (key === 'exit') this.exitChannel()
            })
        }
    },

    async beforeMount () {
        this.loadLocalStorageData()
        this.socketMessageHandler()
        this.createSocketConnection()
    }
}
</script>
