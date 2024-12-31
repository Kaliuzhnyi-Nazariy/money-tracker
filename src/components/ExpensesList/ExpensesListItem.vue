<script setup lang="ts">
import { computed } from 'vue'
import { useModal } from '../compossables/useModal'
import IModal from '../IForm/IModal.vue'

interface ExpensesListItemProps {
  id: string | unknown
  name: string
  money: number
  date: string | unknown
  category: string
}

const Props = defineProps<ExpensesListItemProps>()

const isDate = computed(() => {
  return Props.date ? Props.date.toString() : new Date().toLocaleDateString('fr-CA')
})

const id = Props.id as string | undefined

// const Props = defineProps({
//   id: String,
//   name: {
//     type: String,
//     default: '',
//   },
//   money: {
//     type: Number || String || undefined,
//     default: 0,
//   },
//   date: {
//     type: String,
//     default: new Date().toLocaleDateString('fr-CA'),
//   },
//   category: {
//     type: String,
//     default: 'others',
//   },
// })

const { openModal, closeModal, isModalOpen } = useModal()
</script>

<template>
  <li
    class="flex w-full justify-between py-1 px-2 md:py-2 md:bg-red-500 md:bg-opacity-40 md:w-[90%] md:mx-auto md:rounded-2xl"
    @click="
      () => {
        openModal()
      }
    "
    v-bind="$attrs"
  >
    <div class="flex flex-col">
      <h4 class="text-xl md:text-2xl">{{ Props.name }}</h4>
      <p class="opacity-50">{{ Props.category }}</p>
    </div>
    <div class="flex flex-col">
      <p class="ml-auto md:text-xl">{{ Props.money }}$</p>
      <p class="opacity-50">{{ Props.date }}</p>
    </div>
  </li>
  <IModal
    :isOpen="isModalOpen"
    @close="closeModal"
    typeOfModal="withUpd"
    :name
    :money
    :date="isDate"
    :category
    :id
  />
</template>
