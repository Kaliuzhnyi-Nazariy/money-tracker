<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import ButtonItem from './ButtonItem.vue'
import { useRouter } from 'vue-router'
import { useMutation } from '../compossables/useMutation'
import { resetDataStore } from '@/stores/resetAll'
import { messageStore } from '@/stores/messageStore'

const route = useRouter()

const store = messageStore()

const useStore = useUserStore()

const { resetData, resetDataInfo } = resetDataStore()

const { mutation: logoutUser, isLoading: loadingLoggingOut } = useMutation({
  mutationFn: () => {
    return useStore.logout()
  },
  onSuccess: () => {
    store.setSuccess('Logged out!')
    route.replace('authorization')
  },
  onError: (err: unknown | string) => {
    store.setError(err)
  },
})

const { mutation: resetInfo, isLoading: reseting } = useMutation<void, string>({
  mutationFn: () => {
    return resetData(useStore.userId)
  },
  onSuccess: () => {
    store.setSuccess('Data reseted')
    resetDataInfo()
  },
  onError: (err: unknown | string) => {
    store.setError(err)
  },
})
</script>

<template>
  <ul class="flex flex-col gap-3 mt-3 w-[256px] md:w-[464px] min-[1440px]:justify-center">
    <li>
      <ButtonItem typeOfComp="a" redirect-to="mailto:kaliuzhnyinazarii@gmail.com"
        >Contact us</ButtonItem
      >
    </li>
    <li>
      <ButtonItem
        @click="
          () => {
            resetInfo(useStore.userId)
            // deposit.resetData()
            // expenses.resetData()
          }
        "
      >
        {{ reseting ? 'Loading...' : 'Reset info' }}
      </ButtonItem>
    </li>
    <li>
      <ButtonItem
        @click="
          () => {
            logoutUser()
          }
        "
        >{{ loadingLoggingOut ? 'Loading...' : 'Log out' }}</ButtonItem
      >
    </li>
  </ul>
</template>
