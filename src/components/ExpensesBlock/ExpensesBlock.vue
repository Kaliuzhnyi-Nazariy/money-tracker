<script setup lang="ts">
import { useExpensesMoney } from '@/stores/expensesMoney'
import StatItem from './StatItem.vue'

// const items = [
//   { title: 'new data', amount: 400, topic: 'food' },
//   { title: 'hata', amount: 150, topic: 'Health' },
//   { title: 'hata', amount: 220, topic: '' },
//   { amount: 12, topic: '' },
// ]
//I will add here all exoenses and then show how much user spend on each field

const expenses = useExpensesMoney()
</script>

<template>
  <div
    className="stats stats-vertical lg:stats-horizontal shadow grid grid-cols-2 w-[256px] h-full mt-3 md:flex "
  >
    <StatItem title="food" :amount="expenses.foodExpenses" />
    <StatItem title="health" :amount="expenses.healthExpenses" />
    <StatItem title="needs" :amount="expenses.needsExpenses" />
    <StatItem title="others" :amount="expenses.othersExpenses" />
    <!-- <StatItem v-for="item in items" :key="item.title" title="health" :amount="item.amount" />
    <StatItem v-for="item in items" :key="item.title" title="needs" :amount="item.amount" />
    <StatItem v-for="item in items" :key="item.title" title="others" :amount="item.amount" /> -->
  </div>
</template>
