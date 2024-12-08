import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
// import { useExpensesMoney } from './expensesMoney'

const base_API_URL = 'https://tracker-money-back.onrender.com/api/money'
const user = useUserStore()
// const expenses = useExpensesMoney()

export interface IEarningsList {
  title: string
  date: string | Date | null
  price: number | string
  type: string
  [x: string]: unknown
}

export const useDepositStore = defineStore(
  'earnigs',
  () => {
    const earningsList = ref<IEarningsList[]>([])
    const depositIsLoading = ref(false)
    const depositError = ref<null | string>(null)

    const allAmount = computed(() => {
      return earningsList.value.reduce((acc, curr) => {
        return (acc += Number(curr.price))
      }, 0)
    })

    const turnLoadingOn = () => {
      depositIsLoading.value = true
    }

    const turnLoadingOff = () => {
      depositIsLoading.value = false
    }

    const clearError = () => {
      depositError.value = null
    }

    // function firstDepositMoney(depositAmount: number) {
    //   allAmount.value += Number(depositAmount)
    //   // percent.value = 100
    // }

    // function depositMoney(depositAmount: number) {
    //   if (!allAmount.value) {
    //     allAmount.value += depositAmount
    //     percent.value = 100
    //   } else {
    //     percent.value += (depositAmount * 100) / allAmount.value
    //     allAmount.value += depositAmount
    //   }
    //   if (percent.value > 100) {
    //     percent.value = 100
    //   }
    // }

    async function addDepositMoney({
      title,
      date,
      price,
      type,
    }: {
      title: string
      date?: string | Date
      price?: number | string
      type: string
    }) {
      clearError()
      turnLoadingOn()

      if (!user.userToken) {
        depositError.value = 'Unauthorized'
        turnLoadingOff()
        return
      }

      try {
        const res = await fetch(`${base_API_URL}/newEarnings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.userToken}`,
          },
          body: JSON.stringify({
            title,
            date,
            price,
            type,
          }),
        })

        const resData = await res.json()

        if (!res.ok) {
          depositError.value = resData.message
          turnLoadingOff()
          return
        }

        turnLoadingOff()
        // console.log('Response: ', resData)
        //add case if I have expenses
        earningsList.value.push(resData)
        console.log('resData: ', resData)

        // if (!allAmount.value) {
        //   allAmount.value += resData.price
        //   if (expenses.allExpenses) {
        //     // percent.value += ((resData.price - expenses.allExpenses) * 100) / allAmount.value
        //   }
        //   // percent.value = 100
        // } else {
        //   // percent.value += ((resData.price - expenses.allExpenses) * 100) / allAmount.value
        //   allAmount.value += resData.price
        // }
        // if (percent.value > 100) {
        //   percent.value = 100
        // }
      } catch (error) {
        // Handle network or other unexpected errors
        console.error('An error occurred:', error)
        depositError.value = 'An unexpected error occurred'
        turnLoadingOff()
      }
    }

    async function receiveDeposit() {
      try {
        const res = await fetch(`${base_API_URL}/allEarnings`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.userToken}`,
          },
        })

        if (!res.ok) {
          const resVal = await res.json()
          depositError.value = resVal.message
          turnLoadingOff()
          return
        }

        turnLoadingOff()
        earningsList.value = await res.json()
      } catch (error) {
        console.error('An error occurred:', error)
        depositError.value = 'An unexpected error occurred'
        turnLoadingOff()
      }
    }

    async function updateEarnings({
      earningsId,
      title,
      date,
      price,
      type,
    }: {
      earningsId: string
      title: string
      date?: string | Date
      price?: number | string
      type: string
    }) {
      try {
        const res = await fetch(`${base_API_URL}/earnings/${earningsId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.userToken}`,
          },
          body: JSON.stringify({
            title,
            date,
            price,
            type,
          }),
        })

        const resData = await res.json() // Parse the response body once

        if (!res.ok) {
          // Handle error if response status is not ok
          depositError.value = resData.message
          turnLoadingOff()
          return
        }

        const updIndex = earningsList.value.findIndex((earning) => earning._id === earningsId)

        console.log('updIndex: ', updIndex)

        if (updIndex === -1) {
          // Handle case where the earning is not found in the list
          depositError.value = 'Earning not found in the list'
          turnLoadingOff()
          return
        }

        // Update the earnings list with the new data
        earningsList.value.splice(updIndex, 1, resData)
        console.log('Updated earnings: ', resData)

        turnLoadingOff()
      } catch (error) {
        // Handle unexpected errors
        console.error('An error occurred:', error)
        depositError.value = 'An unexpected error occurred'
        turnLoadingOff()
      }
    }

    async function deleteEarning({ earningsId }: { earningsId: string }) {
      try {
        const res = await fetch(`${base_API_URL}/earnings/remove/${earningsId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.userToken}`,
          },
        })

        if (!res.ok) {
          const resVal = await res.json()
          depositError.value = resVal.message
          turnLoadingOff()
          return
        }

        const delIndex = earningsList.value.findIndex((ei) => ei._id === earningsId)

        if (delIndex === -1) {
          depositError.value = 'Not exist'
          turnLoadingOff()
          return
        }
        // const delItem = await res.json()

        // allAmount.value -= delItem.price

        // percent.value = 100 - (100 * Number(expenses.addExpenses)) / allAmount.value

        earningsList.value.splice(delIndex, 1)
        turnLoadingOff()
      } catch (error) {
        console.error('An error occurred:', error)
        depositError.value = 'An unexpected error occurred'
        turnLoadingOff()
      }
    }

    return {
      allAmount,
      // percent,
      earningsList,
      depositIsLoading,
      depositError,
      // depositMoney,
      // firstDepositMoney,
      addDepositMoney,
      receiveDeposit,
      updateEarnings,
      deleteEarning,
    }
  },
  { persist: true },
)
