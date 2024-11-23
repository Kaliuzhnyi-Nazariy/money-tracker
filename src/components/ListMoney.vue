<script setup lang="ts">
import { computed, ref } from 'vue'
import EarningsListItem from './EarningsList/EarningsListItem.vue'
import ExpensesListItem from './ExpensesList/ExpensesListItem.vue'

const Props = defineProps({
  typeOfList: {
    type: String,
    required: true,
  },
})

const typeOfListIsExpenses = computed(() => {
  return Props.typeOfList === 'expenses' ? true : false
})

const expensesList = ref([
  { id: 1, name: 'haha', price: 200, Date: '22-11-2024', category: 'groceries' },
  { id: 2, name: 'groceries', price: 45.8, Date: '23-11-2024', category: 'clothes' },
  { id: 3, name: 'car', price: 4500, Date: '23-11-2024', category: 'health' },
  { id: 4, name: 'vitamins', price: 111, Date: '22-11-2024', category: 'others' },
])

const addEarnings = () => {
  const newExpenses = {
    id: 5,
    name: 'notebook',
    price: 2.5,
  }
  console.log(newExpenses)
  expensesList.value.push(newExpenses)
}

const addExpenses = () => {
  const newExpenses = {
    id: 5,
    name: 'notebook',
    price: 2.5,
  }
  console.log(newExpenses)
  expensesList.value.push(newExpenses)
}
</script>

<template>
  <div class="border border-white rounded-2xl py-2 mt-3 w-[256px]">
    <div class="flex w-full justify-between px-2">
      <h3 v-if="typeOfListIsExpenses">Expenses list</h3>
      <h3 v-else>Earnings list</h3>
      <button v-if="typeOfListIsExpenses" class="mr-2" @click="addExpenses()">+</button>
      <button v-else class="mr-2" @click="addEarnings()">+</button>
    </div>
    <ul class="w-full" v-if="typeOfListIsExpenses">
      <ExpensesListItem
        v-for="expensesItem in expensesList"
        :key="expensesItem.id"
        :name="expensesItem.name"
        :money="expensesItem.price"
        :date="expensesItem.Date"
        :category="expensesItem.category"
      />
    </ul>
    <ul v-else>
      <EarningsListItem
        v-for="expensesItem in expensesList"
        :key="expensesItem.id"
        :name="expensesItem.name"
        :money="expensesItem.price"
        :date="expensesItem.Date"
        :category="expensesItem.category"
      />
    </ul>
  </div>
</template>
