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
// const value = ref<DateValue | undefined>(
//   props.date ? parseDate(convertToISO(props.date)) : undefined,
// )

const value = ref<DateValue>()
watch(
  () => value.value,
  () => {
    if (value.value) {
      emit('date', dateFormatted({ dateBefore: String(value.value) }))
    } else {
      emit('date', props.date)
    }
  },
)

// Watch for changes to the initialDate prop and update value
watch(
  () => props.date,
  (newDate) => {
    value.value = newDate ? parseDate(newDate) : undefined
  },
)
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
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : `${dateVal}` }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template>

<!-- <script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utils'
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const value = ref<DateValue>()

const props = defineProps<{
  date?: string // Accept an optional date string as a prop
}>()
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
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : `${props.date}` }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template> -->
