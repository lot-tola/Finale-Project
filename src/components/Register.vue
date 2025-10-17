<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const remember = ref(false)
const confirmPassword = ref('')

const handleSubmit = async () => {
  try {
    const registerObj = {
      fullname: username.value,
      email: email.value,
      password: password.value,
    }
    console.log(registerObj)
    const resp = await axios.post('https://eduvision.live/api/v1/register', {
      fullname: username.value,
      email: email.value,
      password: password.value,
    })
  } catch (err) {
    console.log('Erorr registering user: ', err)
  }
}
</script>
<template>
  <div class="w-full h-screen grid place-content-center">
    <div class="border-1 p-10 rounded-md block bg-base-100">
      <h1 class="text-center text-2xl font-bold">Create Account</h1>
      <p class="text-center mt-3">Welcome!!</p>
      <form @submit.prevent="handleSubmit" class="flex flex-col mt-9 items-center gap-10">
        <label for="username">
          <input
            v-model="username"
            type="text"
            id="username"
            name="username"
            class="input input-primary"
            required
            placeholder="John Doe"
          />
        </label>
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
        <label for="password">
          <input
            type="text"
            v-model="password"
            id="password"
            name="password"
            class="input input-primary"
            required
            placeholder="password"
          />
        </label>
        <label for="confirmpassword">
          <input
            type="text"
            v-model="confirmPassword"
            id="confirmpassword"
            name="confirmpassword"
            class="input input-primary"
            required
            placeholder="confirm password"
          />
        </label>
        <span v-if="password != confirmPassword" class="input input-error">
          The password does not match
        </span>
        <div class="flex gap-2 text-sm">
          <p>Already have an account?</p>
          <RouterLink to="/login" class="underline text-blue-400">Login Here</RouterLink>
        </div>
        <button type="submit" class="btn btn-primary">Sign Up</button>
      </form>
    </div>
  </div>
</template>
