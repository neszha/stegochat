<script setup lang="ts">
import IconArrow from '@/components/icons/IconArrow.vue'
import footCopyright from '@/components/general/footCopyright.vue'
</script>
<template>
    <main class="py-3 min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <!--Navbar-->
        <nav class="position-absolute top-0 pt-5 pb-3 w-100" style="z-index: 90;">
            <RouterLink class="mt-3 p-4 text-center" to="/">
                <IconArrow />
            </RouterLink>
        </nav>

        <!--Form-->
        <div class="d-flex flex-column justify-content-center align-items-center">
            <form @submit.prevent="createChannel()" class="form" method="POST" enctype="application/x-www-form-urlencoded" action="/create">
                <div class="mb-3">
                    <label for="channel_name" class="form-label">
                        Channel Name
                    </label>
                    <input v-model="form.data.channel" type="text" id="channel_name" class="form-control" required />
                </div>

                <div class="mb-3">
                    <label for="channel_expired" class="form-label">
                        Waktu Expired
                    </label>
                    <input v-model="form.data.expired" step="1" type="number" id="channel_expired" class="form-control" required />
                </div>

                <div class="mb-3">
                    <label class="form-label" for="inputGroupFile01">
                        Cover Image (Optional, Min : 3MB)
                    </label>
                    <input @change="onFileInput" type="file" class="form-control" id="inputGroupFile01" />
                </div>

                <button :disabled="form.loading" class="btn btn-primary w-50 mt-3 rounded-2">
                    <span v-if="form.loading">Creating....</span>
                    <span v-else>Create</span>
                </button>
            </form>
            <button @click="modalPopUp(true)" class="btn btn-info w-50 mt-3 rounded-2">
                Popup
            </button>
        </div>

        <!-- Modal -->
        <div :class="`${(showPopUp) ? 'd-flex' : 'd-none'} position-absolute min-vh-100 w-100 justify-content-center align-items-center flex-col`" style="z-index: 999; background: rgba(0,0,0,0.3);">
            <div class="card p-3 d-flex flex-col justify-content-center align-items-center">
                <img class="w-75" src="@/assets/images/authentication/logo.png" alt="stegochat logo" />
                <p>
                    Simpan gambar untuk akses channel
                </p>
                <div class="d-flex gap-1">
                    <button class="btn btn-success rounded-2">
                        Unduh
                    </button>
                    <button @click="modalPopUp(false)" class="btn btn-light-danger rounded-2">
                        Close
                    </button>
                </div>
            </div>
        </div>

        <footCopyright />
    </main>
</template>

<script lang="ts">
import { type CreateForm } from '@/types/create'

export default {
    methods: {
        modalPopUp (show: boolean) {
            this.showPopUp = show
        },

        onFileInput (event: Event) {
            const target = event.target as HTMLInputElement
            if (target.files !== null) {
                this.form.data.coverImage = target.files[0]
            }
        },

        createChannel () {
            this.form.loading = true
            const { channel, expired, coverImage } = this.form.data
            const formData = new FormData()
            formData.append('name', channel as string)
            formData.append('expired', expired.toString() as string)
            formData.append('coverImage', coverImage as File)
            console.log(formData)
            console.log(this.form)
        }
    },

    mounted () {
        //
    },

    data () {
        return {
            form: {
                data: {
                    channel: '',
                    expired: '',
                    coverImage: null as File | null
                } satisfies CreateForm,
                loading: false,
                feedBack: {
                    error: '',
                    success: '',
                    response: {
                        stegoImage: ''
                    }
                }
            },
            showPopUp: false
        }
    }
}
</script>
