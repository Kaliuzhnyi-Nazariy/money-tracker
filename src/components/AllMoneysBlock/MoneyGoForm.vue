<script setup lang="ts">
import { useCounterStore } from '@/stores/depositMoney'
import { reactive } from 'vue'
import InputComp from '../Input/InputComp.vue'

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
  <form
    @submit="handleSubmit"
    class="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-white p-6 text-black"
  >
    <h3 class="font-bold mb-2 text-center">What you buy?😏</h3>
    <div class="flex flex-col gap-3">
      <InputComp class="bg-black" placeholder="data" />
      <input type="text" v-model="withdrawData.amountToWithdraw" />
      <p>List of categories</p>
    </div>
    <button type="submit">Withdraw</button>
  </form>
</template>
