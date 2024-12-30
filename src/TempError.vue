<script setup lang="ts">
import { ref, watch } from 'vue'

const tempError = ref(false)

interface Props {
  type?: 'Success' | 'Error' // Optional, defaults to 'Error'
  message: string | null // Can be string or null
}

// Use the TypeScript type in defineProps
const props = defineProps<Props>()

// const Props = defineProps({
//   type: {
//     type: String,
//     default: 'Error', // Provide a default value
//     validator: (value: string) => ['Success', 'Error'].includes(value),
//   },
//   message: {
//     type: [String, null, undefined],
//     required: true,
//   },
// })

watch(
  () => props.message,
  (newMessage) => {
    if (newMessage) {
      tempError.value = true
      setTimeout(() => {
        tempError.value = false
      }, 5000)
    }
  },
)
</script>

<template>
  <div
    class="fixed top-2 right-2 p-4 rounded text-white"
    :class="{
      'bg-red-500': props.type === 'Error',
      'bg-green-500': props.type === 'Success',
    }"
    v-if="tempError"
  >
    {{ props.message }}
  </div>
</template>
