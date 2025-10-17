<script setup>
import NavBar from '@/components/NavBar.vue'
import HomeNavbar from '@/components/HomeNavbar.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
  <div>
    <HomeNavbar />
    <router-view v-slot="{ Component }">
      <keep-alive include="OpportunitiesView">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
