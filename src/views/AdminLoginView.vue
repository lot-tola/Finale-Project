<script setup>
import { ref } from 'vue'
import axios from 'axios'
const email = ref('')
const password = ref('')
const errorState = ref('')

const handleSubmit = async () => {
  const loginObj = {
    email: email.value,
    password: password.value,
  }
  console.log(loginObj)
  console.log(JSON.stringify(loginObj))
  const resp = await axios.post(
    'https://eduvision.live/api/v1/admin/login',
    JSON.stringify(loginObj),
  )
  console.log('RESPONSE', resp.data)
  // try {
  //   const resp = await axios.post("https://eduvision.live/api/v1/admin/login", JSON.stringify(loginObj))
  //   console.log(resp.data)
  //   if(resp.data.success){
  //     const jwtToken = resp.data.data.token
  //     console.log(resp.data)
  //     const {role} = jwtDecode(jwtToken)
  //     setToken(jwtToken)
  //     setRole(role)
  //     router.push({ name: "home"})
  //   }
  // }catch(err){
  //   if (err.status === 401){
  //     errorState.value = "Your credentials doesn't match our records."
  //   }
  // }
}
</script>
<template>
  <div class="w-full h-screen grid place-content-center">
    <div class="border-1 p-10 rounded-md block bg-base-100">
      <h1 class="text-center text-2xl font-bold">Admin Login</h1>
      <p class="text-center mt-3">Welcome back Admin!!</p>
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
            type="password"
            v-model="password"
            id="password"
            name="password"
            class="input input-primary"
            required
            placeholder="password"
          />
        </label>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>
