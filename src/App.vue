<script setup lang="ts">
import { messageStore } from '@/stores/messageStore'
import TempError from './TempError.vue'

const store = messageStore()
</script>

<template>
  <RouterView />
  <TempError :type="store.typeOfMess" :message="store.message" />
</template>
