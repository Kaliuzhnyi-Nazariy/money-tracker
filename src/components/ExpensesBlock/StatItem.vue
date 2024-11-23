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
  if (Props.topic === 'food') {
    return 'bg-green-400'
  } else if (Props.topic === 'Health') {
    return 'bg-orange-400'
  } else if (Props.topic === '') {
    return 'bg-gray-400'
  } else {
    return 'bg-gray-400'
  }
})
</script>

<template>
  <div class="stat p-3 h-36" :class="compBackByTopic">
    <div className="stat-title text-white w-full flex items-center justify-center">
      {{ Props.title }}
    </div>
    <div className="stat-value text-white w-full flex items-center justify-center">
      {{ Props.amount }}
    </div>
    <div className="stat-desc text-white w-full flex  items-center justify-center">
      {{ Props.topic }}
    </div>
  </div>
</template>
