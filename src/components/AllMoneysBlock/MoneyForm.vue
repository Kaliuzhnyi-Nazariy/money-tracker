<script setup lang="ts">
import { useDepositStore } from '@/stores/depositMoney'
import {
  reactive,
  // toRaw
} from 'vue'

// const emit = defineEmits(['submit'])
const storeMoney = useDepositStore()

const moneyData = reactive({
  amountOfMoney: '',
})
</script>

<template>
  <form
    @submit="
      (e) => {
        e.preventDefault()
        storeMoney.firstDepositMoney(Number(moneyData.amountOfMoney))
        // emit('submit', toRaw(moneyData))
        // console.log(toRaw(moneyData))
      }
    "
  >
    <input type="text" v-model="moneyData.amountOfMoney" />
    <button type="submit">Submit</button>
  </form>
</template>
