<script setup lang="ts">
import { reactive } from 'vue'
import InputComp from '../Input/InputComp.vue'
import { useUserStore } from '@/stores/user'
import { useMutation } from '../compossables/useMutation'
import ButtonLogReg from '../ButtonLogReg/ButtonLogReg.vue'
import { useRouter } from 'vue-router'
import { messageStore } from '@/stores/messageStore'

const router = useRouter()

export interface ILogData {
  email: string
  password: string
}

const logData = reactive({
  email: '',
  password: '',
} as ILogData)

const store = messageStore()

const useStore = useUserStore()

const { mutation: logUser, isLoading: loggingUser } = useMutation({
  mutationFn: (logData: { email: string; password: string }) => {
    return useStore.login({
      enteredEmail: logData.email,
      password: logData.password,
    })
  },
  onSuccess: () => {
    store.setSuccess('You are logged in!')
    router.replace('/money-tracker/dashboard')
  },
  onError: () => {
    store.setError(useStore.userError)
  },
})
</script>

<template>
  <form
    @submit.prevent="logUser(logData)"
    :disabled="useStore.userLoading"
    class="flex flex-col gap-2 px-auto"
  >
    <InputComp placeholder="Enter your email" v-model="logData.email" :disabled="loggingUser" />
    <InputComp
      placeholder="Enter your password"
      type="password"
      v-model="logData.password"
      :disabled="loggingUser"
    />
    <ButtonLogReg
      log-or-reg="log"
      :is-loading="loggingUser"
      @click="
        () => {
          store.resErr()
          store.resSuc()
        }
      "
    />
  </form>
</template>

<!--     class="translate-x-[50%] flex flex-col gap-3 px-auto"
 -->
