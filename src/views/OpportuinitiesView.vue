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
  <div class="w-full flex gap-10 flex-col items-center justify-start">
    <div class="card block card-side bg-base-100 shadow-sm w-[50%] flex">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Movie" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">New movie is released!</h2>
        <p>Click the button to watch on Jetflix app.</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Watch</button>
        </div>
      </div>
    </div>
    <div class="card block card-side bg-base-100 shadow-sm w-[50%] flex">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Movie" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">New movie is released!</h2>
        <p>Click the button to watch on Jetflix app.</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Watch</button>
        </div>
      </div>
    </div>
    <div class="card block card-side bg-base-100 shadow-sm w-[50%] flex">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Movie" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">New movie is released!</h2>
        <p>Click the button to watch on Jetflix app.</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Watch</button>
        </div>
      </div>
    </div>
  </div>

</template>
