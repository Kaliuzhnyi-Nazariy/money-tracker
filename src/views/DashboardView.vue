<script setup lang="ts">
import AllMoneyBlock from '@/components/AllMoneysBlock/AllMoneyBlock.vue'
import ButtonsList from '@/components/Buttons/ButtonsList.vue'
import ExpensesBlock from '@/components/ExpensesBlock/ExpensesBlock.vue'
import ListMoney from '@/components/ListMoney/ListMoney.vue'
</script>

<template>
  <div
    class="min-[1440px]:grid min-[1440px]:grid-cols-2 min-[1440px]:grid-rows-[minmax(320px,480px)_1fr] min-[1440px]:gap-10"
  >
    <AllMoneyBlock class="min-[1440px]:col-end-1 min-[1440px]:row-span-1" />
    <ExpensesBlock
      class="min-[1440px]:col-start-1 min-[1440px]:col-end-3 min-[1440px]:row-span-1"
    />
    <ListMoney
      type-of-list="expenses"
      class="min-[1440px]:col-end-1 min-[1440px]:col-end-14 min-[1440px]:row-span-2"
    />
    <ListMoney type-of-list="earnings" />
    <ButtonsList />
  </div>
</template>
