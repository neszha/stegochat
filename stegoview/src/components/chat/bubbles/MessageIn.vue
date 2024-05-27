<template>
    <div class="message-in mb-2">
        <div class="d-flex">
            <div class="flex-grow-1">
                <div class="d-flex align-items-start flex-column">
                    <p class="mb-1 text-muted">
                        <span class="me-2">
                            <slot name="name"></slot>
                        </span>
                        <small>
                            <slot name="time"></slot>
                        </small>
                    </p>
                    <div class="message d-flex align-items-start flex-column">
                        <div class="d-flex align-items-center mb-1 chat-msg">
                            <div class="flex-grow-1 me-3">
                                <div class="msg-content card mb-0" style="max-width: 460px;">
                                    <p class="mb-0" style="text-align: left;">
                                        <slot name="message"></slot>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
