<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  logOrReg: {
    type: String,
    default: 'log',
  },
  isLoading: Boolean,
})

const textInButton = computed(() => {
  return props.logOrReg === 'log' ? 'Sign in' : 'Sign up'
})
</script>

<template>
  <button
    class="border border-white py-0.5 hover:border-transparent hover:bg-white hover:text-main transition-all"
    :class="[props.isLoading ? 'cursor-wait bg-white bg-opacity-50' : '']"
    :disabled="props.isLoading"
  >
    {{ textInButton }}
  </button>
</template>
