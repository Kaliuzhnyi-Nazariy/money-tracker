<script setup lang="ts">
import ButtonItem from './ButtonItem.vue'
</script>

<template>
  <ul class="flex flex-col gap-3 mt-3 w-[256px]">
    <li>
      <ButtonItem type="a" redirect-to="mailto:kaliuzhnyinazarii@gmail.com">Contact us</ButtonItem>
    </li>
    <li><ButtonItem @click="console.log('reset')">Reset info</ButtonItem></li>
    <li><ButtonItem @click="console.log('Log out')">Log out</ButtonItem></li>
  </ul>
</template>
