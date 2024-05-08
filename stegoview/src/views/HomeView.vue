<script setup lang="ts">
import FootCopyright from '@/components/general/FootCopyright.vue'
</script>

<template>
    <main class="py-3 min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex flex-column align-items-center">
            <img class="w-75" src="@/assets/images/authentication/logo.png" alt="stegochat logo" />
            <RouterLink class="btn-lg btn-light-dark btn-shadow w-75 mt-3 text-center" to="/create">
                Create
            </RouterLink>
            <RouterLink class="btn-lg btn-primary btn-shadow w-75 mt-3 text-white text-center" to="/join">
                Join
            </RouterLink>
        </div>
        <FootCopyright />
    </main>
</template>
