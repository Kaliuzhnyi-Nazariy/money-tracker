<script setup lang="ts">
import AllMoneyBlock from '@/components/AllMoneysBlock/AllMoneyBlock.vue'
import ButtonsList from '@/components/Buttons/ButtonsList.vue'
import ExpensesBlock from '@/components/ExpensesBlock/ExpensesBlock.vue'
import ListMoney from '@/components/ListMoney.vue'
</script>

<template>
  <AllMoneyBlock />
  <ExpensesBlock />
  <ListMoney type-of-list="expenses" />
  <ListMoney type-of-list="earnings" />
  <ButtonsList />
</template>
