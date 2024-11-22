<script setup lang="ts">
import { reactive, toRaw } from 'vue'

const emit = defineEmits(['submit'])

const moneyData = reactive({
  amountOfMoney: '',
})
</script>

<template>
  <form
    @submit="
      (e) => {
        e.preventDefault()
        emit('submit', toRaw(moneyData))
        // console.log(toRaw(moneyData))
      }
    "
  >
    <input type="text" v-model="moneyData.amountOfMoney" />
    <button type="submit">Submit</button>
  </form>
</template>
