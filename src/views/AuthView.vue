<script setup lang="ts">
import LogForm from '@/components/LogForm/LogForm.vue'
import RegForm from '@/components/RegForm/RegForm.vue'
import { ref } from 'vue'

const regOrLog = ref('log')
const setReg = () => {
  regOrLog.value = 'reg'
}

const setLog = () => {
  regOrLog.value = 'log'
}
</script>

<template>
  <div
    class="w-[800px] h-[350px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white transition-all"
    :class="regOrLog === 'log' ? 'bg-main' : 'bg-second'"
  >
    <!-- <h2>{{ regOrLog }}</h2> -->
    <div class="flex transition-all duration-1000 fixed top-0 w-full h-full">
      <div
        class="transition-all duration-[800ms] translate-y-[50%] w-[50%] mx-auto absolute top-0 left-0 flex flex-col"
        :class="regOrLog === 'log' ? 'opacity-100' : 'opacity-0'"
      >
        <RegForm class="w-[50%]" :disabled-button="regOrLog === 'reg'" />
        <button @click="setReg" :disabled="regOrLog === 'reg'">Don't have an account</button>
      </div>
      <p
        class="text-wrap w-[50%] h-full bg-white text-black absolute transition-all duration-1000 p-4"
        :class="regOrLog === 'log' ? 'translate-x-[100%]' : 'translate-x-0'"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero eligendi assumenda aperiam
        deserunt reiciendis nam fugiat mollitia maxime voluptatibus molestias omnis dicta architecto
        asperiores impedit dolor magni, nostrum iste dolorem.
      </p>
      <div
        class="transition-all duration-[800ms] translate-y-[-50%] w-[50%] mx-auto absolute top-[50%] right-0 flex flex-col"
        :class="regOrLog === 'reg' ? 'opacity-100' : 'opacity-0'"
        :disabled="regOrLog === 'log'"
      >
        <LogForm class="w-[50%]" :disabled-button="regOrLog === 'log'" />
        <button @click="setLog" :disabled="regOrLog === 'log'">Have an account</button>
      </div>
    </div>
  </div>
</template>
