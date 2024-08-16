<template>
  <div>
    <!-- Title Bar -->
    <title-bar 
      is-controlbar 
      :title="'Detail Tugas'"
      :subtitle="'Pada halaman ini Anda dapat melihat detail tugas'" 
    />

    <!-- Tombol Kembali -->
    <div class="flex mb-4">
      <tombol-button @click="$router.push('/verification/task')" class="bg-success text-white kembali-button">
        Kembali ke Daftar Tugas
      </tombol-button>
    </div>

    <!-- Tampilan Video -->
    <div>
      <div class="flex flex-wrap justify-center items-center pb-6">
        <iframe class="w-[1000px] h-[600px]"
          :src="getEmbedUrl(task.video_url)"
          height="315"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <div class="relative py-3 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div class="flex border-gray-900/10 relative pl-5">
        <div class="relative text-base font-semibold text-gray-900 py-1 pr-10 pb-10">
          <h5 class="text-lg font-semibold mb-1">{{ task.fullname }}</h5>
          <h5 class="text-lg font-semibold mb-1">Kelas : <span class="text-yellow-500">{{ task.kelas }}</span></h5>
          <h5 class="text-lg font-semibold mb-1">Status Verifikasi : <span class="text-yellow-500">{{ getStatusTask(task.status_tugas) }}</span></h5>
          <h5 class="text-lg font-semibold mb-1">Skor : <span class="text-yellow-500">{{ task.score_task }}</span></h5>
        </div>
      </div>

      <div class="form-group px-5">
        <label for="score_task" class="block text-lg font-semibold mb-2">Skor</label>
        <input type="number" id="score_task" name="score_task" placeholder="Ex. 96" v-model="score_task"
          :disabled="isTaskCompleted" class="w-full p-2 border border-gray-300 rounded bg- mb-4 outline-none">
        <label for="komentar_task" class="block font-bold mb-2">Komentar</label>
        <textarea id="komentar_task" name="komentar_task" placeholder="Enter your comment" rows="4" v-model="komentar_task"
          :disabled="isTaskCompleted" class="w-full p-2 border border-gray-300 rounded mb-4 focus:border-gray-500 focus:outline-none"></textarea>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6 pr-5" v-if="!isTaskCompleted">
        <button type="submit" @click="confirmAccept"
          class="rounded-md bg-teal-600 px-7 mb-5 py-3 text-md font-semibold text-white shadow-sm hover:bg-teal-700 transition duration-200 ease-out hover:ease-in">Terima</button>
        <button type="submit" @click="confirmReject"
          class="rounded-md bg-red-600 px-7 mb-5 py-3 text-md font-semibold text-white shadow-xl hover:bg-red-700 hover:text-black transition duration-200 ease-out hover:ease-in hover:text-slate-50">Tolak</button>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from '~/components/TitleBar.vue';
import TombolButton from '~/components/TombolButton.vue';
import Swal from 'sweetalert2';

export default {
  components: { TitleBar, TombolButton },
  layout: 'admin',
  data() {
    return {
      task: {
        id: '',
        fullname: '',
        status_tugas: null,
        score_task: null,
        komentar_task: '',
        video_url: ''
      },
      score_task: null,
      komentar_task: ''
    };
  },
  computed: {
    isFormValid() {
      return this.score_task !== null && this.score_task !== '' && this.komentar_task !== '';
    },
    isTaskCompleted() {
      return this.task.status_tugas === 1 || this.task.status_tugas === 2;
    },
    videoSrc() {
      return this.task.video_url;
    }
  },
  async asyncData({ params, $axios }) {
    try {
      const response = await $axios.$get(`https://6662bec962966e20ef09d5d2.mockapi.io/api/tasks/${params.id}`);
      return { task: response };
    } catch (error) {
      console.error('Error fetching task:', error);
      return { task: null };
    }
  },
  mounted() {
    this.score_task = this.task.score_task;
    this.komentar_task = this.task.komentar_task;
  },
  methods: {
    getStatusTask(statusCode) {
      switch (statusCode) {
        case 1:
          return 'Diterima';
        case 2:
          return 'Ditolak';
        case 3:
          return 'Diajukan';
        default:
          return 'Tidak Diketahui';
      }
    },
    getEmbedUrl(url) {
      let videoId = '';
      const urlObj = new URL(url);
      if (urlObj.hostname === 'youtu.be') {
        videoId = urlObj.pathname.slice(1);
      } else {
        videoId = urlObj.searchParams.get('v');
      }
      return `https://www.youtube.com/embed/${videoId}`;
    },
    async updateTaskStatus(id, status, score, comment) {
      try {
        await this.$axios.$put(`https://6662bec962966e20ef09d5d2.mockapi.io/api/tasks/${id}`, {
          status_tugas: status,
          score_task: score,
          komentar_task: comment,
        });
        this.task.status_tugas = status;
        this.task.score_task = score;
        this.task.komentar_task = comment;
        Swal.fire('Berhasil', status === 1 ? 'Tugas berhasil diterima' : 'Tugas berhasil ditolak', 'success').then(() => {
          this.$router.push('/verification/task');
        });
      } catch (error) {
        console.error('Error updating task status:', error);
        Swal.fire('Gagal', 'Terjadi kesalahan saat memperbarui status tugas', 'error');
      }
    },
    confirmAccept() {
      if (!this.isFormValid) {
        Swal.fire({
          icon: 'warning',
          title: 'Skor dan Komentar mohon diisi',
          text: !this.score_task ? 'Skor Harap Diisi' : 'Komentar harap diisi',
        });
        return;
      }
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda yakin ingin menerima tugas ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, terima!',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateTaskStatus(this.task.id, 1, this.score_task, this.komentar_task);
        }
      });
    },
    confirmReject() {
      if (!this.isFormValid) {
        Swal.fire({
          icon: 'warning',
          title: 'Skor dan Komentar mohon diisi',
          text: !this.score_task ? 'Skor Harap Diisi' : 'Komentar harap diisi',
        });
        return;
      }
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda yakin ingin menolak tugas ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, tolak!',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateTaskStatus(this.task.id, 2, this.score_task, this.komentar_task);
        }
      });
    },
  },
};
</script>

<style scoped>
.kembali-button:hover {
  background-color: #045C57;
}

.task-detail {
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.detail-item {
  margin-bottom: 10px;
}

.detail-item .label {
  font-weight: bold;
  margin-right: 10px;
}

.detail-item .value {
  color: #333;
}

.tombol-button {
  margin-right: 10px;
}
</style>
