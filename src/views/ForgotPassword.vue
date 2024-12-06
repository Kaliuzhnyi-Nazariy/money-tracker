<script setup lang="ts">
import IForm from '@/components/IForm.vue'
import InputComp from '@/components/Input/InputComp.vue'
import { reactive } from 'vue'

const renewPasswordData = reactive({ email: '' })
</script>

<template>
  <IForm screen-size-type="mob" class="bg-main border border-white rounded-2xl p-4 text-center">
    <form @submit.prevent="console.log" class="h-full my-auto">
      <h2>Renew password</h2>
      <p class="mt-2">If you forgot your password it is not a big problem, write your email</p>
      <InputComp
        placeholder="Write your email"
        class="mt-4"
        v-model="renewPasswordData.email"
      ></InputComp>
      <button type="submit" class="mt-4">Send email</button>
    </form>
  </IForm>
</template>
