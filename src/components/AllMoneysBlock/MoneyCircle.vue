<script setup lang="ts">
import { ref, watch } from 'vue'

const Props = defineProps({
  amountOfMoney: {
    default: '',
    type: String,
  },
  withdrawMoney: {
    default: '',
    type: String,
  },
})

const moneyProgress = ref(0)
const onePercentOfMoney = ref(0)
const progress = ref(0)
const moneyGo = ref(0)

const moneyGoFunc = (numberOfMoney: number): void => {
  moneyGo.value = numberOfMoney
  moneyProgress.value -= numberOfMoney
  progress.value -= numberOfMoney / onePercentOfMoney.value
}

const setProgress = () => {
  progress.value = 100
  moneyProgress.value = Number(Props.amountOfMoney)
}

watch(
  () => Props.amountOfMoney,
  () => {
    setProgress()
    onePercentOfMoney.value = moneyProgress.value / 100
  },
)

watch(
  () => Props.withdrawMoney,
  (newValue: string, oldValue: string) => {
    console.log('newValue: ', newValue)
    console.log('oldValue: ', oldValue)
    if (newValue !== oldValue || moneyGo.value !== Number(newValue)) {
      moneyGoFunc(Number(newValue))
      moneyGo.value = 0
    }
  },
)
</script>

<template>
  <h2>Your money flow</h2>
  <div
    class="radial-progress w-56 h-56"
    :style="`--value:${progress}; --size:14rem; --thickness:0.5rem`"
    role="progressbar"
    :max="progress"
  >
    {{ moneyProgress }}
  </div>
  <button @click="() => moneyGoFunc(100)">moneyGo</button>
</template>
