<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { isAuthenticate, getUserName, checkExpired, logout, token } from '@/lib/helper.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const authenticated = ref()
const name = ref('')
watch(
  () => router.currentRoute.value,
  (newRoute) => {
    if (newRoute.name == 'home') {
      const username = getUserName()
      name.value = username
      authenticated.value = isAuthenticate()
    }
  },
)

const handleLogout = () => {
  authenticated.value = false
  logout()
}
</script>
<template>
  <nav
    class="flex justify-between lg:justify-center lg:gap-30 items-center p-7 text-3xl flex-nowrap"
  >
    <div class="lg:hidden dropdown flex items-center justify-evenly w-full">
      <div class="btn btn-primary flex flex-col">
        <svg
          tabindex="0"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 relative outline-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
        <ul
          tabindex="-1"
          class="absolute top-[100%] menu menu-sm dropdown-content bg-[#422ad5] rounded-box z-1 w-52 p-2 shadow flex flex-col items-baseline ml-4 justify-evenly min-h-[200px]"
        >
          <li class="">
            <RouterLink class="" to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink class="" to="/about">About</RouterLink>
          </li>
          <li>
            <RouterLink class="" to="/opportunities">Opportunities</RouterLink>
          </li>
          <li>
            <RouterLink class="" to="/contact">Contact</RouterLink>
          </li>
          <li @click.prevent="handleLogout" v-if="authenticated">
            <div>
              <p>Sign Out</p>
              <i class="pi pi-sign-out"></i>
            </div>
          </li>
          <li v-else>
            <router-link to="/login">
              <p>Sign In</p>
              <i class="pi pi-sign-in"></i>
            </router-link>
          </li>
        </ul>
      </div>
      <img class="w-20" src="/logo-nobg.png" alt="logo" />
      <p v-if="authenticated" class="text-xs font-ultra">{{ name }}</p>
    </div>

    <!-- Big Display -->
    <div class="hidden lg:flex items-center justify-evenly w-full">
      <router-link class="flex items-center" to="/">
        <img class="w-[120px] h-[90px]" src="/logo-nobg.png" alt="logo" />
        <p class="text-lg font-corben ml-1">EduVision</p>
      </router-link>

      <ul class="flex gap-5">
        <RouterLink class="button" to="/"><span>Home</span></RouterLink>
        <RouterLink class="button" to="/about"><span>About</span></RouterLink>
        <div class="button group relative z-40">
          <span class="">
            <RouterLink to="/opportunities">Opportunities</RouterLink>
          </span>
          <div
            class="bg-base-400 border-1 border-gray-400/50 py-4 rounded-lg absolute left-1/2 transform -translate-x-1/2 w-70 h-fit p-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300"
          >
            <ul class="flex flex-col items-center gap-5 text-sm">
              <router-link
                class="border-1 w-[90%] p-3 rounded-lg hover:bg-gray-400/50 border-gray-400/50 text-center"
                to="/valid-opportunities"
              >
                Valid Opportunities
              </router-link>
              <router-link
                class="border-1 w-[90%] p-3 rounded-lg hover:bg-gray-400/50 border-gray-400/50 text-center"
                to="/opportunities"
              >
                All Opportunities
              </router-link>
            </ul>
          </div>
        </div>
        <RouterLink class="button" to="/contact"><span>Contact</span></RouterLink>
      </ul>
      <div v-if="authenticated" class="flex gap-4 items-center">
        <p class="text-xl font-ultra">{{ name }}</p>
        <button @click="handleLogout" class="button"><span>Logout</span></button>
      </div>
      <div class="flex gap-3 items-center" v-else>
        <router-link class="button" to="/login"><span>Login</span></router-link>
        <router-link class="button" to="/register"><span>Sign Up</span></router-link>
      </div>
    </div>
  </nav>
</template>
