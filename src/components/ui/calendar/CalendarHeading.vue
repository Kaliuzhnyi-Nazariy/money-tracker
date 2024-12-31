<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { CalendarHeading, type CalendarHeadingProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<CalendarHeadingProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<!-- <template>
  <CalendarHeading
    v-slot="{ headingValue }: { headingValue: unknown }"
    :class="cn('text-sm font-medium', props.class)"
    v-bind="forwardedProps"
  >
    <slot :heading-value>
      {{ headingValue }}
    </slot>
  </CalendarHeading>
</template> -->

<template>
  <CalendarHeading :class="cn('text-sm font-medium', props.class)" v-bind="forwardedProps">
    <slot> </slot>
  </CalendarHeading>
</template>
