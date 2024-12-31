<script setup lang="ts">
import { useDepositStore } from '@/stores/depositMoney'
import { computed, reactive } from 'vue'
import InputComp from '../Input/InputComp.vue'
import { dateFormatted } from '../compossables/dateFormatter'
import { useMutation } from '../compossables/useMutation'
import { messageStore } from '@/stores/messageStore'
const storeMoney = useDepositStore()
import DatePickerComp from '@/DatePickerComp.vue'

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
  amount: string
  date: null | string
}

const depositMoneyValue = reactive({
  title: '',
  amount: '',
  category: 'others',
  date: null,
}) as IDepositValue

const cleanDeposit = () => {
  depositMoneyValue.title = ''
  depositMoneyValue.amount = ''
  depositMoneyValue.date = null
}

if (props.name) {
  depositMoneyValue.title = props.name
  depositMoneyValue.amount = String(props.money)
  depositMoneyValue.date = props.date
}

const emit = defineEmits(['closeAfterSubmit'])

export interface IData {
  title: string
  price: string | number
  date: string | Date | undefined
  type: string
}

export interface IUpdDate extends IData {
  earningsId: string
}

const store = messageStore()

const { mutation: deposit } = useMutation({
  mutationFn: (depositMoneyValue: IDepositValue) => {
    return storeMoney.addDepositMoney({
      title: depositMoneyValue.title,
      price: depositMoneyValue.amount,
      date: depositMoneyValue.date,
      type: 'earnings',
    } as IData)
  },
  onSuccess: () => {
    store.setSuccess('Earning added!')
  },
  onError: (err) => {
    store.setError(err instanceof Error ? err.message : 'An unexpected error occurred')
  },
})

const { mutation: depositUpd, errorMess: depUpdErr } = useMutation({
  mutationFn: (depositMoneyValue: IDepositValue) => {
    return storeMoney.updateEarnings({
      earningsId: props.id,
      title: depositMoneyValue.title,
      price: depositMoneyValue.amount,
      date: depositMoneyValue.date,
      type: 'earnings',
    } as IUpdDate)
  },
  onSuccess: () => {
    store.setSuccess('Earning updated!')
  },
  onError: () => {
    store.setError(depUpdErr)
  },
})

const operation = computed(() => {
  return props.type === 'dep' ? deposit(depositMoneyValue) : depositUpd(depositMoneyValue)
})

const { mutation: delDep } = useMutation({
  mutationFn: () => {
    store.resMess()
    return storeMoney.deleteEarning({ earningsId: props.id })
  },
  onSuccess: () => {
    store.setSuccess('Earning deleted!')
  },
  onError: () => {
    store.setError(depUpdErr)
  },
})
</script>

<template>
  <form
    @submit.prevent="
      () => {
        depositMoneyValue.date = dateFormatted({ dateBefore: depositMoneyValue.date })
        store.resMess()
        operation
        emit('closeAfterSubmit')
        cleanDeposit()
      }
    "
    class="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-white p-6 text-black"
  >
    <h3 class="font-bold mb-2 text-center">Deposit money</h3>
    <small class="text-sm">What is the sourse? 😏</small>
    <InputComp type="text" v-model="depositMoneyValue.title" placeholder="Hmmmm?" />
    <small class="text-sm">How much you earn? 😏</small>
    <InputComp type="text" v-model="depositMoneyValue.amount" placeholder="amount? 🤑" />

    <small class="text-sm">Pick the date</small>
    <div class="flex justify-center mb-2">
      <DatePickerComp
        :date="props.date"
        @date="
          (formattedData: string) => {
            depositMoneyValue.date = formattedData
          }
        "
      />
    </div>
    <button
      v-if="props.type === 'dep'"
      type="submit"
      class="w-full mx-auto transition-all hover:border-main hover:bg-secondary hover:text-white"
      @click="
        () => {
          store.resMess()
        }
      "
    >
      Deposit
    </button>
    <div class="md:grid grid-cols-2 h-9" v-else>
      <button
        type="submit"
        class="min-[1440px]:py-2 w-full mx-auto transition-all hover:border-main hover:bg-secondary hover:text-white"
      >
        Update
      </button>
      <button
        type="button"
        class="min-[1440px]:py-2 w-full mx-auto transition-all hover:border-main hover:bg-secondary hover:text-white"
        @click="() => delDep()"
      >
        Delete
      </button>
    </div>
  </form>
</template>
