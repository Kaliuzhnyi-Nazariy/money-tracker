import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const base_API_URL = 'https://tracker-money-back.onrender.com/api/users'

const router = useRouter()

export const useUserStore = defineStore(
  'user',
  () => {
    const userId = ref('')
    const userEmail = ref('')
    const userToken = ref('')
    const userRenewToken = ref('')
    const userLoading = ref(false)
    const userError = ref('')

    const refreshToken = computed(() => userToken.value)

    const turnToTrueUserLoading = () => {
      userLoading.value = true
    }

    const turnToFalseUserLoading = () => {
      userLoading.value = false
    }

    const cleanError = () => {
      userError.value = ''
    }

    async function register({
      email,
      password,
      confirmPassword,
    }: {
      email: string
      password: string
      confirmPassword: string
    }) {
      turnToTrueUserLoading()
      cleanError()
      if (password !== confirmPassword) {
        turnToFalseUserLoading()
        userError.value = 'Passwords do not match!'
        throw 'Passwords do not match!'
      }

      const res = await fetch(`${base_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
        }),
      })

      if (!res.ok) {
        const messageError = await res.json()
        userError.value = messageError.message
        throw `${messageError.message}`
      }

      turnToFalseUserLoading()
    }

    async function login({ enteredEmail, password }: { enteredEmail: string; password: string }) {
      cleanError()
      turnToTrueUserLoading()

      const res = await fetch(`${base_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: enteredEmail, password }),
      })

      if (!res.ok) {
        const messageError = await res.json()
        userError.value = messageError.message
        turnToFalseUserLoading()
        throw messageError.message
      }

      const { _id, email, token } = await res.json()
      userId.value = _id
      userToken.value = token
      userEmail.value = email
      turnToFalseUserLoading()
    }

    async function logout() {
      const res = await fetch(`${base_API_URL}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken.value}` },
      })

      if (!res.ok) {
        const msgErr = await res.json()
        if (msgErr.message === 'Unauthorized') {
          userToken.value = ''
        }
        router.replace('/authorization')
        throw msgErr.message
      }

      userToken.value = ''
    }

    async function forgotPasswordReq(email: string) {
      const res = await fetch(`${base_API_URL}/forgotPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const resData = await res.json()
        throw resData.message
      }

      const { resetTok } = await res.json()
      userRenewToken.value = resetTok
      return resetTok
    }

    async function renewPassword({
      password,
      confirmPassword,
    }: {
      password: string
      confirmPassword: string
    }) {
      const res = await fetch(`${base_API_URL}/renewPassword/${userRenewToken.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: password, confirmNewPassword: confirmPassword }),
      })

      if (!res.ok) {
        console.log('await res.json(): ', await res.json())
        throw new Error('')
      }

      userRenewToken.value = ''
    }

    const resetToken = () => {
      userToken.value = ''
    }

    return {
      userId,
      userEmail,
      userToken,
      userRenewToken,
      userLoading,
      userError,
      refreshToken,
      register,
      login,
      forgotPasswordReq,
      logout,
      renewPassword,
      resetToken,
    }
  },
  { persist: true },
)
