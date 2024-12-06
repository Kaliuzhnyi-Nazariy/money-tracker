<script setup lang="ts">
const Props = defineProps({
  name: {
    type: String,
    default: '',
  },
  money: {
    type: Number || String || undefined,
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
</script>

<template>
  <li class="flex w-full justify-between py-1 px-2">
    <div class="flex flex-col">
      <h4 class="text-xl">{{ Props.name }}</h4>
      <p class="opacity-50">{{ Props.category }}</p>
    </div>
    <div class="flex flex-col">
      <p class="ml-auto">{{ Props.money }}$</p>
      <p class="opacity-50">{{ Props.date }}</p>
    </div>
  </li>
</template>
