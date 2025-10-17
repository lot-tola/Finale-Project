<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { RouterLink, useRouter } from 'vue-router'
import { token, setToken } from '@/lib/helper.js'
import { jwtDecode } from 'jwt-decode'
import { isAuthenticate } from '@/lib/helper.js'

const email = ref('')
const errorState = ref('')
const password = ref('')
const remember = ref(false)
const router = useRouter()

const handleSubmit = async () => {
  const loginObj = {
    email: email.value,
    password: password.value,
  }
  try {
    const resp = await axios.post('http://54.179.74.122:8080/api/v1/login', loginObj)
    if (resp.data.success) {
      const jwtToken = resp.data.data.token
      setToken(jwtToken)
      router.push({ name: 'home' })
    }
  } catch (err) {
    if (err.status === 401) {
      errorState.value = "Your credentials doesn't match our records."
    }
  }
}
</script>
<template>
  <div class="w-full h-screen grid place-content-center">
    <div class="border-1 p-10 rounded-md block bg-base-100">
      <h1 class="text-center text-2xl font-bold">Login</h1>
      <p class="text-center mt-3">Welcome back!!</p>
      <form @submit.prevent="handleSubmit" class="flex flex-col mt-9 items-center gap-10">
        <label for="email">
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            class="input input-primary"
            required
            placeholder="example@email.com"
          />
        </label>
        <span v-if="errorState" class="input input-error">
          {{ errorState }}
        </span>
        <label for="password">
          <input
            type="text"
            v-model="password"
            id="password"
            name="password"
            class="input input-primary"
            required
            placeholder="........"
          />
        </label>
        <!-- <div class="flex items-center gap-4"> -->
        <!--   <input type="checkbox" v-model="remember" placeholder="rememberme"> -->
        <!--   <label for="rememberme"> -->
        <!--     Remember me -->
        <!--   </label> -->
        <!-- </div> -->
        <div class="flex gap-2 text-sm">
          <p>Don't have an account?</p>
          <RouterLink to="/register" class="underline text-blue-400">Register Here</RouterLink>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>
