<script setup lang="ts">
import { useExpensesMoney } from '@/stores/expensesMoney'
import { computed, reactive } from 'vue'
import InputComp from '../Input/InputComp.vue'
import { dateFormatted } from '../compossables/dateFormatter'
import { useMutation } from '../compossables/useMutation'
import { messageStore } from '@/stores/messageStore'
import DatePickerComp from '@/DatePickerComp.vue'

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

const emit = defineEmits(['closeAfterSubmit'])

export interface IWithdrawData {
  date: Date | Date[] | (Date | null)[] | null | undefined | string
  amountToWithdraw: string
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
  withdrawData.amountToWithdraw = String(props.money)
  withdrawData.category = props.category
  withdrawData.date = props.date
}

const store = messageStore()

const {
  mutation: withdraw,
  // isLoading: depLoadinfg,
  errorMess: withdrawErr,
} = useMutation({
  mutationFn: (withdrawData: IWithdrawData) => {
    return storeMoney.addExpenses({
      title: withdrawData.title,
      date: withdrawData.date,
      price: withdrawData.amountToWithdraw,
      type: 'expenses',
      category: withdrawData.category,
    })
  },
  onSuccess: () => {
    store.setSuccess('Withdraw added!')
  },
  onError: () => {
    store.setError(withdrawErr)
  },
})

const {
  mutation: updWithdraw,
  // isLoading: depLoadinfg,
  errorMess: updWithdrawErr,
} = useMutation({
  mutationFn: (withdrawData: IWithdrawData) => {
    return storeMoney.updateExpenses({
      expensesId: props.id,
      title: withdrawData.title,
      date: withdrawData.date,
      price: withdrawData.amountToWithdraw,
      type: 'expenses',
      category: withdrawData.category,
    })
  },
  onSuccess: () => {
    store.setSuccess('Withdraw updated!')
  },
  onError: () => {
    store.setError(updWithdrawErr)
  },
})

const operation = computed(() => {
  return props.type === 'with' ? withdraw : updWithdraw
})

const {
  mutation: delExp,
  // isLoading: depLoadinfg,
  errorMess: delExpErr,
} = useMutation({
  mutationFn: () => {
    return storeMoney.deleteExpenses({ expensesId: props.id })
  },
  onSuccess: () => {
    store.setSuccess('Withdraw deleted!')
  },
  onError: () => {
    store.setError(delExpErr)
  },
})
</script>

<template>
  <form
    @submit.prevent="
      () => {
        store.resMess()
        withdrawData.date = dateFormatted({ dateBefore: String(withdrawData.date) })
        operation(withdrawData)
        emit('closeAfterSubmit')
        cleanDataValues()
      }
    "
    class="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-white p-6 text-black w-[60%]"
  >
    <h3 class="font-bold mb-2 text-center">What have you bought?😏</h3>
    <div class="flex flex-col gap-3">
      <small class="text-sm">What your purchase is?</small>
      <InputComp
        type="text"
        v-model="withdrawData.title"
        placeholder="What interesting was bought? 😏"
      />
      <small class="text-sm">How much you spent? 😏</small>
      <InputComp
        type="text"
        v-model="withdrawData.amountToWithdraw"
        placeholder="How much you spent? 😏"
      />
      <select class="bg-white w-full" v-model="withdrawData.category">
        <option value="food">food</option>
        <option value="health">health</option>
        <option value="needs">needs</option>
        <option value="others" default>others</option>
      </select>
      <small>Date of the purchase</small>
      <!-- <DatePicker
        name="date"
        fluid
        v-model="withdrawData.date"
        class="mb-4"
        placeholder="pick date"
      /> -->
      <div class="flex justify-center mb-2">
        <DatePickerComp
          :date="props.date"
          @date="
            (formattedData: string) => {
              withdrawData.date = formattedData
            }
          "
        />
      </div>
    </div>
    <div class="flex justify-center" v-if="props.type === 'with'">
      <button type="submit">Withdraw</button>
    </div>
    <div class="mx-auto flex flex-col min-[1440px]:flex-row min-[1440px]:justify-around" v-else>
      <button
        type="submit"
        class="py-2 w-full transition-all hover:border-main hover:bg-secondary hover:text-white"
      >
        Update
      </button>
      <button
        type="button"
        @click="
          () => {
            delExp()
          }
        "
        class="py-2 w-full transition-all hover:border-main hover:bg-secondary hover:text-white"
      >
        Delete
      </button>
    </div>
  </form>
</template>
