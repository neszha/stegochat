<script setup lang="ts">
import { type Chat } from '@/types/chennel'
import { ChatTypeEnum } from '@/types/enums'
import MessageIn from '@/components/chat/bubbles/MessageIn.vue'
import MessageOut from '@/components/chat/bubbles/MessageOut.vue'
</script>

<template>
    <div ref="chatWrapper" class="scroll-block overflow-auto chat-message">
        <div class="card-body">
            <div v-for="(chat) of renderedChatContents" :key="chat.payload.id" class="chat-item">
                <MessageIn v-if="chat.type === ChatTypeEnum.ANOTHER">
                    <template #name>{{ chat.payload.name  }}</template>
                    <template #time>{{ chat.payload.timestampString ?? '-' }}</template>
                    <template #message>
                        <div v-html="chat.payload.content"></div>
                    </template>
                </MessageIn>
                <MessageOut v-if="chat.type === ChatTypeEnum.ME">
                    <template #time>{{ chat.payload.timestampString ?? '-' }}</template>
                    <template #message>
                        <div v-html="chat.payload.content"></div>
                    </template>
                </MessageOut>
            </div>
            <div v-if="chats.length === 0" class="empty-chat text-center pt-3">
                <h6 class="text-muted">Message is Empty</h6>
                <span class="text-muted">Your chat communications will be encrypted</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import moment from 'moment'
import { mapState } from 'pinia'
import { useChannelStore } from '@/stores/channel.store'

export default {
    computed: {
        ...mapState(useChannelStore, ['chats']),

        renderedChatContents (): Chat[] {
            return this.chats.map(chat => {
                // Convert time format.
                const timeDate = new Date(chat.payload.timestamp as number)
                chat.payload.timestampString = moment(timeDate).format('h:mm A')

                // Render enter content.
                chat.payload.content = chat.payload.content.replace(/\n/g, '<br>')

                // Done.
                return chat
            })
        }
    },

    methods: {
        scrollToBottom () {
            const scrollableElement = this.$refs.chatWrapper as HTMLElement | undefined
            if (scrollableElement === undefined) return
            scrollableElement.scrollTop = scrollableElement.scrollHeight
        }
    },

    mounted () {
        this.scrollToBottom()
    },

    watch: {
        chats: {
            deep: true,
            handler () {
                this.scrollToBottom()
            }
        }
    }
}
</script>
