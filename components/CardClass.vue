<template>
  <div
    class="relative bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row w-full hover:cursor-pointer hover:bg-gray-200 transition duration-300"
    @mouseenter="onHover"
    @mouseleave="onLeave"
    @click="toDetail"
  >
    <div class="flex-shrink-0">
      <img :src="kelas.thumbnail_kelas || 'https://via.placeholder.com/150'" :alt="kelas.nama_kelas" class="w-full sm:w-48 h-32 object-cover rounded-md">
    </div>
    <div class="flex-grow sm:ml-4 mt-2 sm:mt-0">
      <div class="flex justify-between">
        <h3 class="text-xl font-semibold">{{ kelas.nama_kelas }}</h3>
        <div class="relative">
          <button @click.stop="toggleMenu" class="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V6.01M12 12V12.01M12 18V18.01" />
            </svg>
          </button>
          <div v-if="menuOpen" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
            <div class="flex flex-col items-start">
              <button @click.stop="$emit('updateClass', kelas)" class="w-full text-left px-4 py-2 hover:bg-gray-100">
                Edit Kelas
              </button>
              <button @click.stop="$emit('deleteClass', kelas)" class="w-full text-left px-4 py-2 hover:bg-gray-100">
                Hapus Kelas
              </button>
            </div>
          </div>
        </div>
      </div>
      <p class="text-gray-600">{{ kelas.deskripsi_kelas }}</p>
      <p class="mt-2 text-base text-gray-500">Level: {{ kelas.level_kelas }}</p>
      <p class="text-base text-gray-500">Kategori: {{ kelas.kategori_kelas }}</p>

      <div class="flex mt-4 space-x-4">
        <div v-if="kelas.isPremium === 2" class="text-base font-semibold px-2 py-1 bg-emerald-600 text-white rounded-md">
          Gratis
        </div>
        <div v-if="kelas.isPremium === 1" class="text-base font-semibold px-2 py-1 bg-red-700 text-white rounded-md">
          Premium
        </div>
        <div v-if="kelas.jumlahPemain > 0" class="text-base font-semibold px-2 py-1 bg-green-900 text-white rounded-md">
          {{ kelas.jumlahPemain }} pemain
        </div>
        <div v-if="kelas.videos.length > 0" class="text-base font-semibold px-2 py-1 bg-blue-800 text-white rounded-md">
          {{ kelas.videos.length }} video
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardClass',
  props: {
    kelas: {
      type: Object,
      default: () => ({
        id: '',
        nama_kelas: 'Nama Kelas',
        deskripsi_kelas: 'Deskripsi kelas.',
        level_kelas: 'Level',
        isPremium: false,
        jumlahPemain: 0,
        kategori_kelas: 'Kategori',
        thumbnail: '',
        videos: [],
      }),
    },
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    onHover() {
      this.$emit('hover', this.kelas.id);
    },
    onLeave() {
      this.$emit('leave');
    },
    toDetail() {
      this.$router.push(`/class/detail/${this.kelas.id}`);
    },
  },
};
</script>

<style scoped>
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
</style>
