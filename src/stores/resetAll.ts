import { ref } from 'vue'
import { useDepositStore } from './depositMoney'
import { useExpensesMoney } from './expensesMoney'
import { useUserStore } from './user'
import { defineStore } from 'pinia'

const base_API_URL = 'https://tracker-money-back.onrender.com/api/money'
const user = useUserStore()

const deposit = useDepositStore()
const expenses = useExpensesMoney()

const isLoadingDeleting = ref(false)
const errorValue = ref<null | string>(null)
const turnLoadingOn = () => {
  isLoadingDeleting.value = true
}

const turnLoadingOff = () => {
  isLoadingDeleting.value = false
}

export const resetDataStore = defineStore('reset', () => {
  const resetData = async (ownerId: string) => {
    turnLoadingOn()
    try {
      const res = await fetch(`${base_API_URL}/resetAll`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${user.userToken}`,
        },
        body: JSON.stringify({ ownerId }),
      })

      const resData = await res.json()
      if (!res.ok) {
        errorValue.value = resData.message
        turnLoadingOff()
        return
      }

      deposit.resetData()
      expenses.resetData()

      turnLoadingOff()
      return
    } catch (error) {
      console.error('An error occurred:', error)
      errorValue.value = 'An unexpected error occurred'
      turnLoadingOff()
    }
  }

  function resetDataInfo() {
    deposit.earningsList = []
    deposit.depositError = null
    expenses.expensesList = []
    expenses.expensesError = null
  }

  return {
    resetData,
    resetDataInfo,
  }
})
