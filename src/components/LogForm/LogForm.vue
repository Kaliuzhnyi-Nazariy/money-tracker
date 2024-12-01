<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import InputComp from '../Input/InputComp.vue'
import { useUserStore } from '@/stores/user'

const regData = reactive({
  email: '',
  password: '',
})

const props = defineProps({
  disabledButton: {
    type: Boolean,
    default: true,
    required: true,
  },
})

const useStore = useUserStore()

const tempError = ref(false)

watch(
  () => useStore.userError,
  () => {
    if (useStore.userError) {
      tempError.value = true
      setTimeout(() => {
        tempError.value = false
      }, 5000)
    }
  },
)
</script>

<template>
  <form
    @submit.prevent="
      useStore.login({
        enteredEmail: regData.email,
        password: regData.password,
      })
    "
    :disabled="useStore.userLoading"
    class="translate-x-[50%] flex flex-col gap-3 px-auto"
    :class="useStore.userLoading ? 'bg-slate-800 p-5' : ''"
  >
    <InputComp placeholder="Enter your email" v-model="regData.email" />
    <InputComp placeholder="Enter your password" type="password" v-model="regData.password" />
    <button type="submit" :disabled="props.disabledButton" :is-loading="useStore.userLoading">
      Sign In
    </button>
    <div class="text-red-500" v-if="tempError">{{ useStore.userError }}</div>
  </form>
</template>
