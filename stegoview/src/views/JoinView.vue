<script setup lang="ts">
import footCopyright from '@/components/general/footCopyright.vue';
</script>

<template>
  <main class="py-3 min-vh-100 d-flex flex-column justify-content-center align-items-center">
    <!--Navbar-->
    <nav class="position-absolute top-0 pt-5 pb-3 w-100" style="z-index: 90;">
      <RouterLink
      class="mt-3 p-4 text-center"
      to="/"
    >
      <IconArrow />
    </RouterLink>
    </nav>

    <!--Form-->
    <div class="d-flex flex-column justify-content-center align-items-center">
      <form class="form" method="POST" enctype="application/x-www-form-urlencoded">
        <div class="mb-3">
          <label for="file" class="form-label">Upload image to join</label>
          <input type="file" id="file" class="form-control" />

          <div class="form-text">Upload your file here.</div>
          <button type="submit" class="btn btn-primary mt-3">Submit</button>
        </div>
      </form>
    </div>
    <footCopyright />
  </main>
</template>
