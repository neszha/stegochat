<script setup lang="ts">
import axios, { type AxiosResponse, isAxiosError } from 'axios'
import { API_BASE_URL } from '@/constants/environment'
import { type SessionData } from '@/types/chennel'
import IconArrow from '@/components/icons/IconArrow.vue'
import { STORAGE_SC_NAME_KEY, STORAGE_SC_SESSION_KEY } from '@/middlewares/auth.middleware'
</script>

<template>
    <main class="py-3 min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <!--Navbar-->
        <nav class="position-absolute top-0 pt-5 pb-3 w-100" style="z-index: 90;">
            <RouterLink class="mt-3 p-4 text-muted" to="/">
                <IconArrow />
            </RouterLink>
        </nav>

        <!-- Content -->
        <div class="d-flex flex-column justify-content-center align-items-center">
            <h4 class="text-center f-w-500 mb-5">Join to Private Channel</h4>
            <form @submit.prevent="getStegoChannelInfo()" class="form">
                <div class="mb-3">
                    <label for="name" class="form-label">Youre Name</label>
                    <input v-model="form.data.name" type="text" id="name" ref="name" class="form-control" placeholder="Your Name" required>
                </div>
                <div class="mb-3">
                    <label for="file" class="form-label">Stego Image</label>
                    <input @change="onFileInput" type="file" id="file" accept="image/png" class="form-control" required />
                    <div class="d-grid mt-3">
                        <button type="submit" class="btn btn-primary mt-3">
                            <span v-if="form.loading">Joining...</span>
                            <span v-else>Join to Channel</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
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
                const stegoChannelData = response.data.data as SessionData
                localStorage.setItem(STORAGE_SC_NAME_KEY, this.form.data.name as string)
                localStorage.setItem(STORAGE_SC_SESSION_KEY, JSON.stringify(stegoChannelData))
                this.$router.push({ name: 'chat' })
            } catch (error) {
                if (isAxiosError(error)) {
                    alert(error.response?.data.error)
                }
            }
            this.form.loading = false
        }
    },

    mounted () {
        (this.$refs.name as HTMLInputElement).focus()
    },

    data () {
        return {
            form: {
                data: {
                    name: '' as string,
                    stegoImage: null as unknown as File
                },
                loading: false
            }
        }
    }
}
</script>
