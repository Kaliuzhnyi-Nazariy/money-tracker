<script setup lang="ts">
import { computed } from 'vue'

const Props = defineProps({
  title: { type: String, default: 'Others' },
  amount: { type: Number },
  topic: {
    type: String,
    default: 'others',
  },
})

const compBackByTopic = computed(() => {
  if (Props.title === 'food') {
    return 'bg-green-400'
  } else if (Props.title === 'health') {
    return 'bg-orange-400'
  } else if (Props.title === 'needs') {
    return 'bg-purple-400'
  } else {
    return 'bg-gray-400'
  }
})
</script>

<template>
  <div
    class="stat p-3 h-36 flex flex-col justify-center min-[1440px]:flex-row min-[1440px]:rounded-2xl min-[1440px]:h-full min-[1440px]:w-full"
    :class="compBackByTopic"
  >
    <div className="stat-title text-white w-full flex items-center justify-center ">
      {{ Props.title }}
    </div>
    <div
      className="stat-value text-white w-full flex items-center justify-center min-[1440px]:mx-auto"
    >
      {{ Props.amount }}
    </div>
  </div>
</template>
