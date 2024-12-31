<script setup lang="ts">
import { computed } from 'vue'

const Props = defineProps({
  typeOfComp: {
    type: String,
    default: 'button',
  },
  redirectTo: {
    type: String,
  },
})

const componentIs = computed(() => {
  return Props.typeOfComp === 'button' ? Props.typeOfComp : 'a'
})
</script>

<template>
  <component
    :is="componentIs"
    :href="redirectTo"
    class="flex justify-center items-center w-full rounded-2xl border border-[#B4ABD0] bg-[#2C1B8B] text-white md:h-10"
    ><slot>heeh</slot></component
  >
</template>
