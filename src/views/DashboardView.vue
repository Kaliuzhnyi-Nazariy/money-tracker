<script setup lang="ts">
import AllMoneyBlock from '@/components/AllMoneysBlock/AllMoneyBlock.vue'
import ButtonsList from '@/components/Buttons/ButtonsList.vue'
import ExpensesBlock from '@/components/ExpensesBlock/ExpensesBlock.vue'
import ListMoney from '@/components/ListMoney/ListMoney.vue'
import router from '@/router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

if (!userStore.refreshToken) {
  router.replace('/authorization')
}
</script>

<template>
  <!-- <button
    @click="
      () => {
        userStore.register({
          email: 'lxxx@mail.com',
          password: 'AA12!@aa',
          confirmPassword: 'AA12!@aa',
        })
      }
    "
  >
    Click
  </button>
  <button
    @click="
      () => {
        userStore.login({
          enteredEmail: 'lxxx@mail.com',
          password: 'AA12!@aa',
        })
      }
    "
  >
    Click for login
  </button>
  <button
    @click="
      () => {
        userStore.logout()
      }
    "
  >
    Click for logout
  </button> -->

  <AllMoneyBlock />
  <ExpensesBlock />
  <ListMoney type-of-list="expenses" />
  <ListMoney type-of-list="earnings" />
  <ButtonsList />
</template>
