<script setup lang="ts">
import { computed } from 'vue'
import { useModal } from '../compossables/useModal'
import IModal from '../IForm/IModal.vue'

type PropsType = {
  id: string
  name: string
  money: number
  date: Date | unknown
}

// const Props = defineProps({
//   id: { type: String },
//   name: {
//     type: String,
//     default: '',
//   },
//   money: {
//     type: Number,
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

const Props = defineProps<PropsType>()

const isDate = computed(() => {
  return Props.date ? Props.date.toString() : new Date().toLocaleDateString('fr-CA')
})

const { isModalOpen, openModal, closeModal } = useModal()
</script>

<template>
  <li
    class="flex w-full justify-between py-1 px-2 md:py-2 md:bg-green-500 md:bg-opacity-40 md:w-[90%] md:mx-auto md:rounded-2xl md:h-[72px]"
    @click="
      () => {
        openModal()
      }
    "
    v-bind="$attrs"
  >
    <div class="flex flex-col">
      <h4 class="text-xl md:text-2xl">{{ Props.name }}</h4>
      <!-- <p class="opacity-50">{{ Props.category }}</p> -->
    </div>
    <div class="flex flex-col">
      <p class="ml-auto md:text-xl">{{ Props.money }}$</p>
      <p class="opacity-50">{{ Props.date }}</p>
    </div>
  </li>
  <IModal
    :isOpen="isModalOpen"
    @close="closeModal"
    typeOfModal="depUpd"
    :name
    :money
    :date="isDate"
    :id
  />
</template>
