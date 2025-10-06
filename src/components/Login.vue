<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import {RouterLink} from 'vue-router'

const email = ref('')
const password = ref('')
const remember = ref(false)

const handleSubmit = () => {
  console.log(email.value)
  console.log(password.value)
  console.log(remember.value)
}


</script>
<template>
    <nav class="flex justify-center gap-20 items-center pt-6">
        <img class="w-15 " src="/logo-nobg.png" alt="">
        <ul class="flex gap-6">
            <RouterLink class="btn rounded-lg" to="/">Home</RouterLink>
            <RouterLink class="btn rounded-lg" to="/about">About</RouterLink>
            <RouterLink class="btn rounded-lg" to="/opportunities">Opportunities</RouterLink>
            <RouterLink class="btn rounded-lg" to="/contact">Contact</RouterLink>
        </ul>
    </nav>
  <div class="w-full h-screen grid place-content-center ">
    <div class="border-1 p-10 rounded-md block">
      <h1 class="text-center text-2xl font-bold">Login</h1>
      <p class="text-center mt-3">Welcome back!!</p>
      <form @submit.prevent="handleSubmit" class="flex flex-col mt-9  items-center
        gap-10">
        <label for="email">
          <input v-model="email" type="email" id="email" name="email" class="input input-primary" required placeholder="example@email.com">
        </label>
        <label for="password">
          <input type="text" v-model="password" id="password" name="password" class="input input-primary" required placeholder="........">
        </label>
        <div class="flex items-center gap-4">
          <input type="checkbox" v-model="remember" placeholder="rememberme">
          <label for="rememberme">
            Remember me
          </label>
        </div>
        <div class="flex gap-2 text-sm">
          <p>Don't have an account?</p>
          <RouterLink to="/register" class="underline text-blue-400">Register Here</RouterLink>

        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>
