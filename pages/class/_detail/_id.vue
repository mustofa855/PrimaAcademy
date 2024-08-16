<template>
  <div>
    <title-bar
      :title="'Kelas ' + classDetail.nama_kelas"
      :subtitle="'Anda dapat mengelola kelas ' + classDetail.nama_kelas"
    />

    <!-- Tombol Kembali dan Tombol Tambah Video -->
    <div class="flex justify-between items-center mb-4">
      <!-- Tombol Kembali -->
      <tombol-button @click="$router.push('/class')" class="bg-success text-white kembali-button">
        Kembali ke Daftar Kelas
      </tombol-button>

      <!-- Tombol Tambah Video -->
      <div>
        <button @click="showAddVideoModal = true" class="bg-indigo-600 text-white px-4 py-2 rounded-md">
          Tambah Video
        </button>
      </div>
    </div>

    <!-- Modal Tambah Video -->
    <Modal :title="'Tambah Video'" :show="showAddVideoModal" @close="showAddVideoModal = false">
      <template v-slot:title>Tambah Video</template>
      <form @submit.prevent="validateForm">
        <!-- Input untuk judul video -->
        <div class="mb-5">
          <label class="block font-bold mb-2 text-lg"for="judul">Judul Video</label>
          <input v-model="newVideo.judul_video" type="text" id="judul" required class="w-full border p-2 rounded text-xl">
        </div>

        <!-- Input untuk deskripsi video -->
        <div class="mb-5">
          <label class="block font-bold mb-2 text-lg"for="deskripsi">Deskripsi Video</label>
          <textarea v-model="newVideo.deskripsi_video" id="deskripsi" required class="w-full border p-2 rounded text-xl"></textarea>
        </div>

        <!-- Input untuk link video -->
        <div class="mb-5">
          <label class="block font-bold mb-2 text-lg"for="link">Link Video</label>
          <input v-model="newVideo.link_video" type="url" id="link" required class="w-full border p-2 rounded text-xl">
        </div>

        <!-- Checkbox untuk tugas video -->
        <div class="mb-5">
          <label class="block font-bold mb-2 text-lg"for="isTask">Apakah ini tugas?</label>
          <input v-model="newVideo.isTask_video" type="checkbox" id="isTask" true-value="1" false-value="2" class="cekboks ml-2 w-5 h-5">
        </div>

        <!-- Dropdown untuk status video -->
        <div class="mb-5">
          <label class="block font-bold mb-2 text-lg"for="status">Status Video</label>
          <select v-model="newVideo.status_video" id="status" required class="w-full border p-2 rounded text-xl">
            <option value="1">Aktif</option>
            <option value="2">Non Aktif</option>
          </select>
        </div>

        <!-- Pesan error jika ada field yang kosong -->
        <div v-if="hasErrors" class="text-red-500 text-sm mb-5">
          Harap lengkapi semua kolom sebelum menambahkan video.
        </div>

        <!-- Tombol untuk menutup modal -->
        <div class="text-right py-4">
          <tombol-button type="button" @click="showAddVideoModal = false">Batal</tombol-button>
          <tombol-button type="submit" :disabled="hasErrors">Tambah</tombol-button>
        </div>
      </form>
    </Modal>

    <div v-if="classDetail.id" class="flex justify-start mt-6 gap-6">
      <img :src="classDetail.thumbnail_kelas" :alt="classDetail.nama_kelas" class="thumbnail object-cover rounded-lg" />
      <div class="flex flex-col justify-between gap-4">
        <div class="bg-white w-auto shadow-md rounded-lg p-4 flex-1">
          <h3 class="text-lg font-semibold mb-2 text-gray-800">Total Pemain</h3>
          <p class="text-gray-600">{{ classDetail.jumlahPemain }}</p>
        </div>
        <div class="bg-white shadow-md rounded-lg p-4 flex-1">
          <h3 class="text-lg font-semibold mb-2 text-gray-800">Total Video</h3>
          <p class="text-gray-600">{{ classDetail.videos.length }}</p>
        </div>
        <div class="bg-white shadow-md rounded-lg p-4 flex-1">
          <h3 class="text-lg font-semibold mb-2 text-gray-800">Kategori Kelas</h3>
          <p class="text-gray-600">{{ classDetail.kategori_kelas }}</p>
        </div>
      </div>
    </div>

    <!-- Rating dan Tipe Kelas -->
    <div v-if="classDetail.id" class="flex flex-row">
      <div class="flex flex-col justify-start w-fit bg-transparent rounded-lg p-4 pr-5 mr-17">
        <h3 class="text-lg font-semibold">Rating</h3>
        <div class="flex items-center">
          <template v-for="n in 5">
            <svg
              v-if="n <= classDetail.rating_kelas"
              :key="'filled-star-' + n"
              class="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.363 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118L10 13.663l-3.357 2.44c-.784.57-1.84-.197-1.54-1.118l1.286-3.955a1 1 0 00-.363-1.118L2.669 9.382c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69L9.049 2.927z"/>
            </svg>
            <svg
              v-else
              :key="'empty-star-' + n"
              class="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.363 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118L10 13.663l-3.357 2.44c-.784.57-1.84-.197-1.54-1.118l1.286-3.955a1 1 0 00-.363-1.118L2.669 9.382c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69L9.049 2.927z"/>
            </svg>
          </template>
        </div>
      </div>
      <div class="flex flex-col justify-start w-fit bg-transparent rounded-lg p-4">
        <h3 class="text-lg font-semibold">Tipe Kelas</h3>
        <p v-if="classDetail.isPremium === 1" class="flex text-white px-2 py-1 bg-red-700 rounded-md"> Premium </p>
        <p v-if="classDetail.isPremium === 2" class="text-white px-2 py-1 bg-emerald-600 rounded-md"> Gratis </p>
      </div>
    </div>

    <div class="pb-5">
      <!-- Judul dan Tombol Tambah Video -->
      <div class="flex items-center justify-between mb-5">
        <h4 class="text-xl font-semibold">Videos</h4>
        <button @click="showAddVideoModal = true" class="bg-indigo-600 text-white px-4 py-2 rounded-md">
          Tambah Video
        </button>
      </div>
    
      <!-- Daftar Video -->
      <div v-if="classDetail.id" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <card-video
          v-for="(video, index) in paginatedVideos"
          :key="video.id"
          :video="video"
          :thumbnail="classDetail.thumbnail_kelas"
          :isPremium="classDetail.isPremium"
          @deleteVideo="removeVideo"
          @updateVideo="updateVideo"
        />
      </div>

      <!-- pagination -->
      <pagination :pagination="pagination" @paginate="paginate" />
    </div>
  </div>
