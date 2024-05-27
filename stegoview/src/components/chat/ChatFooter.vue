<template>
    <div class="card-footer px-3 py-2">
        <textarea v-model="message" class="form-control border-0 shadow-none mb-2" placeholder="Type a message" rows="1" style="max-height: 100px;"></textarea>
        <div class="d-grid">
            <button @click="sendMessage()" :disabled="disabledSendButton" class="btn btn-primary d-flex align-items-center justify-content-center gap-2">
                <i class="ti ti-send"></i>
                <span>Send Message</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia'
import { useChannelStore } from '@/stores/channel.store'

export default {

    computed: {
        disabledSendButton () {
            if (this.message.trim() === '') return true
            return false
        }
    },

    methods: {
        ...mapActions(useChannelStore, ['sendChatMessage']),

        sendMessage (): void {
            this.sendChatMessage(this.message as string)
            this.message = ''
        }
    },

    data () {
        return {
            message: ''
        }
    }
}
</script>
