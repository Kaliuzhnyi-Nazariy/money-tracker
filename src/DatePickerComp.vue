<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utils'
import { DateFormatter, type DateValue, getLocalTimeZone, parseDate } from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { dateFormatted } from './components/compossables/dateFormatter'
import { convertToISO } from './components/compossables/convertToISodate'

// Define props
const props = defineProps<{
  date?: string // Accept an optional date string as a prop
}>()

const emit = defineEmits(['date'])

const dateVal = ref(parseDate(convertToISO(String(props.date))))

// Date formatter
const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

// Initialize value from props if provided
const value = ref<DateValue | undefined>(
  props.date ? parseDate(convertToISO(props.date)) : undefined,
)
watch(
  () => value.value,
  () => {
    emit('date', dateFormatted({ dateBefore: String(value.value) }))
  },
)

// Watch for changes to the initialDate prop and update value
watch(
  () => props.date,
  (newDate) => {
    value.value = newDate ? parseDate(newDate) : undefined
  },
)

console.log('props.date: ', parseDate(convertToISO(String(props.date))))
// console.log(value)

// console.log('props.date: ', parseDate(props.date))
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date' }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="dateVal" initial-focus />
    </PopoverContent>
  </Popover>
</template>
