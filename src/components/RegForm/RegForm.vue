<script setup lang="ts">
import { reactive } from 'vue'
import InputComp from '../Input/InputComp.vue'
import { useUserStore } from '@/stores/user'
import { useMutation } from '../compossables/useMutation'
import ButtonLogReg from '../ButtonLogReg/ButtonLogReg.vue'
import { messageStore } from '@/stores/messageStore'
const regData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})

// const props = defineProps({
//   disabledButton: {
//     type: Boolean,
//     // default: true,
//     // required: true,
//   },
// })
const store = messageStore()

const emit = defineEmits(['changeAuth'])

const useStore = useUserStore()

const { mutation: regUser, isLoading: reggingUser } = useMutation({
  mutationFn: (regData: { email: string; password: string; confirmPassword: string }) => {
    return useStore.register({
      email: regData.email,
      password: regData.password,
      confirmPassword: regData.confirmPassword,
    })
  },
  onSuccess: () => {
    store.setSuccess('Account created!')
    emit('changeAuth')
  },
  onError: () => {
    store.setError(useStore.userError)
  },
})

// watch(
//   () => useStore.userError,
//   () => {
// setError(useStore.userError)
//     // if (useStore.userError) {
//     //   tempError.value = true
//     //   setTimeout(() => {
//     //     tempError.value = false
//     //   }, 5000)
//     // }
//   },
// )
</script>

<template>
  <form
    @submit.prevent="
      regUser(regData)
      // useStore.register({
      //   email: regData.email,
      //   password: regData.password,
      //   confirmPassword: regData.confirmPassword,
      // })
    "
    :disabled="useStore.userLoading"
    class="flex flex-col gap-2 px-auto"
  >
    <InputComp placeholder="Enter your email" v-model="regData.email" />
    <InputComp placeholder="Enter your password" type="password" v-model="regData.password" />
    <InputComp
      placeholder="Confirm your password"
      type="password"
      v-model="regData.confirmPassword"
    />
    <ButtonLogReg
      log-or-reg="reg"
      :is-loading="reggingUser"
      @click="
        () => {
          store.resErr()
          store.resSuc()
        }
      "
    />
    <!-- <button type="submit" :disabled="props.disabledButton" :is-loading="reggingUser">
      Sign up
    </button> -->
  </form>
</template>

<!-- translate-x-[50%] -->
