<script setup lang="ts">
import { useCounterStore } from '@/stores/money'
import { reactive } from 'vue'

const storeMoney = useCounterStore()

const withdrawData = reactive({
  amountToWithdraw: '',
})

const handleSubmit = (e: Event) => {
  e.preventDefault()

  storeMoney.withdrawMoney(Number(withdrawData.amountToWithdraw))
  withdrawData.amountToWithdraw = ''
}
</script>

<template>
  <form @submit="handleSubmit">
    <input type="text" v-model="withdrawData.amountToWithdraw" />
    <button type="submit">Withdraw</button>
  </form>
</template>
