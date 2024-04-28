<script setup lang="ts">
import { ref } from "vue";
import footCopyright from "@/components/general/footCopyright.vue";
import IconArrow from "@/components/icons/IconArrow.vue";

//show modal
const classObject = ref("d-none");
const modalToggle = () => {
  if (classObject.value != "d-none") {
    classObject.value = "d-none";
  } else {
    classObject.value = "position-absolute min-vh-100 w-100 justify-content-center align-items-center d-flex flex-col";
  }
}
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
    <div
      class="d-flex flex-column justify-content-center align-items-center"
    >
      <form
        class="form"
        method="POST"
        enctype="application/x-www-form-urlencoded"
        action="/create"
      >
        <div class="mb-3">
          <label for="channel_name" class="form-label">
            Channel Name
          </label>
          <input
            type="text"
            id="channel_name"
            class="form-control"
            required
          />
        </div>

        <div class="mb-3">
          <label for="channel_expired" class="form-label">
            Waktu Expired
          </label>
          <input
            type="date"
            id="channel_expired"
            class="form-control"
            required
          />
        </div>
        
        <div class="mb-3">
          <label class="form-label" for="inputGroupFile01">
            Cover Image (Optional, Min : 3MB)
          </label>
          <input 
            type="file"
            class="form-control"
            id="inputGroupFile01"
          />
        </div>
          
          <button @click="modalToggle" class="btn btn-primary w-50 mt-3 rounded-2">
            Create
          </button>
      </form>
      <button @click="modalToggle" class="btn btn-info w-50 mt-3 rounded-2">
        Popup
      </button>
    </div>

    <!-- Modal -->
    <div :class="classObject" style="z-index: 999; background: rgba(0,0,0,0.3);">
      <div class="card p-3 d-flex flex-col justify-content-center align-items-center">
      <img class="w-75" src="@/assets/images/authentication/logo.png" alt="stegochat logo" />
        <p>
          Simpan gambar untuk akses channel
        </p>
        <div class="d-flex gap-1">
          <button  class="btn btn-success rounded-2">
            Unduh
          </button>
          <button @click="modalToggle" class="btn btn-light-danger rounded-2">
            Close
          </button>
        </div>
      </div>
    </div>

    <footCopyright />
  </main>
</template>