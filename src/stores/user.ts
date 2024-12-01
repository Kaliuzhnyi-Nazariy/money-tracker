import { defineStore } from 'pinia'
import { ref } from 'vue'

const base_API_URL = 'https://tracker-money-back.onrender.com/api/users'

export const useUserStore = defineStore('user', () => {
  const userEmail = ref('')
  const userToken = ref('')
  const userLoading = ref(false)
  const userError = ref('')

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
    // console.log(email, password, confirmPassword)
    turnToTrueUserLoading()
    cleanError()
    if (password !== confirmPassword) {
      turnToFalseUserLoading()
      userError.value = 'Passwords do not match!'
      return
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
      turnToFalseUserLoading()
      return
    }

    console.log(await res.json())

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

      return
    }

    const { email, token } = await res.json()
    userToken.value = token
    userEmail.value = email
    turnToFalseUserLoading()

    console.log({ email, token })
    console.log({ userToken, userEmail })
  }

  async function logout() {
    const res = await fetch(`${base_API_URL}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken.value}` },
    })

    if (!res.ok) {
      console.log(res)
      console.log('await res.json(): ', await res.json())
      throw new Error('')
    }

    userToken.value = ''
  }

  return { userEmail, userToken, userLoading, userError, register, login, logout }
})
