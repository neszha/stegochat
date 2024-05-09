<template>
    <div class="message-out mb-2">
        <div class="d-flex align-items-end flex-column">
            <p class="mb-1 text-muted">
                <small>
                    <slot name="time"></slot>
                </small>
            </p>
            <div class="message d-flex align-items-end flex-column">
                <div class="d-flex align-items-center mb-1 chat-msg">
                    <div class="flex-grow-1 ms-3">
                        <div class="msg-content bg-primary" style="max-width: 460px;">
                            <p class="mb-0" style="text-align: left;">
                                <slot name="message"></slot>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
