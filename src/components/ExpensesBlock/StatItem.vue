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
    console.log('food')
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
  <div className="stat" :class="compBackByTopic">
    <div className="stat-title text-white">{{ Props.title }}</div>
    <div className="stat-value text-white">{{ Props.amount }}</div>
    <div className="stat-desc text-white">{{ Props.topic }}</div>
  </div>
</template>
