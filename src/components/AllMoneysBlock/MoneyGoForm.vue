<script setup lang="ts">
import { useExpensesMoney } from '@/stores/expensesMoney'
import { computed, reactive } from 'vue'
import InputComp from '../Input/InputComp.vue'
import DatePicker from 'primevue/datepicker'
import { dateFormatted } from '../compossables/dateFormatter'

const storeMoney = useExpensesMoney()

const props = defineProps({
  type: {
    type: String,
    default: 'with',
    enum: ['with', 'upd'],
  },
  id: {
    type: String,
  },
  name: {
    type: String,
    default: '',
  },
  money: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString('fr-CA'),
  },
  category: {
    type: String,
    default: 'others',
  },
})

const emit = defineEmits(['close'])

export interface IWithdrawData {
  date: Date | Date[] | (Date | null)[] | null | undefined | string
  amountToWithdraw: string | number | undefined
  category: string
  title: string
}

const withdrawData = reactive({
  date: null,
  amountToWithdraw: '',
  category: 'others',
  title: '',
}) as IWithdrawData

const cleanDataValues = () => {
  withdrawData.date = null
  withdrawData.amountToWithdraw = ''
  withdrawData.category = 'others'
  withdrawData.title = ''
}

if (props.name) {
  withdrawData.title = props.name
  withdrawData.amountToWithdraw = props.money
  withdrawData.category = props.category
  withdrawData.date = props.date
}

const operation = computed(() => {
  return props.type === 'with'
    ? storeMoney.addExpenses({
        title: withdrawData.title,
        date: withdrawData.date,
        price: withdrawData.amountToWithdraw,
        type: 'expenses',
        category: withdrawData.category,
      })
    : storeMoney.updateExpenses({
        title: withdrawData.title,
        date: withdrawData.date,
        price: withdrawData.amountToWithdraw,
        type: 'expenses',
        category: withdrawData.category,
      })
})
</script>

<template>
  <form
    @submit.prevent="
      () => {
        withdrawData.date = dateFormatted({ dateBefore: withdrawData.date })
        operation
        emit('close')
        cleanDataValues()
      }
    "
    class="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-white p-6 text-black"
  >
    <h3 class="font-bold mb-2 text-center">What you bought?😏</h3>
    <div class="flex flex-col gap-3">
      <small class="text-sm">What your purchase is?</small>
      <InputComp type="text" v-model="withdrawData.title" placeholder="How much you spent? 😏" />
      <small class="text-sm">How much you spent? 😏</small>
      <InputComp
        type="text"
        v-model="withdrawData.amountToWithdraw"
        placeholder="How much you spent? 😏"
      />
      <select class="bg-white w-full" v-model="withdrawData.category">
        <option value="food">food</option>
        <option value="clothes">clothes</option>
        <option value="health">health</option>
        <option value="others" default>others</option>
      </select>
      <DatePicker name="date" fluid v-model="withdrawData.date" class="mb-4" />
    </div>
    <div class="flex justify-center" v-if="props.type === 'with'">
      <button type="submit">Withdraw</button>
    </div>
    <div class="mx-auto flex flex-col" v-else>
      <button type="submit">Update</button>
      <button
        type="button"
        @click="
          () => {
            console.log(props.id)
            storeMoney.deleteExpenses({ expensesId: props.id })
          }
        "
      >
        Delete
      </button>
    </div>
  </form>
</template>
