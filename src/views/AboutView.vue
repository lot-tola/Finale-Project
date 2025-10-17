<template>
  <div class="w-screen max-w-full h-fit">
    <h1
      class="text-xl md:text-7xl text-center font-corben font-extrabold tracking-wider text-yellow-400 mb-9 mt-[200px]"
    >
      BEHIND THE SCENES
    </h1>
    <p class="text-center mx-3 md:mx-9">
      <span>
        <svg
          class="inline mb-5 md:mb-9 md:w-7 fill-white w-3"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"
            />
          </g>
        </svg>
      </span>
      <span class="text md:text-3xl italic">
        We started this journey to make sure every young Cambodian has the chance to reach their
        full potential
      </span>
      <span>
        <svg
          class="inline mb-5 md:mb-9 md:w-7 fill-white w-3"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M19.417 6.679C20.447 7.773 21 9 21 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311-1.804-.167-3.226-1.648-3.226-3.489a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.099.49 2.748 1.179zm-10 0C10.447 7.773 11 9 11 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311C4.591 12.322 3.17 10.841 3.17 9a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.099.49 2.748 1.179z"
            />
          </g>
        </svg>
      </span>
    </p>
    <div class="w-full flex justify-center mt-14">
      <a href="mailto:lottolaaa@gmail.com" class="btn btn-primary mx-auto text-sm md:text-xl"
        >CONTACT US</a
      >
    </div>
    <div
      class="flex flex-col items-center my-10 mx-5 justify-evenly h-[600px] border-1 border-white/50 rounded-lg md:hidden"
    >
      <div class="flex flex-col items-center w-[90%]">
        <img src="/logo.png" alt="" class="w-30" />
        <div class="">
          <h2 class="text-center font-corben font-bold mt-3">LOT TOLA</h2>
          <p class="text-xs italic opacity-50 mt-3">FRONTEND DEV</p>
          <p class="mt-3">
            Makes sure every pixel behaves and every button obeys. Sometimes argues with CSS,
            sometimes wins, sometimes cries a little.
          </p>
        </div>
      </div>
      <div class="flex flex-col items-center w-[90%]">
        <img src="/logo.png" alt="" class="w-30" />
        <div class="">
          <h2 class="text-center font-corben font-bold mt-3">KHEAV KIENGHOK</h2>
          <p class="text-xs italic opacity-50 mt-3">BACKEND DEV</p>
          <p class="mt-3">
            Keeps the servers alive and the data flowing. Talks to databases like they’re
            pets—sometimes they bite. Powered by VibeCoding.
          </p>
        </div>
      </div>
    </div>
    <div class="border-2 m-19 h-[1200px] hidden md:grid grid-cols-2 grid-rows-2 mb-10 rounded-lg">
      <img src="/logo.png" alt="" class="col-start-1 w-full h-full" />
      <div class="col-start-2 flex flex-col items-baseline justify-center w-[80%] mx-10 gap-5">
        <h2 class="font-corben text-5xl font-extrabold tracking-widest">LOT TOLA</h2>
        <p class="italic opacity-50">FRONTEND DEV</p>
        <p class="italic text-xl font-light">
          Makes sure every pixel behaves and every button obeys. Sometimes argues with CSS,
          sometimes wins, sometimes cries a little.
        </p>
      </div>
      <div
        class="col-start-1 row-start-2 flex flex-col items-baseline justify-center w-[80%] mx-10 gap-5"
      >
        <h2 class="font-corben md:text-5xl text-sm font-extrabold tracking-widest">
          KHEAV KIENGHOK
        </h2>
        <p class="italic opacity-50">BACKEND DEV</p>
        <p class="italic text-xl font-light">
          Keeps the servers alive and the data flowing. Talks to databases like they’re
          pets—sometimes they bite. Powered by VibeCoding.
        </p>
      </div>
      <img src="/logo.png" alt="" class="col-start-2 w-full h-full row-start-2" />
    </div>
  </div>
</template>
