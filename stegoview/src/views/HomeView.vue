<script setup lang="ts">
import FootCopyright from '@/components/general/FootCopyright.vue'
</script>

<template>
    <main class="py-3 min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex flex-column align-items-center gap-3">
            <img class="w-75" src="@/assets/images/authentication/logo.png" alt="stegochat logo" />
            <RouterLink to="/create" class="btn btn-lg btn-light-dark d-flex align-items-center justify-content-center w-75">
                <i class="ti ti-certificate me-2"></i>
                <span>Create Access</span>
            </RouterLink>
            <RouterLink to="/join" class="btn btn-lg btn-primary d-flex align-items-center justify-content-center w-75">
                <i class="ti ti-brand-hipchat me-2"></i>
                <span>Join Channel</span>
            </RouterLink>
        </div>
        <FootCopyright />
    </main>
</template>
