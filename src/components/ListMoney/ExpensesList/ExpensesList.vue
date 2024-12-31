<script setup lang="ts">
import ExpensesListItem from '@/components/ExpensesList/ExpensesListItem.vue'
import { useExpensesMoney } from '@/stores/expensesMoney'

const expensesStore = useExpensesMoney()
</script>

<template>
  <ul
    class="w-full h-[70%] md:flex md:flex-col md:gap-2"
    v-if="!expensesStore.expensesIsLoading"
    :class="[
      expensesStore.expensesList.length > 2 ? 'overflow-y-scroll' : 'overflow-hidden',
      expensesStore.expensesList.length === 0 ? 'hidden' : 'block',
    ]"
  >
    <ExpensesListItem
      v-for="expensesItem in expensesStore.expensesList"
      :key="expensesItem._id as string"
      :id="expensesItem._id"
      :name="expensesItem.title"
      :money="Number(expensesItem.price)"
      :date="expensesItem.date"
      :category="expensesItem.category"
    />
  </ul>
  <div class="flex justify-center" v-if="expensesStore.expensesIsLoading">Loading...</div>
  <div
    class="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[50%]"
    v-if="expensesStore.expensesList.length === 0"
  >
    Empty
  </div>
</template>
