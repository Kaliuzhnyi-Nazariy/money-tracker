<script setup lang="ts">
import { useExpensesMoney } from '@/stores/expensesMoney'
import StatItem from './StatItem.vue'

const expenses = useExpensesMoney()
</script>

<template>
  <div
    class="stats stats-vertical shadow grid grid-cols-2 w-[256px] h-full mt-3 border-transparent justify-self-center self-center rounded-2xl md:w-[464px] min-[1440px]:gap-10 min-[1440px]:w-full bg-transparent"
  >
    <StatItem class="rounded-tl-2xl" title="food" :amount="expenses.foodExpenses" />
    <StatItem class="rounded-tr-2xl" title="health" :amount="expenses.healthExpenses" />
    <StatItem class="rounded-bl-2xl" title="needs" :amount="expenses.needsExpenses" />
    <StatItem class="rounded-br-2xl" title="others" :amount="expenses.othersExpenses" />
  </div>
</template>
