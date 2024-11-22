<!-- <script setup lang="ts">
import { reactive, toRaw } from 'vue'

const emit = defineEmits(['moneyToWithdraw'])

const withdrawData = reactive({
  amountToWithdraw: '',
})
</script>

<template>
  <form
    @submit="
      (e) => {
        e.preventDefault()
        // console.log({ widthdrawData: toRaw(withdrawData), timestamp: Date.now() })
        emit('moneyToWithdraw', { amountToWithdraw: toRaw(withdrawData), timestamp: Date.now() })
      }
    "
  >
    <input type="text" v-model="withdrawData.amountToWithdraw" />
    <button type="submit">widthraw</button>
  </form>
</template> -->

<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits(['moneyToWithdraw'])

const withdrawData = reactive({
  amountToWithdraw: '',
})

const handleSubmit = (e: Event) => {
  e.preventDefault()
  emit('moneyToWithdraw', {
    amountToWithdraw: withdrawData.amountToWithdraw,
    timestamp: Date.now(),
  })
  withdrawData.amountToWithdraw = ''
}
</script>

<template>
  <form @submit="handleSubmit">
    <input type="text" v-model="withdrawData.amountToWithdraw" />
    <button type="submit">Withdraw</button>
  </form>
</template>
