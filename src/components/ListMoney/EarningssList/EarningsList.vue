<script setup lang="ts">
import EarningsListItem from '@/components/EarningsList/EarningsListItem.vue'
import { useDepositStore } from '@/stores/depositMoney'

const depositMoney = useDepositStore()
</script>

<template>
  <ul
    class="w-full h-[70%] md:flex md:flex-col md:gap-2"
    v-if="!depositMoney.depositIsLoading"
    :class="[depositMoney.earningsList.length > 2 ? 'overflow-y-scroll' : 'overflow-hidden']"
  >
    <EarningsListItem
      v-for="depositItem in depositMoney.earningsList"
      :key="depositItem._id as string"
      :id="depositItem._id as string"
      :name="depositItem.title"
      :money="Number(depositItem.price)"
      :date="depositItem.date"
    />
  </ul>
  <div class="flex justify-center" v-if="depositMoney.depositIsLoading">Loading...</div>
  <div
    class="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[50%]"
    v-if="depositMoney.earningsList.length === 0"
  >
    Empty
  </div>
</template>

<!-- class="w-full h-[280px]" -->
