<script setup>
import { ref } from 'vue'

import { isAuthenticate, getUserName, checkExpired, logout } from '@/lib/helper.js'

const authenticated = ref(isAuthenticate())
const username = getUserName()

const handleLogout = () => {
  authenticated.value = false
  logout()
}
</script>
<template>
  <nav class="flex justify-center gap-20 items-center pt-6">
    <img class="w-20" src="/logo-nobg.png" alt="logo" />
    <ul class="flex gap-6">
      <RouterLink class="btn rounded-lg" to="/">Home</RouterLink>
      <RouterLink class="btn rounded-lg" to="/about">About</RouterLink>
      <RouterLink class="btn rounded-lg" to="/opportunities">Opportunities</RouterLink>
      <RouterLink class="btn rounded-lg" to="/contact">Contact</RouterLink>
    </ul>
    <div v-if="authenticated" class="flex gap-4 items-center">
      <p>{{ username }}</p>
      <button @click="handleLogout" class="btn btn-primary">Logout</button>
    </div>
    <div class="flex gap-3 items-center" v-else>
      <RouterLink class="btn btn-primary" to="/login">Login</RouterLink>
    </div>
  </nav>
</template>
