<script setup lang="ts">
import { useModal } from '../compossables/useModal'
import IModal from '../IForm/IModal.vue'

const Props = defineProps({
  id: { type: String },
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

const { isModalOpen, openModal, closeModal } = useModal()
</script>

<template>
  <li
    class="flex w-full justify-between py-1 px-2"
    @click="
      () => {
        openModal()
      }
    "
  >
    <div class="flex flex-col">
      <h4 class="text-xl">{{ Props.name }}</h4>
      <!-- <p class="opacity-50">{{ Props.category }}</p> -->
    </div>
    <div class="flex flex-col">
      <p class="ml-auto">{{ Props.money }}$</p>
      <p class="opacity-50">{{ Props.date }}</p>
    </div>
  </li>
  <IModal
    :isOpen="isModalOpen"
    @close="closeModal"
    typeOfModal="depUpd"
    :name
    :money
    :date
    :category
    :id
  />
</template>
