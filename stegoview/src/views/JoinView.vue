<script setup lang="ts">
import axios, { type AxiosResponse, isAxiosError } from 'axios'
import { API_BASE_URL } from '@/constants/environment'
import FootCopyright from '@/components/general/FootCopyright.vue'
import { type StegoChannelData } from '@/types/chennel'
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
            <form @submit.prevent="getStegoChannelInfo()" class="form">
                <div class="mb-3">
                    <label for="file" class="form-label">Upload stego image to join!</label>
                    <input @change="onFileInput" type="file" id="file" accept="image/png" class="form-control" required />
                    <div class="form-text">Upload your file here.</div>
                    <div class="d-grid mt-3">
                        <button type="submit" class="btn btn-primary mt-3">
                            <span v-if="form.loading">Joining...</span>
                            <span v-else>Join to Channel</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <FootCopyright />
    </main>
</template>

<script lang="ts">
export default {

    methods: {
        onFileInput (event: Event) {
            const target = event.target as HTMLInputElement
            if (target.files !== null) {
                this.form.data.stegoImage = target.files[0]
            }
        },

        async getStegoChannelInfo (): Promise<void> {
            const url = API_BASE_URL + '/api/channel/info'
            const formData = new FormData()
            formData.append('stegoImage', this.form.data.stegoImage as File)
            this.form.loading = true
            try {
                const response: AxiosResponse = await axios.post(url, formData)
                const stegoChannelData = response.data.data as StegoChannelData
                localStorage.setItem('sc_session', JSON.stringify(stegoChannelData))
                this.$router.push({ name: 'chat' })
            } catch (error) {
                if (isAxiosError(error)) {
                    alert(error.response?.data.error)
                }
            }
            this.form.loading = false
        }
    },

    data () {
        return {
            form: {
                data: {
                    stegoImage: null as unknown as File
                },
                loading: false
            }
        }
    }
}
</script>
