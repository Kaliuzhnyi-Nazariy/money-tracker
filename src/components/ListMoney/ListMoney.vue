<script setup lang="ts">
import { computed, watch } from 'vue'

import { useDepositStore } from '@/stores/depositMoney'
import HeaderOfEarningList from './HeaderOfEarningList.vue'
import ExpensesListItem from '../ExpensesList/ExpensesListItem.vue'
import EarningsListItem from '../EarningsList/EarningsListItem.vue'
import HeaderOfExpenssesList from './HeaderOfExpenssesList.vue'
import { useExpensesMoney } from '@/stores/expensesMoney'

const Props = defineProps({
  typeOfList: {
    type: String,
    required: true,
  },
})

const depositStore = useDepositStore()
const expensesStore = useExpensesMoney()

const typeOfListIsExpenses = computed(() => {
  return Props.typeOfList === 'expenses' ? true : false
})

watch(
  () => expensesStore.expensesList,
  () => {
    expensesStore.receiveExpenses()
  },
)

watch(
  () => depositStore.earningsList,
  () => {
    depositStore.receiveDeposit()
  },
)

console.log()
</script>

<template>
  <div class="border border-white rounded-2xl py-2 mt-3 w-[256px]">
    <HeaderOfExpenssesList v-if="typeOfListIsExpenses" />
    <HeaderOfEarningList v-else />

    <ul
      class="w-full h-[280px]"
      :class="[expensesStore.expensesList.length > 4 ? 'overflow-y-scroll' : 'overflow-hidden']"
      v-if="typeOfListIsExpenses"
    >
      <ExpensesListItem
        v-for="expensesItem in expensesStore.expensesList"
        :key="expensesItem._id"
        :id="expensesItem._id"
        :name="expensesItem.title"
        :money="expensesItem.price"
        :date="expensesItem.Date"
        :category="expensesItem.category"
      />
    </ul>

    <ul
      class="w-full h-[280px]"
      :class="[depositStore.earningsList.length > 5 ? 'overflow-y-scroll' : 'overflow-hidden']"
      v-else
    >
      <EarningsListItem
        v-for="earninngsItem in depositStore.earningsList"
        :key="earninngsItem._id"
        :id="earninngsItem._id"
        :name="earninngsItem.title"
        :money="earninngsItem.price"
        :date="earninngsItem.Date"
        :category="earninngsItem.category"
      />
    </ul>
  </div>
</template>
