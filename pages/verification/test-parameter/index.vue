<template>
  <div>
    <!-- Title Bar -->
    <title-bar
      is-controlbar
      :title="'Verifikasi Test Parameter'"
      :subtitle="'Pada menu ini anda dapat melakukan verifikasi test parameter.'"
    />

    <!-- Tombol Tampilkan Semua Parameter Tes -->
    <div class="flex justify-between mb-4">
      <tombol-button @click="$router.push('/verification')" class="bg-success text-white kembali-button">
        Kembali
      </tombol-button>
      <button @click="toggleShowAll"
        class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring focus:ring-blue-200">
        {{ showAll ? 'Tampilkan Tes yang Belum Diverifikasi' : 'Tampilkan Semua Tes' }}
      </button>
    </div>

    <!-- Table Content -->
    <tabel :header-table="tableHeader" :data="paginatedParams">
      <template #no="{ index }">{{ index + pagination.from }}</template>
      <template #fullname="{ item }">{{ item.fullname }}</template>
      <template #tgl_dibuat="{ item }">{{ formatDate(item.tgl_dibuat) }}</template>
      <template #status_param="{ item }">{{ getStatusParam(item.status_param) }}</template>
      <template #action="{ item }">
        <tombol-button :dense="true" class="bg-success hover:bg-success-shade" @click="toDetailParam(item)">
          <img class="w-4" :src="'/eye.svg'" />
        </tombol-button>
      </template>
    </tabel>

    <!-- pagination -->
    <pagination 
      :pagination="pagination" 
      @paginate="paginate" 
    />
  </div>
</template>

<script>
import TitleBar from '~/components/TitleBar.vue'
import Tabel from '~/components/Tabel.vue'
import Pagination from '~/components/Pagination.vue'
import TombolButton from '~/components/TombolButton.vue'

export default {
  components: { TitleBar, Tabel, Pagination, TombolButton },
  layout: 'admin',
  data() {
    return {
      params: [],
      showAll: false,
      tableHeader: [
        { text: 'No', key: 'no' },
        { text: 'Nama pengirim', key: 'fullname' },
        { text: 'Tanggal Dibuat', key: 'tgl_dibuat' },
        { text: 'Status', key: 'status_param' },
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
      filteredParamsCount: 0,
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
  computed: {
    filteredParams() {
      const filtered = this.showAll
        ? this.params
        : this.params.filter(param => param.status_param !== 1 && param.status_param !== 2);
      this.filteredParamsCount = filtered.length;
      return filtered;
    },
    paginatedParams() {
      const start = (this.pagination.current_page - 1) * this.pagination.per_page;
      const end = this.pagination.current_page * this.pagination.per_page;
      return this.filteredParams.slice(start, end);
    }
  },
  methods: {
    async fetchParams() {
      try {
        const response = await this.$axios.$get('https://6672a1756ca902ae11b1155d.mockapi.io/api/test-parameter');
        this.params = response || [];
        this.params = (response || []).sort((a, b) => new Date(b.tgl_dibuat) - new Date(a.tgl_dibuat));
        this.updateFilteredParamsCount();
        this.pagination.total = this.filteredParamsCount;
        this.pagination.last_page = Math.ceil(this.filteredParamsCount / this.pagination.per_page);
        this.updatePagination();
      } catch (error) {
        console.error('Error fetching test parameter:', error);
      }
    },
    updatePagination() {
      this.pagination.from = (this.pagination.current_page - 1) * this.pagination.per_page + 1;
      this.pagination.to = Math.min(this.pagination.current_page * this.pagination.per_page, this.filteredParamsCount);
    },
    paginate(page) {
      this.pagination.current_page = page;
      this.updatePagination();
    },
    toggleShowAll() {
      this.showAll = !this.showAll;
      this.pagination.current_page = 1;
      this.updateFilteredParamsCount();
      this.pagination.total = this.filteredParamsCount;
      this.pagination.last_page = Math.ceil(this.filteredParamsCount / this.pagination.per_page);
      this.updatePagination();
    },
    updateFilteredParamsCount() {
      this.filteredParamsCount = this.showAll
        ? this.params.length
        : this.params.filter(param => param.status_param !== 1 && param.status_param !== 2).length;
    },
    getStatusParam(statusCode) {
      switch (statusCode) {
        case 1:
          return 'Diterima';
        case 2:
          return 'Ditolak';
        case 3:
          return 'Menunggu';
        default:
          return 'Tidak Diketahui';
      }
    },
    toDetailParam(param) {
      this.$router.push(`/verification/test-parameter/${param.id}`);
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
  created() {
    this.fetchParams();
  }
}
</script>

<style scoped>
.kembali-button:hover {
  background-color: #045C57;
}
</style>
