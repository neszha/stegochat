<template>
    <div class="card-header p-3">
        <div class="d-flex align-items-center">
            <ul class="list-inline me-auto mb-0">
                <li class="list-inline-item align-bottom position-relative">
                    <a href="#" class=" avtar avtar-s btn btn-link-secondary" type="button">
                        <i class="ti ti-users f-18"></i>
                        <span class="position-absolute top-0 start-10 translate-middle badge rounded-pill text-bg-primary" style="scale: 0.8;">
                            {{ totalUserConnection }}
                        </span>
                    </a>
                </li>
                <li class="list-inline-item">
                    <div class="media align-items-center">
                        <div class="media-body">
                            <h6 class="mb-0">{{ session.channelName || '-' }}</h6>
                            <span class="text-sm text-muted">Me: {{ name || 'Unknown' }} </span>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="list-inline ms-auto mb-0">
                <li class="list-inline-item">
                    <a @click="confirmToOutChannel()" href="javascript:void(0)" class="avtar avtar-s btn-link-secondary">
                        <i class="ti ti-logout f-18" style="rotate: 180deg;"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { useChannelStore } from '@/stores/channel.store'
import { mapState } from 'pinia'

export default {

    computed: {
        ...mapState(useChannelStore, ['name', 'session', 'totalUserConnection'])
    },

    methods: {
        confirmToOutChannel (): void {
            localStorage.clear()
            this.$router.push({ name: 'join' })
        }
    },

    data () {
        return {
            //
        }
    }
}
</script>
