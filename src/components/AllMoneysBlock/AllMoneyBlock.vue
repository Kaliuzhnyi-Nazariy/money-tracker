<script setup lang="ts">
import MoneyCircle from '@/components/AllMoneysBlock/MoneyCircle.vue'
import MoneyForm from '@/components/AllMoneysBlock/MoneyForm.vue'
import MoneyGoForm from '@/components/AllMoneysBlock/MoneyGoForm.vue'
import {
  ref,
  // watch
} from 'vue'
import DepositMoneyFrom from './DepositMoneyFrom.vue'

const money = ref('')
const moneyToWithdrawAmount = ref('')
const depositMoney = ref('')
const time = ref(0)
const trigger = ref(0)

const increaseTrigger = () => {
  trigger.value++
}

const setTime = (timestamp: number) => {
  time.value = timestamp
}

const setMoney = (moneyInput: string) => {
  console.log('inputMoney in setMoney: ', moneyInput)
  money.value = moneyInput
}

const setMoneyToWithdrawAmount = ({
  amountToWithdraw,
  timestamp,
}: {
  amountToWithdraw: string
  timestamp: number
}) => {
  console.log('Timestamp:', timestamp)
  moneyToWithdrawAmount.value = amountToWithdraw
}

const depositMoneyFn = (depositMoneyAmount: string) => {
  depositMoney.value = depositMoneyAmount
}

// watch(time, () => {
//   setMoneyToWithdrawAmount({
//     amountToWithdraw: `${moneyToWithdrawAmount.value}`,
//     timestamp: Date.now(),
//   })
// })

// watch(
//   () => trigger.value,
//   () => {
//     setMoney()
//   },
// )
</script>

<template>
  <!-- <div class="outline outline-1 outline-red-500 solid w-[254px] h-[228px]"> -->
  <div class="outline outline-1 outline-red-500 solid w-[256px]">
    <MoneyForm />
    {{ money }}
    <MoneyCircle />
    <MoneyGoForm />
    <DepositMoneyFrom />
  </div>
</template>
