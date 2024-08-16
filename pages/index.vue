<template>
  <div class="grid grid-cols-6 h-screen <sm:grid-cols-1">
    <div class="col-span-4 flex flex-1 bg">
    </div>

    <!-- form section -->
    <div class="col-span-2 p-4 px-14 flex flex-col">
      <!-- bagian form dan logo -->
      <div class="my-auto">
        <!-- logo section -->
        <div class="flex flex-1 mb-8">
          <img :src="'/logo-prima.svg'" alt="Kunci Transformasi Digital" class="max-w-52 mx-auto" />
        </div>

        <!-- title section -->
        <div class="mb-8">
          <h1 class="welcome text-4xl font-bold text-gray-900 pb-2">
            Selamat Datang di Prima Academy
          </h1>
          <p class="text-lg">
            Selamat datang di Web Admin Prima Academy. Apabila anda seorang admin silakan login dengan akun masing-
            masing dibawah!
          </p>
        </div>

        <div class="flex flex-col">
          <button type="submit"
            class="bg-primary px-6 !block text-white p-4 rounded-lg hover:bg-primary-shade transition duration-300 ease-out" @click="toPage('/login')">
            Masuk
          </button>
        </div>
      </div>
      <div class="text-center">Copyright Prima Academy 2024</div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      // env: process.env.baseUrl,
      // loginData: {
      //   username: null,
      //   password: null,
      // },
    }
  },

  methods: {
    toPage(route) {
      
      this.$router.push(route)
    },
  }
}
</script>

<style scoped>
.bg {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('./static/loginimage.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
