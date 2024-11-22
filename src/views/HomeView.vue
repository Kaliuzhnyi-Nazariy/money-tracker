<script setup lang="ts">
import AllMoneyBlock from '@/components/AllMoneysBlock/AllMoneyBlock.vue'
import ExpensesBlock from '@/components/ExpensesBlock/ExpensesBlock.vue'
</script>

<template>
  <AllMoneyBlock />
  <ExpensesBlock />
</template>
<!-- <script setup lang="ts">
import MoneyCircle from '@/components/AllMoneysBlock/MoneyCircle.vue'
import MoneyForm from '@/components/AllMoneysBlock/MoneyForm.vue'
import MoneyGoForm from '@/components/AllMoneysBlock/MoneyGoForm.vue'
import { ref, watch } from 'vue'

const money = ref('')
const moneyToWithdrawAmount = ref('')
const time = ref(0)

const setTime = (timestamp: number) => {
  time.value = timestamp
}

const setMoney = (moneyInput: string) => {
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

watch(time, () => {
  setMoneyToWithdrawAmount({
    amountToWithdraw: `${moneyToWithdrawAmount.value}`,
    timestamp: new Date(),
  })
})
</script>

<template>
  <MoneyForm @submit="(e) => setMoney(e.amountOfMoney)" />
  {{ money }}
  <MoneyCircle :amountOfMoney="money" :withdrawMoney="moneyToWithdrawAmount" />
  <MoneyGoForm
    @moneyToWithdraw="
      (e) => {
        console.log(e)
        setTime(e.timestamp)
        setMoneyToWithdrawAmount(e)
      }
    "
  />
</template> -->
