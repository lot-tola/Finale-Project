<script setup>
import { useDataStore } from '@/stores/dataStore.js'
const { fullInfoData } = useDataStore()
console.log(fullInfoData)
</script>

<template>
  <div class="w-[50%] h-[80vh] p-4 m-2 border-1 rounded-lg mx-auto mt-10">
    <h1 class="font-bold text-2xl text-center">{{ fullInfoData.title }}</h1>
  </div>
</template>
