<script setup lang="ts">
import ButtonItem from '@/components/Buttons/ButtonItem.vue'
import { useMutation } from '@/components/compossables/useMutation'
import InputComp from '@/components/Input/InputComp.vue'
import { messageStore } from '@/stores/messageStore'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { nextTick } from 'vue'

const changePasswordData = reactive({
  password: '',
  confirmPassword: '',
})

const store = messageStore()

const comparePasswords = () => {
  store.resMess()
  if (
    !changePasswordData.password ||
    !changePasswordData.confirmPassword ||
    changePasswordData.password === '' ||
    changePasswordData.confirmPassword === ''
  ) {
    store.setError("This fields can't be empty")
    return
  } // throw "This fields can't be empty"
  if (changePasswordData.password !== changePasswordData.confirmPassword)
    store.setError('Password do not match')
  else {
    store.setSuccess('everything is okay')
  }
}

const showPassword = ref(false)
const showConfirm = ref(false)

const toggleShowPssw = () => {
  showPassword.value = !showPassword.value
}
const toggleShowPConf = () => {
  showConfirm.value = !showConfirm.value
}

const typeComp = computed(() => {
  return showPassword.value ? 'text' : 'password'
})

const showedComp = computed(() => {
  return showConfirm.value ? 'text' : 'password'
})

onMounted(() => {
  showPassword.value = false
})

const useStore = useUserStore()

const route = useRouter()

const {
  mutation: changePassword,
  isLoading: changing,
  errorMess,
} = useMutation({
  mutationFn: () => {
    return useStore.renewPassword({
      password: changePasswordData.password,
      confirmPassword: changePasswordData.confirmPassword,
    })
  },
  onSuccess: () => {
    store.setSuccess('Password has been changed!')
    route.replace('authorization')
  },
  onError: () => {
    store.setError(errorMess)
  },
})
</script>

<template>
  <div class="bg-second p-5">
    <form @submit.prevent="changePassword()">
      <span class="relative">
        <InputComp
          placeholder="Password"
          v-model:model-value="changePasswordData.password"
          :type="typeComp"
          label="Password"
        />
        <ButtonItem
          type-of-comp="button"
          type="button"
          @click="toggleShowPssw"
          class="absolute w-7 !h-7 flex justify-center items-center right-1 top-[50%]"
          >{{ showPassword ? '🐵' : '🙈' }}</ButtonItem
        >
      </span>
      <span class="relative">
        <InputComp
          class="mt-3"
          placeholder="Confirm password"
          v-model:model-value="changePasswordData.confirmPassword"
          :type="showedComp"
          label="Confirm password"
        />
        <ButtonItem
          type-of-comp="button"
          type="button"
          @click="toggleShowPConf"
          class="absolute w-7 !h-7 flex justify-center items-center right-1 top-[50%] translate-y-[25%]"
          >{{ showConfirm ? '🐵' : '🙈' }}</ButtonItem
        >
      </span>
      <div class="flex mt-3 gap-10">
        <ButtonItem
          typeOfComp="button"
          type="button"
          @click="
            async () => {
              store.resMess()
              await nextTick()

              comparePasswords()
            }
          "
          class="hover:bg-white hover:bg-opacity-50 transition-all"
          >Check password</ButtonItem
        >
        <ButtonItem
          typeOfComp="button"
          type="submit"
          :disabled="changing"
          class="hover:bg-white hover:bg-opacity-50 transition-all"
          >{{ changing ? 'Loading...' : 'Change password' }}</ButtonItem
        >
      </div>
    </form>
  </div>
</template>
