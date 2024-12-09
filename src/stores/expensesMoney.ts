import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'

const base_API_URL = 'https://tracker-money-back.onrender.com/api/money'
const user = useUserStore()

export const useExpensesMoney = defineStore(
  'expenses',
  () => {
    // const allExpenses = ref(0)
    const expensesList = ref([])
    const expensesIsLoading = ref(false)
    const expensesError = ref<null | string>(null)

    const allExpenses = computed(() => {
      return expensesList.value.reduce((acc, curr) => {
        console.log(curr)
        return (acc += Number(curr.price))
      }, 0)
    })

    const healthExpenses = computed(() => {
      let finVal = 0
      for (let i = 0; i < expensesList.value.length; i++) {
        if (expensesList.value[i].category === 'health') {
          finVal += Number(expensesList.value[i].price)
        }
      }
      return finVal
    })

    const othersExpenses = computed(() => {
      let finVal = 0
      for (let i = 0; i < expensesList.value.length; i++) {
        if (expensesList.value[i].category === 'others') {
          finVal += Number(expensesList.value[i].price)
        }
      }
      return finVal
    })

    const foodExpenses = computed(() => {
      let finVal = 0
      for (let i = 0; i < expensesList.value.length; i++) {
        if (expensesList.value[i].category === 'food') {
          finVal += Number(expensesList.value[i].price)
        }
      }
      return finVal
    })

    const needsExpenses = computed(() => {
      let finVal = 0
      for (let i = 0; i < expensesList.value.length; i++) {
        if (expensesList.value[i].category === 'needs') {
          finVal += Number(expensesList.value[i].price)
        }
      }
      return finVal
    })

    const turnLoadingOn = () => {
      expensesIsLoading.value = true
    }

    const turnLoadingOff = () => {
      expensesIsLoading.value = false
    }

    const clearError = () => {
      expensesError.value = null
    }

    async function receiveExpenses() {
      clearError()
      turnLoadingOn()

      try {
        const res = await fetch(`${base_API_URL}/allExpenses`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.userToken}`,
          },
        })

        const resData = await res.json()

        console.log(resData)

        // allExpenses.value = resData.reducer((acc, curr) => {
        //   console.log(curr)
        //   return (acc += curr.price)
        // }, 0)

        if (!res.ok) {
          expensesError.value = resData.message
          turnLoadingOff()
          return
        }

        expensesList.value = resData

        turnLoadingOff()
      } catch (error) {
        console.error('An error occurred:', error)
        expensesError.value = 'An unexpected error occurred'
        turnLoadingOff()
      }
    }

    async function addExpenses({
      title,
      date,
      price,
      type,
      category,
    }: {
      title: string
      date?: string | Date
      price?: number | string
      type: string
      category: string
    }) {
      clearError()
      turnLoadingOn()

      try {
        const res = await fetch(`${base_API_URL}/newExpenses`, {
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
            category,
          }),
        })

        const resData = await res.json()

        if (!res.ok) {
          expensesError.value = resData.message
          turnLoadingOff()
          return
        }

        expensesList.value.push(resData)
        turnLoadingOff()

        //make operation of reducing money
      } catch (error) {
        console.error('An error occurred:', error)
        expensesError.value = 'An unexpected error occurred'
        turnLoadingOff()
      }
    }

    async function updateExpenses({
      expensesId,
      title,
      date,
      price,
      type,
      category,
    }: {
      expensesId: string
      title: string
      date?: string | Date
      price?: number | string
      type: string
      category: string
    }) {
      try {
        const res = await fetch(`${base_API_URL}/expenses/${expensesId}`, {
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
            category,
          }),
        })

        const resData = await res.json()

        if (!res.ok) {
          expensesError.value = resData.message
          turnLoadingOff()
          return
        }

        const updIndex = expensesList.value.findIndex((exp) => exp._id === expensesId)

        if (updIndex === -1) {
          expensesError.value = 'Earning not found in the list'
          turnLoadingOff()
          return
        }

        expensesList.value.splice(updIndex, 1, resData)
        turnLoadingOff()
      } catch (error) {
        console.error('An error occurred:', error)
        expensesError.value = 'An unexpected error occurred'
        turnLoadingOff()
      }
    }

    async function deleteExpenses({ expensesId }: { expensesId: string }) {
      try {
        const res = await fetch(`${base_API_URL}/expenses/remove/${expensesId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.userToken}`,
          },
        })
        const resData = await res.json()

        if (!res.ok) {
          expensesError.value = resData.message
          turnLoadingOff()
          return
        }

        const updIndex = expensesList.value.findIndex((exp) => exp._id === expensesId)

        if (updIndex === -1) {
          expensesError.value = 'Earning not found in the list'
          turnLoadingOff()
          return
        }

        expensesList.value.splice(updIndex, 1)
        turnLoadingOff()
      } catch (error) {
        console.error('An error occurred:', error)
        expensesError.value = 'An unexpected error occurred'
        turnLoadingOff()
      }
    }

    return {
      allExpenses,
      expensesList,
      expensesIsLoading,
      expensesError,
      receiveExpenses,
      addExpenses,
      updateExpenses,
      deleteExpenses,
      healthExpenses,
      othersExpenses,
      foodExpenses,
      needsExpenses,
    }
  },
  { persist: true },
)
