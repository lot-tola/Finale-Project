<template>
  <nav class=" flex justify-center gap-20 items-center pt-6">
      <img class="w-15 " src="/logo-nobg.png" alt="">
      <ul class="flex gap-6">
          <RouterLink class="btn rounded-lg" to="/">Home</RouterLink>
          <RouterLink class="btn rounded-lg" to="/about">About</RouterLink>
          <RouterLink class="btn rounded-lg" to="/opportunities">Opportunities</RouterLink>
          <RouterLink class="btn rounded-lg" to="/contact">Contact</RouterLink>
      </ul>
      <div class="flex gap-3 items-center">
          <a class="btn btn-primary" href="/login">Login</a>
      </div>
  </nav>
  <div >
    <h1>This is an about page</h1>
  </div>
</template>

