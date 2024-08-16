<template>
  <nav
    class="h-screen w-64 overflow-hidden bg-white rounded-tr-md rounded-br-md shadow-card z-10 fixed top-0 group transition-all duration-200 ease-out shadow-lg">
    <!-- image title -->
    <div class="flex flex-col px-5 py-2"></div>

    <!-- menu -->
    <div class="flex flex-col px-4 py-2 text-gray-400 font-medium">
      <!-- logo  -->
      <div class="flex flex-1 items-center mb-4">
        <img :src="'/logo-prima.svg'" alt="Prima Academy" class="m-auto" />
      </div>
      <!-- link -->
      <router-link v-for="(item, index) in slug" :key="index" :to="item.to"
        class="flex flex-row items-center hover:text-primary transition duration-200 ease-out my-4 hover:border-primary after:absolute after:-right-4 after:h-10 after:w-6 after:rounded-md hover:after:bg-primary hover:after:transition-all after:duration-200 after:ease-out"
        :class="isActive == item.to ? 'text-primary after:bg-primary' : ''">
        <div class="max-w-xs flex mr-8 ml-4" v-html="item.icon"></div>
        <div :to="item.to" class="py-2 text-base transition-all ease-out duration-200 flex group"
          :class="$route.path == item.to ? 'after:bg-primary' : ''">
          {{ item.text }}
        </div>
      </router-link>
    </div>

    <!-- footer -->
    <div class="flex flex-col px-4 py-2 gap-4 text-gray-400 font-medium bottom-0 absolute w-full">
      <!-- account management -->
      <div class="flex flex-col gap-4 items-center relative group">
        <div class="w-full cursor-pointer" @click="toggleOpen">
          <div class="flex gap-4">
            <!-- avatar -->
            <div class="w-12 rounded-full">
              <img :src="'/default.png'" alt="profile" class="m-auto" />
            </div>
          </div>
        </div>

        <!-- setting section -->
        <transition enter-from-class="transform opacity-0" enter-active-class="duration-200 ease-in"
          enter-to-class="opacity-100" leave-from-class="opacity-100" leave-active-class="duration-200 ease-out"
          leave-to-class="transform opacity-0">
          <div v-if="isOpen" @mouseleave =" isOpen = false"class="absolute -top-20 rounded-md shadow-dark shadow-md w-full p-2 bg-white">
            <ul class="flex flex-col gap-2">
              <li class="cursor-pointer" @click="modalLogout">Logout</li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      slug: [
        {
          to: '/dashboard',
          text: 'Dashboard',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21 16H3V4h18m0-2H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg>',
        },
        {
          to: '/users',
          text: 'Pengguna',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M14.754 10c.966 0 1.75.784 1.75 1.75V15H16.5v1h-9v-3h.002v-1.25c0-.966.783-1.75 1.75-1.75h5.502ZM22 11.75A1.75 1.75 0 0 0 20.25 10h-3.375c.393.475.629 1.085.629 1.75V13H17.5v3h3.75a.75.75 0 0 0 .75-.75v-3.5ZM6.5 15h.002v-3.25l.009-.22a2.72 2.72 0 0 1 .62-1.53H3.75l-.144.006A1.75 1.75 0 0 0 2 11.75v3.5c0 .414.336.75.75.75H6.5v-1ZM12 3a3 3 0 1 1 0 6a3 3 0 0 1 0-6Zm6.5 1a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5Zm-13 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5ZM2 17.75a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 .75.75v.5A3.75 3.75 0 0 1 18.25 22H5.75A3.75 3.75 0 0 1 2 18.25v-.5Z"/></svg>',
        },
        {
          to: '/class',
          text: 'Kelas',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>',
        },
        {
          to: '/verification',
          text: 'Verifikasi',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',
        },
      ],
      isOpen: false,
    }
  },
  computed: {
    isActive() {
      const split = this.$route.path.split('/')
      return '/' + split[1]
    },
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    modalLogout() {
      this.$swal({
        title: 'Keluar dari aplikasi',
        text: 'Apakah anda yakin ingin keluar dari aplikasi ini?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
        reverseButtons: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        focusCancel: true,
        preConfirm: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });
        },
      }).then((result) => {
        if (result.value) {
          localStorage.removeItem('user');
          this.$router.push('/login');
        }
      });
    },
  },
}
</script>

<style scoped>
.garis::after {
  content: '';
  position: absolute;
  right: -24px;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  transition: all;
  background-color: blue;
  animation-duration: 1s;
  animation-timing-function: ease-out;
}
</style>
