<script setup lang="ts">
import { computed, watch } from 'vue'

import { useDepositStore } from '@/stores/depositMoney'
import HeaderOfEarningList from './HeaderOfEarningList.vue'
import ExpensesListItem from '../ExpensesList/ExpensesListItem.vue'
import EarningsListItem from '../EarningsList/EarningsListItem.vue'
import HeaderOfExpenssesList from './HeaderOfExpenssesList.vue'

const Props = defineProps({
  typeOfList: {
    type: String,
    required: true,
  },
})

const depositStore = useDepositStore()

const typeOfListIsExpenses = computed(() => {
  return Props.typeOfList === 'expenses' ? true : false
})

watch(
  () => depositStore.earningsList,
  () => {
    depositStore.receiveDeposit()
  },
)
</script>

<template>
  <div class="border border-white rounded-2xl py-2 mt-3 w-[256px]">
    <HeaderOfExpenssesList v-if="typeOfListIsExpenses" />
    <HeaderOfEarningList v-else />

    <ul class="w-full overflow-scroll h-[280px]" v-if="typeOfListIsExpenses">
      <ExpensesListItem
        v-for="expensesItem in depositStore.earningsList"
        :key="expensesItem.id"
        :name="expensesItem.title"
        :money="expensesItem.price"
        :date="expensesItem.Date"
        :category="expensesItem.category"
      />
    </ul>
    <!-- <ul v-else>
      <EarningsListItem
        v-for="expensesItem in expensesList"
        :key="expensesItem.id"
        :name="expensesItem.name"
        :money="expensesItem.price"
        :date="expensesItem.Date"
        :category="expensesItem.category"
      />
    </ul> -->
    <ul
      class="w-full h-[280px]"
      :class="[depositStore.earningsList.length > 5 ? 'overflow-y-scroll' : 'overflow-hidden']"
      v-else
    >
      <EarningsListItem
        v-for="expensesItem in depositStore.earningsList"
        :key="expensesItem._id"
        :id="expensesItem._id"
        :name="expensesItem.title"
        :money="expensesItem.price"
        :date="expensesItem.Date"
        :category="expensesItem.category"
      />
    </ul>
  </div>
</template>
