<template>
    <div class="h-screen font-montserrat">
      <div class="container mx-auto px-4 2xl:px-32 absolute inset-0 flex flex-col items-center justify-center">
        <div class="p-8 rounded-2xl w-full md:w-1/2 xl:w-1/3 mt-4 text-center">
          <h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">Oopss...</h1>
          <p class="text-xl mb-8"><span class="font-semibold">404</span> Page Not Found</p>
          <p>Kembali ke <nuxt-link to="/" class="text-dark-blue font-medium hover:underline">Prima Academy</nuxt-link></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    layout: 'notfound'
  }
  </script>