</template>

<script>
import TitleBar from '~/components/TitleBar.vue';
import CardVideo from '~/components/CardVideo.vue';
import Modal from '~/components/Modal.vue';
import Pagination from '~/components/Pagination.vue';

export default {
  layout: 'admin',
  components: { TitleBar, CardVideo, Modal, Pagination }, // Register modal component
  data() {
    return {
      classDetail: {
        id: '',
        nama_kelas: '',
        deskripsi_kelas: '',
        status_kelas: '',
        level_kelas: '',
        kategori_kelas: '',
        thumbnail_kelas: '',
        videos: [],
      },
      pagination: {
        current_page: 1,
        from: 1,
        to: 12, // Update this to match per_page
        per_page: 12,
        total: 0,
        last_page: 1,
      },
      showAddVideoModal: false, // State to control modal visibility
      newVideo: { // Data for new video
        judul_video: '',
        deskripsi_video: '',
        link_video: '',
        isTask_video: 2,
        status_video: 1
      },
      hasErrors: false // State to track form errors
    };
  },
  computed: {
    paginatedVideos() {
      const startIndex = (this.pagination.current_page - 1) * this.pagination.per_page;
      return this.classDetail.videos.slice(startIndex, startIndex + this.pagination.per_page);
    },
  },
  watch:{
    pagination: {
      handler() {
        this.updatePagination();
      },
      deep: true,
    },
  },
  async mounted() {
    await this.fetchClassDetail();
  },
  methods: {
    async fetchClassDetail() {
      const id = this.$route.params.id;
      const response = await fetch(`https://667994bf18a459f6395091e1.mockapi.io/api/class/${id}`);
      if (response.ok) {
        this.classDetail = await response.json();
        this.updatePagination();
      } else {
        console.error('Failed to fetch class details');
      }
    },
    validateForm() {
      // Validate form data
      this.hasErrors = !this.newVideo.judul_video || !this.newVideo.deskripsi_video || !this.newVideo.link_video;
      if (!this.hasErrors) {
        this.addVideo(); // Proceed to add video if no errors
      }
    },
    async addVideo() {
      try {
        const newVideoId = (this.classDetail.videos.length + 1).toString();
        const newVideoData = {
          ...this.newVideo,
          id: newVideoId,
        };
        const response = await fetch(`https://667994bf18a459f6395091e1.mockapi.io/api/class/${this.classDetail.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...this.classDetail,
            videos: [...this.classDetail.videos, newVideoData]
          })
        });
        if (response.ok) {
          this.classDetail.videos.push(newVideoData); // Update local data
          this.showAddVideoModal = false; // Close modal after successful addition
          this.newVideo = { judul_video: '', deskripsi_video: '', link_video: '', isTask_video: '', status_video: '' }; // Reset form
          // Optional: Show success message
          this.$swal({
            title: 'Berhasil!',
            text: 'Video berhasil ditambahkan.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        } else {
          throw new Error('Failed to add video');
        }
      } catch (error) {
        console.error('Error adding video:', error);
        // Optional: Show error message
        this.$swal({
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat menambahkan video.',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        });
      }
    },
    async removeVideo(videoId) {
      try {
        const updatedVideos = this.classDetail.videos.filter(video => video.id !== videoId);
        const response = await fetch(`https://667994bf18a459f6395091e1.mockapi.io/api/class/${this.classDetail.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...this.classDetail,
            videos: updatedVideos
          })
        });
        if (response.ok) {
          this.classDetail.videos = updatedVideos; // Update local data
          // Optional: Show success message
          this.$swal({
            title: 'Berhasil!',
            text: 'Video berhasil dihapus.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        } else {
          throw new Error('Failed to delete video');
        }
      } catch (error) {
        console.error('Error deleting video:', error);
        // Optional: Show error message
        this.$swal({
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat menghapus video.',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        });
      }
    },
    updateVideo(updatedVideo) {
      const index = this.classDetail.videos.findIndex(video => video.id === updatedVideo.id);
      if (index !== -1) {
        this.$set(this.classDetail.videos, index, updatedVideo);
      }
    },
    paginate(page) {
      this.pagination.current_page = page;
    },
    updatePagination() {
      const totalVideos = this.classDetail.videos.length;
      this.pagination.total = totalVideos;
      this.pagination.last_page = Math.ceil(totalVideos / this.pagination.per_page);
      this.pagination.from = (this.pagination.current_page - 1) * this.pagination.per_page + 1;
      this.pagination.to = Math.min(this.pagination.current_page * this.pagination.per_page, totalVideos);
    }
  },
}
</script>

<style scoped>
.kembali-button:hover {
  background-color: #045C57;
}

.mt-6 {
  margin-top: 1.5rem;
}
.w-full {
  width: 100%;
}
.thumbnail {
  height: 465px;
  width: 600px;
}

</style>
