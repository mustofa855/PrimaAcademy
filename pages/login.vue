<template>
  <div class="min-h-screen w-full bg flex items-center justify-center">
    <div>
      <Card class="flex flex-col gap-4 p-8 px-16">
        <!-- image section -->
        <div class="flex flex-1">
          <img :src="'/logo-prima.svg'" alt="Logo Prima" class="max-w-52 mx-auto" />
        </div>
        <!-- title section -->
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 pb-2">
            Selamat Datang di
            <span class="text-primary">Prima Academy</span>
          </h1>
          <p class="text-justify text-xl text-gray-900">
            Selamat datang di
            <span class="text-primary">Prima Academy</span>. Silahkan login dengan
            akun masing - masing dibawah ini.
          </p>
        </div>
        <!-- form section -->
        <div>
          <form class="flex flex-col gap-4 text-xl" @submit.prevent="login">
            <FormulateInput v-model="username" type="text" label="Username" placeholder="Username" for="username"
              validation="required" error-behavior="live" />
            <FormulateInput v-model="password" type="password" label="Password" placeholder="Password" for="password"
              validation="required" error-behavior="live" />
            <TombolButton type="submit">Login</TombolButton>
          </form>
        </div>
        <template #actions>
          <div class="flex items-center justify-center mt-8 italic text-gray-400">
            &copy; Copyright Prima Academy 2024
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '~/components/Card.vue';
import TombolButton from '~/components/TombolButton.vue';

export default {
  components: { Card, TombolButton },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    login() {
      this.$axios.get('https://6662bec962966e20ef09d5d2.mockapi.io/api/users')
        .then(response => {
          const users = response.data;
          const user = users.find(u => u.username === this.username && u.password === this.password);

          if (user) {
            if (user.user_role === 1) {
              localStorage.setItem('user', JSON.stringify(user));
              this.$router.push('/dashboard');
            } else {
              this.showErrorAlert('Akses ditolak. Hanya pengguna dengan user admin yang bisa login.');
            }
          } else {
            this.showErrorAlert('Username atau password salah.');
          }
        })
        .catch(error => {
          this.showErrorAlert('Terjadi kesalahan saat memproses login.');
        });
    },
    showErrorAlert(message) {
      this.$swal.fire({
        title: 'Login Gagal',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
}
</script>

<style scoped>
.bg {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('./static/loginimage.jpg');
  background-size: cover;
  background-position: center;
}
</style>
