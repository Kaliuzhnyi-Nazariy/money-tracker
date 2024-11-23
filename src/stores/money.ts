import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('money', () => {
  const allAmount = ref(0)
  const percent = ref(0)

  function firstDepositMoney(depositAmount: number) {
    allAmount.value += depositAmount
    percent.value = 100
  }

  function depositMoney(depositAmount: number) {
    percent.value += (depositAmount * 100) / allAmount.value
    allAmount.value += depositAmount
    if (percent.value > 100) {
      percent.value = 100
    }
  }

  function withdrawMoney(withdrawAmount: number) {
    percent.value -= (withdrawAmount * 100) / allAmount.value
    allAmount.value -= withdrawAmount
    console.log('withdrawAmount: ', withdrawAmount)
    console.log((withdrawAmount * 100) / allAmount.value)

    if (percent.value < 0 || allAmount.value <= 0) {
      percent.value = 0
    }
  }

  return { allAmount, percent, depositMoney, withdrawMoney, firstDepositMoney }
})
