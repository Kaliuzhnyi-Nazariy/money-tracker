<script setup lang="ts">
import { computed, Teleport } from 'vue'
import DepositMoneyFrom from '../AllMoneysBlock/DepositMoneyFrom.vue'
import MoneyGoForm from '../AllMoneysBlock/MoneyGoForm.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  typeOfModal: {
    type: String,
    default: 'dep',
    enum: ['dep', 'depUpd', 'with', 'withUpd'],
  },
  id: {
    type: String || undefined,
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

const isModalOpen = computed(() => {
  return props.isOpen ? 'fixed' : 'hidden'
})

const emit = defineEmits(['close'])
</script>

<template>
  <component :is="Teleport" to="body">
    <div
      :class="isModalOpen"
      class="w-full h-full top-0 left-0 -translate-y-50% bg-black bg-opacity-50"
      @click.self="emit('close')"
    >
      <DepositMoneyFrom v-if="props.typeOfModal === 'dep'" @closeAfterSubmit="emit('close')" />
      <MoneyGoForm v-else-if="props.typeOfModal === 'with'" @closeAfterSubmit="emit('close')" />
      <DepositMoneyFrom
        v-if="props.typeOfModal === 'depUpd'"
        @closeAfterSubmit="emit('close')"
        :id
        :name
        :money
        :date
        :category
        type="upd"
      />
      <MoneyGoForm
        v-if="props.typeOfModal === 'withUpd'"
        @closeAfterSubmit="emit('close')"
        :id
        :name
        :money
        :date
        :category
        type="upd"
      />
    </div>
  </component>
</template>
