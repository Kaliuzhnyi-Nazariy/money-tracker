<script setup lang="ts">
// import { useDepositStore } from '@/stores/depositMoney'
import { useMoneyStore } from '@/stores/moneyValue'
import { useProcentStore } from '@/stores/procent'
// import {
//   ref,
//   // watch
// } from 'vue'

// const Props = defineProps({
// amountOfMoney: {
//   default: '',
//   type: String,
// },
// withdrawMoney: {
//   default: '',
//   type: String,
// },
// depositMoney: {
//   default: '',
//   type: String,
// },
// })
// const Props = defineProps<{
//   amountOfMoney: string

//   withdrawMoney: string

//   depositMoney: string
// }>()

// watchEffect(() => {
//   console.log('Props: ', Props.amountOfMoney)
// })

const percentStore = useProcentStore()
const moneyStore = useMoneyStore()
// const moneyProgress = ref(0)
// const onePercentOfMoney = ref(0)
// const progress = ref(0)
// const moneyGo = ref(0)

// const moneyGoFunc = (numberOfMoney: number): void => {
//   moneyGo.value = numberOfMoney
//   moneyProgress.value -= numberOfMoney
//   progress.value -= numberOfMoney / onePercentOfMoney.value
// }

// const setProgress = () => {
//   progress.value = 100
//   moneyProgress.value = Number(Props.amountOfMoney)
// }

// const moneyDeposit = () => {
//   moneyProgress.value += Number(Props.depositMoney)
//   const percents = (Number(Props.depositMoney) * 100) / moneyProgress.value
//   progress.value += percents
// }

// watch(
//   () => Props.amountOfMoney,
//   () => {
//     console.log('amount of money as props: ', Props.amountOfMoney)
//     setProgress()
//     onePercentOfMoney.value = moneyProgress.value / 100
//   },
// )

// watch(
//   () => Props.withdrawMoney,
//   (newValue: string, oldValue: string) => {
//     console.log('newValue: ', newValue)
//     console.log('oldValue: ', oldValue)
//     if (newValue !== oldValue || moneyGo.value !== Number(newValue)) {
//       moneyGoFunc(Number(newValue))
//       moneyGo.value = 0
//     }

//     if (progress.value < 0 || moneyProgress.value === 0) {
//       progress.value = 0
//     }
//   },
// )

// watch(
//   () => Props.depositMoney,
//   () => {
//     moneyDeposit()
//     if (progress.value > 100) {
//       progress.value = 100
//     }
//   },
// )
</script>

<template>
  <div class="w-full flex flex-col items-center mb-4">
    <h2 class="w-full text-center text-lg font-bold mb-4">Your money flow</h2>
    <div
      class="radial-progress w-56 h-56"
      :style="`--value:${percentStore.percent}; --size:14rem; --thickness:0.5rem`"
      role="progressbar"
      :max="percentStore.percent"
    >
      {{ moneyStore.moneyValue }}
    </div>
  </div>
</template>
