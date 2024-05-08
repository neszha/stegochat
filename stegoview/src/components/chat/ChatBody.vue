<script setup lang="ts">
import MessageIn from '@/components/chat/bubbles/MessageIn.vue'
import MessageOut from '@/components/chat/bubbles/MessageOut.vue'
</script>

<template>
    <div class="scroll-block overflow-auto chat-message">
        <div class="card-body">
            <MessageIn>
                <template #name>Alene</template>
                <template #time>10:00 AM</template>
                <template #message> Hi...Henny!! </template>
            </MessageIn>
            <MessageOut>
                <template #time>10:00 AM</template>
                <template #message> Hi...Alene!! </template>
            </MessageOut>
            <MessageIn>
                <template #name>Alene</template>
                <template #time>12:00 AM</template>
                <template #message> Hi...Henny!! </template>
            </MessageIn>
            <MessageOut>
                <template #time>10:00 AM</template>
                <template #message> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas nobis ea consequuntur.
                </template>
            </MessageOut>
        </div>
    </div>
</template>
