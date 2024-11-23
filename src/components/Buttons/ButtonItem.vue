<script setup lang="ts">
import { computed } from 'vue'

const Props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  redirectTo: {
    type: String,
  },
})

const componentIs = computed(() => {
  return Props.type === 'button' ? Props.type : 'a'
})
</script>

<template>
  <component
    :is="componentIs"
    :href="redirectTo"
    class="flex justify-center w-full rounded-2xl border border-[#B4ABD0] bg-[#2C1B8B]"
    ><slot>heeh</slot></component
  >
</template>
