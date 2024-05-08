<script setup lang="ts">
import IconArrow from '@/components/icons/IconArrow.vue'
import footCopyright from '@/components/general/FootCopyright.vue'
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
            <h4 class="text-center f-w-500 mb-5">Create Private Channel</h4>
            <form @submit.prevent="createChannel()" class="form">
                <div class="mb-3">
                    <label for="channel_name" class="form-label">
                        Channel Name
                    </label>
                    <input v-model="form.data.name" type="text" id="channel_name" ref="channel_name" class="form-control" placeholder="Channel Name" required />
                </div>
                <div class="mb-3">
                    <label for="channel_expired" class="form-label">
                        Expired Time
                    </label>
                    <input v-model="form.data.expired" step="1" type="number" id="channel_expired" class="form-control" placeholder="Expired in Minutes" required />
                </div>
                <div class="mb-3">
                    <label class="form-label" for="inputGroupFile01">
                        Cover Image
                    </label>
                    <input @change="onFileInput" type="file" class="form-control" id="inputGroupFile01" />
                </div>
                <div class="d-grid mt-4">
                    <button :disabled="form.loading" class="btn btn-primary d-flex align-items-center justify-content-center gap-2">
                        <i class="ti ti-plus"></i>
                        <span v-if="form.loading">Creating....</span>
                        <span v-else>Create New Channel</span>
                    </button>
                </div>
            </form>
            <!-- <button @click="modalPopUp(true)" class="btn btn-info w-50 mt-3 rounded-2">
                Popup
            </button> -->
        </div>

        <!-- Modal -->
        <div :class="`${(showPopUp) ? 'd-flex' : 'd-none'} position-absolute min-vh-100 w-100 justify-content-center align-items-center flex-col`" style="z-index: 999; background: rgba(0,0,0,0.3);">
            <div class="card p-3 d-flex flex-col justify-content-center align-items-center">
                <img v-if="form.feedBack.response.stegoImage !== null" class="w-75" :src="form.feedBack.response.stegoImage" alt="stegochat logo" />
                <p>
                    Simpan gambar untuk akses channel
                </p>
                <div class="d-flex gap-1">
                  <a
                    class="btn btn-success rounded-2"
                    :href="form.feedBack.response.stegoImage"
                    v-text="`unduh`"
                    @click.prevent="downloadImage(form.feedBack.response.stegoImage)" />
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
import { type CreateForm, type CreateResponse } from '@/types/create'
import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { API_BASE_URL } from '@/constants/environment'

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
            const { name, expired, coverImage } = this.form.data
            const formData = new FormData()
            formData.append('name', name as string)
            formData.append('expired', expired.toString() as string)
            formData.append('coverImage', coverImage as File)
            const url = API_BASE_URL + '/api/channel'
            axios.post(url, formData).then(({ data }: AxiosResponse<CreateResponse>) => {
                this.form.feedBack.response.stegoImage = data.data.stegoImage
                this.form.feedBack.success = 'Channel Created'
                this.resetForm()
                this.showPopUp = true
            })
                .catch((error: AxiosError) => {
                    console.log(error)
                    const data = error.response?.data as CreateResponse
                    const errorMessage = data.data.message ?? '' as string | string[]
                    if (Array.isArray(errorMessage)) {
                        this.form.feedBack.error = errorMessage[0]
                    } else {
                        this.form.feedBack.error = errorMessage
                    }
                })
        },

        resetForm (): void {
            const formData = this.form.data
            formData.name = ''
            formData.expired = ''
            formData.coverImage = null
        },

        resetFeedback (): void {
            this.form.feedBack = {
                error: '',
                success: '',
                response: {
                    stegoImage: ''
                }
            }
        },

        downloadImage (url: string): void {
            axios.get(url, { responseType: 'blob' })
                .then(response => {
                    const blob = new Blob([response.data], { type: 'application/png' })
                    const link = document.createElement('a')
                    link.href = URL.createObjectURL(blob)
                    link.download = 'stegoImage.png'
                    link.click()
                    URL.revokeObjectURL(link.href)
                }).catch(console.error)
        }
    },

    mounted () {
        (this.$refs.channel_name as HTMLInputElement).focus()
    },

    data () {
        return {
            form: {
                data: {
                    name: '',
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
