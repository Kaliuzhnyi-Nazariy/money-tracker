<script setup lang="ts">
import IForm from '@/components/IForm.vue'
import LogForm from '@/components/LogForm/LogForm.vue'
import RegForm from '@/components/RegForm/RegForm.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const regOrLog = ref('log')
const setReg = () => {
  regOrLog.value = 'reg'
}

const setLog = () => {
  regOrLog.value = 'log'
}
</script>

<template>
  <IForm screen-size-type="mob" :class="regOrLog === 'log' ? 'bg-main' : 'bg-second'">
    <p class="text-wrap w-full bg-white text-black px-2 py-3 mb-4 text-center">
      <b>Welcome to Marker-Tracker!</b>
      <br />🎯 Please log in to access your account and continue tracking with ease. Your data is
      secure, and your experience is seamless. <br />
      🔐 Sign in to get started. Don’t have an account yet? Register now and join the Marker-Tracker
      community! <br />
      <b>Let’s keep you on the right track! 🚀</b>
    </p>

    <!-- <h2>{{ regOrLog }}</h2> -->
    <div class="flex pb-4 lg:hidden">
      <div class="mx-auto flex flex-col">
        <div class="h-48 flex flex-col my-auto w-full" v-if="regOrLog === 'log'">
          <RegForm
            class="mt-2"
            @change-auth="
              () => {
                setReg()
              }
            "
          />
          <button @click="setReg">Don't have an account</button>
        </div>
        <div class="h-48 flex flex-col my-auto w-full" v-else>
          <LogForm class="w-full mt-6" :disabled-button="regOrLog === 'log'" />
          <button @click="console.log" :disabled="regOrLog === 'log'">Forgot password?</button>
          <button @click="setLog" :disabled="regOrLog === 'log'">Have an account</button>
        </div>
      </div>
    </div>
  </IForm>
  <IForm screen-size-type="pc" :class="regOrLog === 'log' ? 'bg-main' : 'bg-second'">
    <div class="flex transition-all duration-1000 fixed top-0 w-full h-full">
      <div
        class="transition-all duration-[800ms] translate-y-[50%] w-[50%] mx-auto absolute top-0 left-0 flex flex-col"
        :class="regOrLog === 'log' ? 'opacity-100' : 'opacity-0'"
      >
        <RegForm class="w-[50%] translate-x-[50%]" :disabled-button="regOrLog === 'reg'" />
        <button @click="setReg" :disabled="regOrLog === 'reg'">Don't have an account</button>
      </div>
      <p
        class="text-wrap w-[50%] h-full bg-white text-black absolute transition-all duration-1000 p-4 text-center pt-[9%]"
        :class="regOrLog === 'log' ? 'translate-x-[100%]' : 'translate-x-0'"
      >
        <b>Welcome to Marker-Tracker!</b>
        <br />🎯 Please log in to access your account and continue tracking with ease. Your data is
        secure, and your experience is seamless. <br />
        🔐 Sign in to get started. Don’t have an account yet? Register now and join the
        Marker-Tracker community! <br />
        <b>Let’s keep you on the right track! 🚀</b>
      </p>
      <div
        class="transition-all duration-[800ms] translate-y-[-50%] w-[50%] mx-auto absolute top-[50%] right-0 flex flex-col items-center"
        :class="regOrLog === 'reg' ? 'opacity-100' : 'opacity-0'"
        :disabled="regOrLog === 'log'"
      >
        <LogForm class="w-[50%]" :disabled-button="regOrLog === 'log'" />
        <router-link to="forgot" :disabled="regOrLog === 'log'"> Forgot password? </router-link>
        <button @click="setLog" :disabled="regOrLog === 'log'">Have an account</button>
      </div>
    </div>
  </IForm>
</template>
