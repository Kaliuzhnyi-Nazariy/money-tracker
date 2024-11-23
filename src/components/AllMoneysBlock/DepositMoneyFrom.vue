<script setup lang="ts">
import { useCounterStore } from '@/stores/money'
import { reactive } from 'vue'
const storeMoney = useCounterStore()

// const emit = defineEmits(['deposit'])

const depositMoneyValue = reactive({
  amount: '',
})
</script>

<template>
  <form>
    <input type="text" v-model="depositMoneyValue.amount" />
    <button
      type="submit"
      @click="
        (e) => {
          e.preventDefault()
          storeMoney.depositMoney(Number(depositMoneyValue.amount))
          // emit('deposit', depositMoneyValue.amount)
        }
      "
    >
      Deposit
    </button>
  </form>
</template>
