<script setup lang="ts">
import { useModal } from '../compossables/useModal'
import IModal from '../IForm/IModal.vue'

const { isModalOpen, openModal, closeModal } = useModal()
</script>

<template>
  <div class="flex w-full justify-between px-2 pb-4">
    <h3>Expenses list</h3>
    <button class="mr-2" @click="openModal">+</button>
  </div>
  <IModal :isOpen="isModalOpen" @close="closeModal" typeOfModal="with"></IModal>
</template>
