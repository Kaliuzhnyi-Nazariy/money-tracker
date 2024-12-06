<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import InputComp from '../Input/InputComp.vue'
import { useUserStore } from '@/stores/user'
import { useMutation } from '../compossables/useMutation'
import router from '@/router'

const logData = reactive({
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

const { mutation: logUser, isLoading: loggingUser } = useMutation({
  mutationFn: (logData: { email: string; password: string; confirmPassword: string }) => {
    return useStore.login({
      enteredEmail: logData.email,
      password: logData.password,
    })
  },
  onSuccess: () => router.replace('/dashboard'),
})

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
    @submit.prevent="logUser(logData)"
    :disabled="useStore.userLoading"
    class="flex flex-col gap-3 px-auto"
    :class="useStore.userLoading ? 'bg-slate-800 p-5' : ''"
  >
    <InputComp placeholder="Enter your email" v-model="logData.email" />
    <InputComp placeholder="Enter your password" type="password" v-model="logData.password" />
    <button type="submit" :disabled="props.disabledButton" :is-loading="useStore.userLoading">
      Sign In
    </button>
    <div class="text-red-500" v-if="tempError">{{ useStore.userError }}</div>
  </form>
</template>

<!--     class="translate-x-[50%] flex flex-col gap-3 px-auto"
 -->
