<script setup lang="ts">
import {
  computed,
  // watch
} from 'vue'

// import { useDepositStore } from '@/stores/depositMoney'
import HeaderOfEarningList from './HeaderOfEarningList.vue'
import HeaderOfExpenssesList from './HeaderOfExpenssesList.vue'
// import { useExpensesMoney } from '@/stores/expensesMoney'
import ExpensesList from './ExpensesList/ExpensesList.vue'
import EarningsList from './EarningssList/EarningsList.vue'

const Props = defineProps({
  typeOfList: {
    type: String,
    required: true,
  },
})

// const depositStore = useDepositStore()
// const expensesStore = useExpensesMoney()

const typeOfListIsExpenses = computed(() => {
  return Props.typeOfList === 'expenses' ? true : false
})

//   () => expensesStore.expensesList,
//   (newList, oldList) => {
//     if (newList !== oldList) {
//       console.log('Expenses list updated:', newList)
//     }
//   },
// )

// watch(
//   () => depositStore.earningsList,
//   (newList, oldList) => {
//     if (newList !== oldList) {
//       console.log('Earnings list updated:', newList)
//     }
//   },
// )
</script>

<template>
  <div
    class="border border-white rounded-2xl py-2 mt-3 w-[256px] h-[172px] relative md:w-[464px] md:h-[320px]"
  >
    <HeaderOfExpenssesList v-if="typeOfListIsExpenses" />
    <HeaderOfEarningList v-else />

    <ExpensesList v-if="typeOfListIsExpenses" />
    <EarningsList v-else />
  </div>
</template>
