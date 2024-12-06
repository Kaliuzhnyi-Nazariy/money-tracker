<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import InputComp from '../Input/InputComp.vue'
import { useUserStore } from '@/stores/user'
import { useMutation } from '../compossables/useMutation'

const regData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})

const props = defineProps({
  disabledButton: {
    type: Boolean,
    // default: true,
    // required: true,
  },
})

const emit = defineEmits(['changeAuth'])

const useStore = useUserStore()

const tempError = ref(false)

const { mutation: regUser, isLoading: reggingUser } = useMutation({
  mutationFn: (regData: { email: string; password: string; confirmPassword: string }) => {
    return useStore.register({
      email: regData.email,
      password: regData.password,
      confirmPassword: regData.confirmPassword,
    })
  },
  onSuccess: () => emit('changeAuth'),
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
    @submit.prevent="
      regUser(regData)
      // useStore.register({
      //   email: regData.email,
      //   password: regData.password,
      //   confirmPassword: regData.confirmPassword,
      // })
    "
    :disabled="useStore.userLoading"
    class="flex flex-col gap-3 px-auto"
    :class="useStore.userLoading ? 'bg-slate-800 p-5' : ''"
  >
    <InputComp placeholder="Enter your email" v-model="regData.email" />
    <InputComp placeholder="Enter your password" type="password" v-model="regData.password" />
    <InputComp
      placeholder="Confirm your password"
      type="password"
      v-model="regData.confirmPassword"
    />
    <button type="submit" :disabled="props.disabledButton" :is-loading="reggingUser">
      Sign up
    </button>
    <div class="text-red-500" v-if="tempError">{{ useStore.userError }}</div>
  </form>
</template>

<!-- translate-x-[50%] -->
