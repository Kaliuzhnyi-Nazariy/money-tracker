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
  <div class="bg-secondary p-5 w-[300px] md:w-[450px]">
    <form @submit.prevent="changePassword()">
      <span class="flex w-full">
        <InputComp
          placeholder="Password"
          v-model:model-value="changePasswordData.password"
          :type="typeComp"
          label="Password"
          class="w-full"
        />
        <ButtonItem
          type-of-comp="button"
          type="button"
          @click="toggleShowPssw"
          class="!w-[36px] !h-[36px] flex justify-center items-center ml-auto mt-auto"
          >{{ showPassword ? '🐵' : '🙈' }}</ButtonItem
        >
      </span>
      <span class="flex w-full mt-3">
        <InputComp
          class=""
          placeholder="Confirm password"
          v-model:model-value="changePasswordData.confirmPassword"
          :type="showedComp"
          label="Confirm password"
        />
        <ButtonItem
          type-of-comp="button"
          type="button"
          @click="toggleShowPConf"
          class="!w-[36px] !h-[36px] flex justify-center items-center ml-auto mt-auto"
          >{{ showConfirm ? '🐵' : '🙈' }}</ButtonItem
        >
      </span>
      <div class="flex flex-col mt-3 gap-2 lg:flex-row lg:gap-10">
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
