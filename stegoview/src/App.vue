<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <RouterView />

    <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
        id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Menu</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <img class="img-fluid d-block w-100" src="@/assets/images/authentication/typeface-logo.png"
                alt="First slide" />
            <ul class="list-group">
                <RouterLink class="text-dark list-group-item" to="/">Home</RouterLink>
                <RouterLink class="text-dark list-group-item" to="/join" aria-current="true">Join</RouterLink>
                <RouterLink class="text-dark list-group-item" to="/create">Create</RouterLink>
                <RouterLink class="text-dark list-group-item" to="/chat">Chat</RouterLink>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    mounted () {
        //
    }
}
</script>
