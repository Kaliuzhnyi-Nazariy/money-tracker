import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useDepositStore } from './depositMoney'
import { useExpensesMoney } from './expensesMoney'

const deposit = useDepositStore()
const expenses = useExpensesMoney()

export const useProcentStore = defineStore(
  'percent',
  () => {
    const percent = computed(() => {
      if (deposit.allAmount === 0) return 0 - Number(expenses.allExpenses)
      return 100 - (Number(expenses.allExpenses) * 100) / Number(deposit.allAmount)
    })

    return { percent }
  },
  { persist: true },
)
