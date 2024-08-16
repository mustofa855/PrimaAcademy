<template>
  <div>
    <!-- Title Bar -->
    <title-bar is-controlbar :title="'Buat Kelas'" :subtitle="'Pada menu ini anda dapat membuat kelas.'" />

    <!-- Tombol Kembali -->
    <tombol-button @click="$router.push('/class')" class="bg-success text-white kembali-button mb-4 hover:bg-success-shade">
      Kembali ke Daftar Kelas
    </tombol-button>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 py-5 mt-8 bg-white w-full shadow-lg rounded-xl">
      <!-- Nama Kelas -->
      <div class="form-group">
        <label for="nama_kelas" class="block font-bold mb-2">Nama Kelas</label>
        <input type="text" id="nama_kelas" name="nama_kelas" placeholder="Pelatihan Teknik Jumping"
          v-model="newClass.nama_kelas" class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
      </div>
      <!-- Deskripsi -->
      <div class="form-group">
        <label for="deskripsi_kelas" class="block font-bold mb-2">Deskripsi Kelas</label>
        <textarea type="text" id="deskripsi_kelas" name="deskripsi_kelas" placeholder="Kelas ini akan menampilkan"
          v-model="newClass.deskripsi_kelas"
          class="w-full p-2 border border-gray-300 rounded mb-4 outline-none"></textarea>
      </div>
      <!-- Level Kelas -->
      <div class="form-group">
        <label for="level_kelas" class="block font-bold mb-2">Level Kelas</label>
        <select id="level_kelas" name="level_kelas" v-model="newClass.level_kelas"
          class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
          <option value="Pemula">Pemula</option>
          <option value="Menengah">Menengah</option>
          <option value="Lanjutan">Lanjutan</option>
          <option value="Ahli">Ahli</option>
        </select>
      </div>
      <!-- Kategori Kelas -->
      <div class="form-group">
        <label for="kategori_kelas" class="block font-bold mb-2">Kategori Kelas</label>
        <select id="kategori_kelas" name="kategori_kelas" v-model="newClass.kategori_kelas"
          class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
          <option value="S.A.Q">S.A.Q</option>
          <option value="Strength">Strength</option>
          <option value="Endurance">Endurance</option>
          <option value="Agility">Agility</option>
          <option value="Speed">Speed</option>
          <option value="Mental">Mental</option>
          <option value="Punching">Punching</option>
          <option value="Blocking">Blocking</option>
          <option value="Control">Control</option>
          <option value="Quickness">Quickness</option>
          <option value="Transition">Transition</option>
          <option value="Dive">Dive</option>
          <option value="Defending">Defending</option>
          <option value="Attacking">Attacking</option>
          <option value="Catching">Catching</option>
          <option value="Ball Mastery">Ball Mastery</option>
          <option value="Passing">Passing</option>
          <option value="Dribbling">Dribbling</option>
          <option value="Shooting">Shooting</option>
          <option value="Prima x BJB">Prima x BJB</option>
        </select>
      </div>
      <!-- Thumbnail Kelas -->
      <div class="form-group">
        <label for="thumbnail_kelas" class="block font-bold mb-2">URL Thumbnail Kelas</label>
        <input type="text" id="thumbnail_kelas" name="thumbnail_kelas" placeholder="www.example.com"
          v-model="newClass.thumbnail_kelas" class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
      </div>
      <!-- Status Kelas -->
      <div class="form-group">
        <label for="status_kelas" class="block font-bold mb-2">Status Kelas</label>
        <select id="status_kelas" name="status_kelas" v-model="newClass.status_kelas"
          class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
          <option value="1">Aktif</option>
          <option value="2">Non Aktif</option>
        </select>
      </div>
      <!-- Premium Kelas -->
      <div class="form-group">
        <label class="block font-bold mb-2">Premium Kelas</label>
        <div class="flex justify-between gap-4">
          <button v-for="premiumOption in premiumOptions" :key="premiumOption.value" type="button"
            @click="setPremium(premiumOption.value)"
            :class="['w-full rounded-full px-4 py-2 text-sm font-semibold text-black transition duration-150 ease-in-out', { 'bg-red-700 text-white': newClass.isPremium === premiumOption.value, 'bg-gray-300': newClass.isPremium !== premiumOption.value }]">
            {{ premiumOption.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Tombol Simpan dan Batal -->
    <div class="flex justify-end mt-4 px-5 md:px-0">
      <button type="submit" @click="confirmCreate"
        class="rounded-md bg-teal-600 px-7 py-3 text-md mr-1 font-semibold text-white shadow-sm hover:bg-teal-700 transition duration-150 ease-out hover:ease-in">Simpan</button>
      <button type="button" @click="cancelCreate"
        class="rounded-md bg-red-600 px-7 py-3 text-md ml-1 font-semibold text-white shadow-sm hover:bg-red-700 transition duration-150 ease-out hover:ease-in">Batal</button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import TitleBar from '~/components/TitleBar.vue'
import ControlBar from '~/components/ControlBar.vue'

export default {
  components: { TitleBar, ControlBar },
  layout: 'admin',
  data() {
    return {
      newClass: {
        nama_kelas: '',
        deskripsi_kelas: '',
        status_kelas: 1,
        level_kelas: 'Pemula', // default to 'Pemula'
        isPremium: 1, // default to 'Gratis'
        jumlahPemain: 0, // default to 0
        rating_kelas: 0, // default to 0
        kategori_kelas: 'S.A.Q', // default to 'S.A.Q'
        thumbnail_kelas: '',
        videos: [], // default empty array for videos
      },
      premiumOptions: [
        { label: 'Gratis', value: 2 },
        { label: 'Premium', value: 1 },
      ],
    };
  },
  methods: {
    async confirmCreate() {
      const { value } = await Swal.fire({
        title: 'Yakin akan membuat kelas?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
      });

      if (value) {
        try {
          const response = await fetch('https://667994bf18a459f6395091e1.mockapi.io/api/class', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.newClass),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log('Class created:', responseData); // Log respons API
            await Swal.fire('Sukses!', 'Kelas berhasil dibuat.', 'success');
            this.$router.push('/class');
            this.$nextTick(this.fetchClasses);
          } else {
            await Swal.fire('Gagal!', 'Terjadi kesalahan saat membuat kelas.', 'error');
          }
        } catch (error) {
          console.error('Error creating class:', error);
          await Swal.fire('Gagal!', 'Terjadi kesalahan saat membuat kelas.', 'error');
        }
      }
    },

    cancelCreate() {
      this.$router.push('/class');
    },
    setPremium(value) {
      this.newClass.isPremium = value;
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>
