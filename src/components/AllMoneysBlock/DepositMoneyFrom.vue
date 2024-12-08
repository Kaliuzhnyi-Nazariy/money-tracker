<script setup lang="ts">
import { useDepositStore } from '@/stores/depositMoney'
import { computed, reactive } from 'vue'
import InputComp from '../Input/InputComp.vue'
import DatePicker from 'primevue/datepicker'
import { dateFormatted } from '../compossables/dateFormatter'
const storeMoney = useDepositStore()

// const emit = defineEmits(['deposit'])

const props = defineProps({
  type: {
    type: String,
    default: 'dep',
    enum: ['dep', 'upd'],
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

export interface IDepositValue {
  title: string
  amount: string | number
  date: null | string
}

const depositMoneyValue = reactive({
  title: '',
  amount: 0,
  category: 'others',
  date: null,
}) as IDepositValue

const cleanDeposit = () => {
  depositMoneyValue.title = ''
  depositMoneyValue.amount = 0
  // depositMoneyValue.category = 'others'
  depositMoneyValue.date = null
}

if (props.name) {
  depositMoneyValue.title = props.name
  depositMoneyValue.amount = props.money
  // depositMoneyValue.category = props.category
  depositMoneyValue.date = props.date
}

const emit = defineEmits(['closeAfterSubmit'])

// const dateFormatted = () => {
//   const date = new Date(depositMoneyValue.date || new Date())

//   const day = String(date.getDate()).padStart(2, '0')
//   const month = String(date.getMonth() + 1).padStart(2, '0')
//   const year = date.getFullYear()

//   depositMoneyValue.date = `${month}-${day}-${year}`
//   return
// }

export interface IData {
  title: string
  price: string | number
  date: string | Date | undefined
  type: string
}

export interface IUpdDate extends IData {
  earningsId: string
}

const operation = computed(() => {
  return props.type === 'dep'
    ? storeMoney.addDepositMoney({
        title: depositMoneyValue.title,
        price: depositMoneyValue.amount,
        date: depositMoneyValue.date,
        type: 'earnings',
      } as IData)
    : storeMoney.updateEarnings({
        earningsId: props.id,
        title: depositMoneyValue.title,
        price: depositMoneyValue.amount,
        date: depositMoneyValue.date,
        type: 'earnings',
      } as IUpdDate)
})
</script>

<template>
  <form
    @submit.prevent="
      () => {
        depositMoneyValue.date = dateFormatted({ dateBefore: depositMoneyValue.date })
        operation
        emit('closeAfterSubmit')
        cleanDeposit()
      }
    "
    class="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-white p-6 text-black"
  >
    <h3 class="font-bold mb-2 text-center">Deposit money</h3>
    <small class="text-sm">What you bought? 😏</small>
    <InputComp type="text" v-model="depositMoneyValue.title" placeholder="How much you spent? 🤑" />
    <small class="text-sm">How much you spent? 😏</small>
    <InputComp
      type="text"
      v-model="depositMoneyValue.amount"
      placeholder="How much you spent? 🤑"
    />
    <!-- <select class="bg-white w-full" v-model="depositMoneyValue.category">
      <option value="food">food</option>
      <option value="clothes">clothes</option>
      <option value="health">health</option>
      <option value="others" default>others</option>
    </select> -->
    <!-- <DatePicker v-model="date" showIcon fluid iconDisplay="input" dateFormat="MM/dd/yy" /> -->
    <small class="text-sm">Pick the date</small>

    <DatePicker name="date" fluid v-model="depositMoneyValue.date" class="mb-4" />
    <button v-if="props.type === 'dep'" type="submit" class="w-full mx-auto">Deposit</button>
    <div class="md:grid grid-cols-2 h-9" v-else>
      <button
        type="submit"
        class="w-full mx-auto md:border border-opacity-30 hover:border-opacity-70 border-red-700"
      >
        Update
      </button>
      <button
        type="button"
        class="w-full mx-auto md:border border-opacity-30 hover:border-opacity-70 border-red-700"
        @click="storeMoney.deleteEarning({ earningsId: props.id })"
      >
        Delete
      </button>
    </div>
  </form>
</template>
