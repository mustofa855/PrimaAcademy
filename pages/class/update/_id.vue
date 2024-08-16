<template>
  <div>
    <!-- Title Bar -->
    <title-bar :title="'Edit Kelas'" :subtitle="'Pada menu ini anda dapat mengubah data kelas.'" />

    <!-- Tombol Kembali -->
    <tombol-button @click="$router.push('/class')" class="bg-success text-white kembali-button">
      Kembali ke Daftar Kelas
    </tombol-button>

    <div class="grid grid-cols-2 min-w-0 break-words px-5 py-5 mt-8 bg-white w-full shadow-lg rounded-xl">
      <!-- Nama Kelas -->
      <div class="form-group px-5 flex flex-col gap-1">
        <label for="nama_kelas" class="block font-bold mb-2">Nama Kelas</label>
        <input type="text" id="nama_kelas" name="nama_kelas" placeholder="Pelatihan Teknik Jumping"
          v-model="updatedClass.nama_kelas" class="w-full p-2 border border-gray-300 rounded mb-4 outline-none"
          :class="{ 'cursor-not-allowed': !isEditable }" :disabled="!isEditable">
      </div>
      <!-- Deskripsi -->
      <div class="form-group px-5 flex flex-col gap-1">
        <label for="deskripsi_kelas" class="block font-bold mb-2">Deskripsi Kelas</label>
        <textarea type="text" id="deskripsi_kelas" name="deskripsi_kelas" placeholder="Kelas ini akan menampilkan"
          v-model="updatedClass.deskripsi_kelas"
          :class="{ 'cursor-not-allowed': !isEditable }" :disabled="!isEditable"
          class="w-full p-2 border border-gray-300 rounded mb-4 outline-none"></textarea>
      </div>
      <!-- Level Kelas -->
      <div class="form-group px-5 flex flex-col gap-1">
        <label for="level_kelas" class="block font-bold mb-2">Level Kelas</label>
        <select id="level_kelas" name="level_kelas" v-model="updatedClass.level_kelas"
          class="w-full p-2 border border-gray-300 rounded mb-4 outline-none"
          :class="{ 'cursor-not-allowed': !isEditable }" :disabled="!isEditable">
          <option value="Pemula">Pemula</option>
          <option value="Menengah">Menengah</option>
          <option value="Lanjutan">Lanjutan</option>
          <option value="Ahli">Ahli</option>
        </select>
      </div>
      <!-- Kategori Kelas -->
      <div class="form-group px-5 flex flex-col gap-1">
        <label for="kategori_kelas" class="block font-bold mb-2">Kategori Kelas</label>
        <select id="kategori_kelas" name="kategori_kelas" v-model="updatedClass.kategori_kelas"
          class="w-full p-2 border border-gray-300 rounded mb-4 outline-none"
          :class="{ 'cursor-not-allowed': !isEditable }" :disabled="!isEditable">
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
      <div class="form-group px-5 flex flex-col gap-1">
        <label for="thumbnail_kelas" class="block font-bold mb-2">URL Thumbnail Kelas</label>
        <input type="text" id="thumbnail_kelas" name="thumbnail_kelas" placeholder="www.example.com"
          :class="{ 'cursor-not-allowed': !isEditable }" :disabled="!isEditable"
          v-model="updatedClass.thumbnail_kelas" class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
      </div>
      <!-- Status Kelas -->
      <div class="form-group px-5 flex flex-col gap-1">
        <label for="status_kelas" class="block font-bold mb-2">Status Kelas</label>
        <select id="status_kelas" name="status_kelas" v-model="updatedClass.status_kelas"
          :class="{ 'cursor-not-allowed': !isEditable }" :disabled="!isEditable"
          class="w-full p-2 border border-gray-300 rounded mb-4 outline-none">
          <option value="1">Aktif</option>
          <option value="2">Non Aktif</option>
        </select>
      </div>
      
      <!-- Premium Kelas -->
      <div class="form-group px-5 flex flex-col gap-1">
        <label class="block font-bold mb-2">Premium Kelas</label>
        <div class="flex justify-between gap-4">
          <button v-for="premiumOption in premiumOptions" :key="premiumOption.value" type="button"
            @click="setPremium(premiumOption.value)"
            :class="['w-full rounded-full px-4 py-2 text-sm font-semibold text-black transition duration-150 ease-in-out', { 'bg-red-700 text-white': updatedClass.isPremium === premiumOption.value, 'bg-gray-300': updatedClass.isPremium !== premiumOption.value, 'cursor-not-allowed': !isEditable }]"
            :disabled="!isEditable">
            {{ premiumOption.label }}
          </button>
        </div>
      </div>


      <div class="flex justify-end mt-4 col-span-2 space-x-3"> <!-- Added space-x-3 for spacing between buttons -->
        <button type="button" @click="editClass"
          class="rounded-md bg-yellow-500 px-7 py-3 text-md font-semibold text-white shadow-sm hover:bg-yellow-700 transition duration-150 ease-out hover:ease-in">
          Edit
        </button>
        <button v-if="isEditing" type="button" @click="cancelEdit"
          :class="{ 'cursor-not-allowed': !isEditable }" :disabled="!isEditable"
          class="rounded-md bg-gray-600 px-7 py-3 text-md font-semibold text-white shadow-sm hover:bg-gray-700 transition duration-150 ease-out hover:ease-in">
          Batal
        </button>
        <button type="submit" @click="confirmUpdate" :class="{ 'opacity-50 cursor-not-allowed': !isEditable }"
          :disabled="!isEditable"
          class="rounded-md bg-teal-600 px-7 py-3 text-md font-semibold text-white shadow-sm hover:bg-teal-700 transition duration-150 ease-out hover:ease-in">
          Simpan
        </button>
        <button type="button" @click="deleteClass" :class="{ 'opacity-50 cursor-not-allowed': !isEditable }"
          :disabled="!isEditable"
          class="rounded-md bg-red-600 px-7 py-3 text-md font-semibold text-white shadow-sm hover:bg-red-700 transition duration-150 ease-out hover:ease-in">
          Hapus
        </button>
      </div>

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
      updatedClass: {
        nama_kelas: '',
        deskripsi_kelas: '',
        status_kelas: 1,
        level_kelas: 'Pemula',
        isPremium: 1,
        jumlahPemain: 0,
        rating_kelas: 0,
        kategori_kelas: 'S.A.Q',
        thumbnail_kelas: '',
        videos: [],
      },
      premiumOptions: [
        { label: 'Gratis', value: 2 },
        { label: 'Premium', value: 1 },
      ],
      isEditable: false,
      isEditing: false,
    };
  },
  async created() {
    const classId = this.$route.params.id;
    await this.fetchClass(classId);
  },
  methods: {
    async fetchClass(classId) {
      try {
        const response = await fetch(`https://667994bf18a459f6395091e1.mockapi.io/api/class/${classId}`);
        const data = await response.json();
        this.updatedClass = data;
      } catch (error) {
        console.error('Error fetching class:', error);
      }
    },
    async confirmUpdate() {
      const { value } = await Swal.fire({
        title: 'Yakin akan mengubah kelas?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
      });

      if (value) {
        try {
          const response = await fetch(`https://667994bf18a459f6395091e1.mockapi.io/api/class/${this.updatedClass.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.updatedClass),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log('Class updated:', responseData);
            await Swal.fire('Sukses!', 'Kelas berhasil diubah.', 'success');
            this.$router.push('/class');
          } else {
            await Swal.fire('Gagal!', 'Terjadi kesalahan saat mengubah kelas.', 'error');
          }
        } catch (error) {
          console.error('Error updating class:', error);
          await Swal.fire('Gagal!', 'Terjadi kesalahan saat mengubah kelas.', 'error');
        }
      }
    },

    editClass() {
      Swal.fire({
        title: 'Apakah anda yakin ingin melakukan edit data kelas?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isEditable = true;
          this.isEditing = true; // Tampilkan tombol Batal
        }
      });
    },
    cancelEdit() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Anda akan membatalkan perubahan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, batalkan!',
        cancelButtonText: 'Tidak'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isEditable = false;
          this.isEditing = false; // Sembunyikan tombol Batal
        }
      });
    },
    async deleteClass() {
      const { value } = await Swal.fire({
        title: 'Apakah Anda yakin ingin menghapus kelas ini?',
        text: "Tindakan ini tidak dapat dibatalkan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Tidak'
      });

      if (value) {
        try {
          const response = await fetch(`https://667994bf18a459f6395091e1.mockapi.io/api/class/${this.updatedClass.id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            console.log('Class deleted');
            await Swal.fire('Dihapus!', 'Kelas berhasil dihapus.', 'success');
            this.$router.push('/class');
          } else {
            await Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus kelas.', 'error');
          }
        } catch (error) {
          console.error('Error deleting class:', error);
          await Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus kelas.', 'error');
        }
      }
    },

    cancelUpdate() {
      this.$router.push('/class');
    },
    setPremium(value) {
      this.updatedClass.isPremium = value;
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>