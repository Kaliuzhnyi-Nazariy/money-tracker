<script setup lang="ts">
const props = defineProps({
  modelValue: String || Number,
  label: String,
  type: {
    type: String,
    default: 'text',
  },
})

defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col w-full">
    <span>{{ props.label }}</span>
    <input
      :type="props.type"
      v-bind="$attrs"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement)!.value)"
      class="bg-white w-full px-2 py-1 text-black"
    />
  </div>
</template>
