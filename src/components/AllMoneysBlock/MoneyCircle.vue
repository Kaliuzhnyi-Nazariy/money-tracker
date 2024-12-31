<script setup lang="ts">
import { useMoneyStore } from '@/stores/moneyValue'
import { useProcentStore } from '@/stores/procent'
import { computed } from 'vue'
const percentStore = useProcentStore()
const moneyStore = useMoneyStore()

const size = computed(() => {
  if (window.innerWidth >= 768) return '24rem' // Medium screens
  return '14rem' // Small screens
})
</script>

<template>
  <div class="w-full flex flex-col items-center mb-4">
    <h2 class="w-full text-center text-lg font-bold mb-4">Your money flow</h2>
    <div
      class="radial-progress w-56 h-56 md:w-[380px] md:h-[380px]"
      :style="`--value:${percentStore.percent}; --size:${size}; --thickness:0.5rem`"
      role="progressbar"
      :max="percentStore.percent"
    >
      <div class="">
        <p>Amount: {{ moneyStore.moneyValue }}</p>
        <p>Percent: {{ Math.round(percentStore.percent) || 0 }}%</p>
      </div>
    </div>
  </div>
</template>
