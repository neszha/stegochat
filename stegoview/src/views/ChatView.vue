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
