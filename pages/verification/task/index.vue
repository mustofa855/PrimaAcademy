<template>
  <div>
    <!-- Title Bar -->
    <title-bar is-controlbar :title="'Verifikasi Tugas'"
      :subtitle="'Pada menu ini anda dapat melakukan verifikasi tugas'" />

    <!-- Tombol Kembali dan Tampilkan Semua Tugas -->
    <div class="flex justify-between mb-4">
      <!-- Tombol Kembali -->
      <tombol-button @click="$router.push('/verification')" class="bg-success text-white kembali-button">
        Kembali
      </tombol-button>
      <button @click="toggleShowAll"
        class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring focus:ring-blue-200">
        {{ showAll ? 'Tampilkan Tugas yang Belum Diverifikasi' : 'Tampilkan Semua Tugas' }}
      </button>
    </div>

    <!-- Table Content -->
    <tabel :header-table="tableHeader" :data="paginatedTasks">
      <template #no="{ index }">{{ index + pagination.from }}</template>
      <template #tgl_dibuat="{ item }">{{ formatDate(item.tgl_dibuat) }}</template>
      <template #status_tugas="{ item }">{{ getStatusTask(item.status_tugas) }}</template>
      <template #action="{ item }">
        <tombol-button :dense="true" class="bg-success hover:bg-success-shade" @click="toDetail(item)">
          <img class="w-4" :src="'/eye.svg'" />
        </tombol-button>
      </template>
    </tabel>

    <!-- pagination -->
    <pagination :pagination="pagination" @paginate="paginate" />

  </div>
</template>

<script>
import TitleBar from '~/components/TitleBar.vue';
import Tabel from '~/components/Tabel.vue';
import TombolButton from '~/components/TombolButton.vue';
import Pagination from '~/components/Pagination.vue';

export default {
  components: { TitleBar, Tabel, TombolButton, Pagination },
  layout: 'admin',
  data() {
    return {
      tasks: [],
      showAll: false,
      tableHeader: [
        { text: 'No', key: 'no' },
        { text: 'Nama pengirim', key: 'fullname' },
        { text: 'Kelas', key: 'kelas' },
        { text: 'Tanggal Dibuat', key: 'tgl_dibuat' },
        { text: 'Status', key: 'status_tugas' },
        { text: 'Aksi', key: 'action' },
      ],
      pagination: {
        current_page: 1,
        from: 1,
        to: 10,
        per_page: 10,
        total: 0,
        last_page: 1,
      },
      filteredTasksCount: 0,
    }
  },
  watch: {
    pagination: {
      handler() {
        this.updatePagination();
      },
      deep: true,
    },
  },
  async fetch() {
    try {
      const response = await this.$axios.$get('https://6662bec962966e20ef09d5d2.mockapi.io/api/tasks');
      this.tasks = response || [];
      this.sortTasksByDate();
      this.updateFilteredTasksCount();
      this.pagination.total = this.filteredTasksCount;
      this.pagination.last_page = Math.ceil(this.filteredTasksCount / this.pagination.per_page);
      this.updatePagination();
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  },
  computed: {
    filteredTasks() {
      const filtered = this.showAll
        ? this.tasks
        : this.tasks.filter(task => task.status_tugas !== 1 && task.status_tugas !== 2);
      this.filteredTasksCount = filtered.length;
      return filtered;
    },
    paginatedTasks() {
      const start = (this.pagination.current_page - 1) * this.pagination.per_page;
      const end = this.pagination.current_page * this.pagination.per_page;
      return this.filteredTasks.slice(start, end);
    }
  },
  methods: {
    sortTasksByDate() {
      this.tasks.sort((a, b) => new Date(b.tgl_dibuat) - new Date(a.tgl_dibuat));
    },
    updatePagination() {
      this.pagination.from = (this.pagination.current_page - 1) * this.pagination.per_page + 1;
      this.pagination.to = Math.min(this.pagination.current_page * this.pagination.per_page, this.filteredTasksCount);
    },
    paginate(page) {
      this.pagination.current_page = page;
      this.updatePagination();
    },
    toggleShowAll() {
      this.showAll = !this.showAll;
      this.pagination.current_page = 1;
      this.updateFilteredTasksCount();
      this.pagination.total = this.filteredTasksCount;
      this.pagination.last_page = Math.ceil(this.filteredTasksCount / this.pagination.per_page);
      this.updatePagination();
    },
    updateFilteredTasksCount() {
      this.filteredTasksCount = this.showAll
        ? this.tasks.length
        : this.tasks.filter(task => task.status_tugas !== 1 && task.status_tugas !== 2).length;
    },
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
    async updateTaskStatus(id, status) {
      try {
        await this.$axios.$put(`https://6662bec962966e20ef09d5d2.mockapi.io/api/tasks/${id}`, { status_tugas: status });
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
          this.$set(this.tasks, taskIndex, { ...this.tasks[taskIndex], status_tugas: status });
        }
        this.modal.show = false;
        if (status === 1) {
          Swal.fire('Berhasil', 'Tugas berhasil diterima', 'success');
        } else if (status === 2) {
          Swal.fire('Berhasil', 'Tugas berhasil ditolak', 'success');
        }
        this.updateFilteredTasksCount();
        this.pagination.total = this.filteredTasksCount;
        this.pagination.last_page = Math.ceil(this.filteredTasksCount / this.pagination.per_page);
        this.updatePagination();
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    },
    confirmAccept() {
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
          this.acceptData();
        }
      });
    },
    confirmReject() {
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
          this.tolakTugas();
        }
      });
    },
    acceptData() {
      this.updateTaskStatus(this.modal.key, 1);
    },
    tolakTugas() {
      this.updateTaskStatus(this.modal.key, 2);
    },
    toDetail(task) {
      this.$router.push(`../verification/task/${task.id}`);
    },
    formatDate(dateString) {
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      const date = new Date(dateString);
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    }
  },
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

.button {
  margin-bottom: 10px;
}

.kembali-button {
  transition: background-color 0.3s;
}

.kembali-button:hover {
  background-color: #045C57;
}
</style>
