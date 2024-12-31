<script setup lang="ts">
import { useModal } from '../compossables/useModal'
import IModal from '../IForm/IModal.vue'

const { isModalOpen, openModal, closeModal } = useModal()
</script>

<template>
  <div class="flex w-full justify-between px-2 pb-4 md:px-4 md:pt-3 md:pb-5">
    <h3 class="md:text-xl">Expenses list</h3>
    <button class="mr-2 md:text-xl" @click="openModal">+</button>
  </div>
  <IModal :isOpen="isModalOpen" @close="closeModal" typeOfModal="with"></IModal>
</template>
