<script setup lang="ts">
import StatItem from './StatItem.vue'

const items = [
  { title: 'new data', amount: 400, topic: 'food' },
  { title: 'hata', amount: 150, topic: 'Health' },
  { title: 'hata', amount: 220, topic: '' },
  { amount: 12, topic: '' },
]
//I will add here all exoenses and then show how much user spend on each field
</script>

<template>
  <div className="stats stats-vertical lg:stats-horizontal shadow">
    <StatItem
      v-for="item in items"
      :key="item.title"
      :title="item.title"
      :amount="item.amount"
      :topic="item.topic"
    />
  </div>
</template>
