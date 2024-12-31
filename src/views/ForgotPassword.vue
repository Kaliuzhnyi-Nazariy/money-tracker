<script setup lang="ts">
import { useMutation } from '@/components/compossables/useMutation'
import IForm from '@/components/IForm.vue'
import InputComp from '@/components/Input/InputComp.vue'
import { messageStore } from '@/stores/messageStore'
import { useUserStore } from '@/stores/user'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const renewPasswordData = reactive({ email: '' })
const user = useUserStore()
const router = useRouter()

const store = messageStore()

const { mutation: reqForChangePassword, errorMess: reqErr } = useMutation({
  mutationFn: (email: string) => {
    return user.forgotPasswordReq(email)
  },
  onSuccess: () => {
    store.setSuccess('Request successfully processed!')
  },
  onError: () => {
    store.setError(reqErr)
  },
})
</script>

<template>
  <IForm screen-size-type="mob" class="bg-main border border-white rounded-2xl p-4 text-center">
    <form
      @submit.prevent="
        () => {
          store.resMess()
          reqForChangePassword(renewPasswordData.email)
        }
      "
      class="h-full my-auto"
    >
      <h2>Renew password</h2>
      <p class="mt-2">If you forgot your password it is not a big problem, write your email</p>
      <InputComp
        placeholder="Write your email"
        class="mt-4"
        v-model="renewPasswordData.email"
        v-if="!user.userRenewToken"
      ></InputComp>
      <button type="submit" class="mt-4" v-if="!user.userRenewToken">Send email</button>
      <button
        type="button"
        @click="() => router.replace('/renew')"
        class="mt-4 bg-white text-second px-2 rounded-lg hover:scale-110 transition-all"
        v-else
      >
        Change password
      </button>
    </form>
  </IForm>
  <IForm screen-size-type="pc" class="bg-main border border-white rounded-2xl p-4 text-center">
    <form
      @submit.prevent="
        () => {
          store.resMess()
          reqForChangePassword(renewPasswordData.email)
        }
      "
      class="h-full my-auto flex flex-col justify-center w-[80%] items-center mx-auto"
    >
      <h2>Renew password</h2>
      <p class="mt-2">If you forgot your password it is not a big problem, write your email</p>
      <InputComp
        placeholder="Write your email"
        class="mt-4"
        v-model="renewPasswordData.email"
        v-if="!user.userRenewToken"
      ></InputComp>
      <button type="submit" class="mt-4" v-if="!user.userRenewToken">Send email</button>
      <button
        type="button"
        @click="() => router.replace('/renew')"
        class="mt-4 bg-white text-second px-2 rounded-lg hover:scale-110 transition-all"
        v-else
      >
        Change password
      </button>
    </form>
  </IForm>
</template>
<!-- @submit.prevent="() => user.forgotPasswordReq(renewPasswordData.email)" -->
