import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useDepositStore } from './depositMoney'
import { useExpensesMoney } from './expensesMoney'

const deposit = useDepositStore()
const expenses = useExpensesMoney()

export const useMoneyStore = defineStore('money', () => {
  const moneyValue = computed(() => {
    return deposit.allAmount - expenses.allExpenses
  })

  return { moneyValue }
})
