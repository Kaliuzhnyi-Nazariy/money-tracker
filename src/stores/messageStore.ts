import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const messageStore = defineStore('message', () => {
  const err = ref<null | string>(null)
  const suc = ref<null | string>(null)

  const typeOfMess = computed(() => {
    return err.value ? 'Error' : 'Success'
  })

  const message = computed(() => {
    return typeOfMess.value === 'Error' ? err.value : suc.value
  })

  function setError(msg: unknown | string) {
    err.value = String(msg) // Ensure this is reactive
  }

  function resErr() {
    err.value = null
  }

  function setSuccess(msg: string) {
    suc.value = msg // Ensure this is reactive
  }

  function resSuc() {
    suc.value = null
  }

  function resMess() {
    suc.value = null
    err.value = null
  }

  return { message, setError, resErr, setSuccess, resSuc, typeOfMess, resMess }
})
