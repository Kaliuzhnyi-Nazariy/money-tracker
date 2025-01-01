<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <div
    class="w-[80%] min-h-[40%] text-center text-base absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-5 bg-secondary text-white rounded-lg flex flex-col justify-center items-center"
  >
    <div class="w-[60%]">
      <h2 class="text-lg font-bold mb-4">Hello dear user</h2>
      <p>We are happy to see you here.</p>
      <p class="mb-3">
        Effortlessly track, manage, and organize your markers with precision and ease. Whether
        you're monitoring locations, activities, or specific points of interest, our app is here to
        streamline your process. Dive in and let Marker-Tracker make your workflow smarter, faster,
        and more intuitive. <b>Get started now and stay on top of what matters most!</b>
      </p>
      <RouterLink to="authorization" class="px-3 py-1.5 bg-orange-400 mt-2 rounded-2xl"
        >Start 🚀</RouterLink
      >
    </div>
  </div>
</template>
