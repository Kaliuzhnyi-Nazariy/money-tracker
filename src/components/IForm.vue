<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  screenSizeType: {
    type: String,
    required: true,
    enum: ['mob', 'tablet', 'pc'],
  },
})

const sizeStyle = computed(() => {
  if (props.screenSizeType === 'mob') {
    return 'lg:hidden w-[300px] min-h-[400px] '
  } else {
    return 'hidden lg:block w-[800px] h-[350px]'
  }
})
</script>

<template>
  <div
    class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white transition-all flex flex-col"
    :class="sizeStyle"
  >
    <slot></slot>
  </div>
</template>
