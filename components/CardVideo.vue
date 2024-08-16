<template>
  <div class="bg-white shadow rounded-lg overflow-hidden relative">
    <img :src="thumbnail" alt="Video Thumbnail" class="w-full h-32 object-cover">
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ video.judul_video }}</h3>
      <p class="text-gray-500">{{ video.deskripsi_video }}</p>
      <button @click="openModal" class="text-blue-600 hover:underline">Watch Video</button>
      <div class="flex flex-wrap gap-2 mt-2">
        <p v-if="isPremium === 1" class="text-white px-2 py-1 bg-red-700 rounded-md">Premium</p>
        <p v-else-if="isPremium === 2" class="text-white px-2 py-1 bg-emerald-700 rounded-md">Gratis</p>
        
        <p v-if="video.isTask_video == 1" class="text-white px-2 py-1 bg-yellow-600 rounded-md">Tugas</p>
        <p v-else-if="video.isTask_video == 2" class="text-white px-2 py-1 bg-gray-600 rounded-md">Non Tugas</p>
        
        <p v-if="video.status_video == 1" class="text-white px-2 py-1 bg-green-600 rounded-md">Aktif</p>
        <p v-else-if="video.status_video == 2" class="text-white px-2 py-1 bg-red-600 rounded-md">Non Aktif</p>
      </div>
    </div>
    <div class="absolute top-2 right-2">
      <div @click="toggleMenu" class="cursor-pointer bg-white rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V6.01M12 12V12.01M12 18V18.01" />
          </svg>
      </div>
      <div v-if="menuOpen" @mouseleave="menuOpen = false" class="bg-white shadow-lg rounded-lg absolute right-0 mt-2 py-2 w-48">
        <a @click="editVideo" class="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">Edit</a>
        <a @click="confirmDeleteVideo" class="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">Hapus</a>
      </div>
    </div>
    
    <!-- Modal for watching video -->
    <Modal
      :title="video.judul_video"
      :show="showWatchVideoModal"
      @close="showWatchVideoModal = false"
    >
      <iframe
        width="100%"
        height="480"
        :src="getEmbedUrl(video.link_video)"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </Modal>
    
    <!-- Modal Edit Video -->
    <Modal
      :title="'Edit Video'"
      :show="showEditVideoModal"
      @close="showEditVideoModal = false"
    >
      <template v-slot:title>Edit Video</template>
      <form @submit.prevent="validateEditForm">
        <!-- Form input untuk edit video -->
        <div class="mb-4">
          <label class="block font-bold mb-2 text-lg" for="editedJudul">Judul Video</label>
          <input v-model="editedVideo.judul_video" type="text" id="editedJudul" required class="w-full border p-2 rounded text-xl">
        </div>
        <div class="mb-4">
          <label class="block font-bold mb-2 text-lg" for="editedDeskripsi">Deskripsi Video</label>
          <textarea v-model="editedVideo.deskripsi_video" id="editedDeskripsi" required class="w-full border p-2 rounded text-xl"></textarea>
        </div>
        <div class="mb-4">
          <label class="block font-bold mb-2 text-lg" for="editedLink">Link Video</label>
          <input v-model="editedVideo.link_video" type="url" id="editedLink" required class="w-full border p-2 rounded text-xl">
        </div>

        <!-- Checkbox untuk tugas video -->
        <div class="mb-4">
          <label class="block font-bold mb-2 text-lg" for="isTask">Apakah ini tugas?</label>
          <input v-model="editedVideo.isTask_video" type="checkbox" id="isTask" true-value="1" false-value="2" class="ml-2 w-5 h-5">
        </div>

        <!-- Dropdown untuk status video -->
        <div class="mb-4">
          <label class="block font-bold mb-2 text-lg" for="status">Status Video</label>
          <select v-model="editedVideo.status_video" id="status" required class="w-full border p-2 rounded text-xl">
            <option value="1">Aktif</option>
            <option value="2">Non Aktif</option>
          </select>
        </div>

        <!-- Optional: Show error message -->
        <div v-if="hasEditErrors" class="text-red-500 text-sm mb-4">
          Harap lengkapi semua kolom sebelum mengubah video.
        </div>

        <!-- Tombol Submit -->
        <div class="text-right py-4">
          <tombol-button type="button" @click="showEditVideoModal = false">Batal</tombol-button>
          <tombol-button type="submit" :disabled="hasEditErrors">Simpan Perubahan</tombol-button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import Modal from '~/components/Modal.vue';

export default {
  props: {
    video: {
      type: Object,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Number,
      required: true,
    },
  },
  components: {
    Modal
  },
  data() {
    return {
      showWatchVideoModal: false,
      showEditVideoModal: false,
      editedVideo: {
        id: '',
        judul_video: '',
        deskripsi_video: '',
        link_video: '',
        isTask_video: null,
        status_video: null,
      },
      hasEditErrors: false,
      menuOpen: false
    };
  },
  methods: {
    openModal() {
      this.showWatchVideoModal = true;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    confirmDeleteVideo() {
      this.$swal({
        title: 'Apakah Anda yakin?',
        text: 'Anda tidak akan dapat mengembalikan video ini!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
      }).then(result => {
        if (result.isConfirmed) {
          this.$emit('deleteVideo', this.video.id);
        }
      });
    },
    editVideo() {
      this.showEditVideoModal = true;
      this.editedVideo.id = this.video.id;
      this.editedVideo.judul_video = this.video.judul_video;
      this.editedVideo.deskripsi_video = this.video.deskripsi_video;
      this.editedVideo.link_video = this.video.link_video;
      this.editedVideo.isTask_video = this.video.isTask_video;
      this.editedVideo.status_video = this.video.status_video;
    },
    validateEditForm() {
      this.hasEditErrors = !this.editedVideo.judul_video || !this.editedVideo.deskripsi_video || !this.editedVideo.link_video;
      
      if (!this.hasEditErrors) {
        this.saveEditedVideo();
      }
    },
    async saveEditedVideo() {
      try {
        const response = await fetch(`https://667994bf18a459f6395091e1.mockapi.io/api/class/${this.$route.params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.editedVideo)
        });
        if (response.ok) {
          this.$emit('updateVideo', this.editedVideo);
          this.showEditVideoModal = false;
          this.$swal({
            title: 'Sukses!',
            text: 'Video berhasil diperbarui.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        } else {
          throw new Error('Failed to update video');
        }
      } catch (error) {
        console.error('Error updating video:', error);
        this.$swal({
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat memperbarui video.',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        });
      }
    },
    getEmbedUrl(link) {
      const videoIdMatch = link.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
      } else {
        const shortVideoIdMatch = link.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?&]+)/);
        return shortVideoIdMatch ? `https://www.youtube.com/embed/${shortVideoIdMatch[1]}` : link;
      }
    }
  },
};
</script>

<style scoped>
.bg-white {
  background-color: white;
}
.shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.rounded-lg {
  border-radius: 0.5rem;
}
.overflow-hidden {
  overflow: hidden;
}
.p-4 {
  padding: 1rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.w-full {
  width: 100%;
}
.h-32 {
  height: 8rem;
}
.object-cover {
  object-fit: cover;
}
.absolute {
  position: absolute;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
