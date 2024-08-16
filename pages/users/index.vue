<template>
  <div>
    <title-bar is-controlbar :title="'Pengguna'" :subtitle="'Pada menu ini anda dapat mengelola akun Pengguna.'" />
    <div class="search-download-container">
      <search-input class="search-input" @input="handleSearch" v-model="searchTerm" />
      <tombol-button @click="confirmDownload"
        class="bg-success download-button text-white flex items-center space-x-2 hover:bg-success-shade duration-700">
        <img class="w-7" :src="'/download.svg'" />
        <p>Unduh Xlsx</p>
      </tombol-button>
      <div class="filter-dropdowns flex space-x-1 pl-4">
        <div>
          <select @change="filterByRole($event)"
            class="bg-red-700 filter-button text-white p-3 px-4 rounded-lg cursor-pointer">
            <option value="">Filter by Role</option>
            <option value="pemain">Pemain</option>
            <option value="pelatih">Pelatih</option>
            <option value="all">Tampilkan Semua</option>
          </select>
        </div>
        <div>
          <select @change="filterByGender($event)"
            class="bg-red-700 filter-button text-white p-3 px-4 space-x-2 rounded-lg">
            <option value="">Filter by Gender</option>
            <option value="laki-laki">Laki-Laki</option>
            <option value="perempuan">Perempuan</option>
            <option value="all">Tampilkan Semua</option>
          </select>
        </div>
      </div>
    </div>
    <!-- data tabel -->
    <tabel :header-table="tableHeader" :data="filteredUsers">
      <template #no="{ index }">{{ index + pagination.from }}</template>
      <template #user_role="{ item }">{{ getUserRole(item.user_role) }}</template>
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
import SearchInput from '~/components/SearchInput.vue';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

export default {
  components: { TitleBar, Tabel, TombolButton, Pagination, SearchInput },
  layout: 'admin',
  data() {
    return {
      allUsers: [],
      users: [],
      filteredUsers: [],
      searchTerm: '',
      tableHeader: [
        { text: 'No', key: 'no' },
        { text: 'Nama Pengguna', key: 'fullname' },
        { text: 'Email', key: 'email' },
        { text: 'Role', key: 'user_role' },
        { text: 'Gender', key: 'jenis_kelamin' },
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
      filters: {
        role: '',
        gender: '',
      },
    };
  },
  watch: {
    pagination: {
      handler() {
        this.updatePagination();
      },
      deep: true,
    },
    searchTerm() {
      this.updatePagination(); // Update pagination when searchTerm changes
    },
    filters: {
      handler() {
        this.updatePagination(); // Update pagination when filters change
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchDataUsers();
  },
  methods: {
    async fetchDataUsers() {
      try {
        const response = await this.$axios.$get('https://6662bec962966e20ef09d5d2.mockapi.io/api/users');
        this.allUsers = response;
        this.pagination.total = this.allUsers.length;
        this.pagination.last_page = Math.ceil(this.allUsers.length / this.pagination.per_page);
        this.updatePagination();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    updatePagination() {
      let filteredUsers = this.allUsers;

      // Apply search filter
      if (this.searchTerm) {
        const searchTermLower = this.searchTerm.toLowerCase();
        filteredUsers = filteredUsers.filter(user =>
          user.fullname.toLowerCase().includes(searchTermLower) ||
          user.username.toLowerCase().includes(searchTermLower) ||
          user.email.toLowerCase().includes(searchTermLower) ||
          user.jenis_kelamin.toLowerCase().includes(searchTermLower) ||
          this.getUserRole(user.user_role).toLowerCase().includes(searchTermLower)
        );
      }

      // Apply role filter
      if (this.filters.role && this.filters.role !== 'all') {
        filteredUsers = filteredUsers.filter(user => this.getUserRole(user.user_role) === this.filters.role);
      }

      // Apply gender filter
      if (this.filters.gender && this.filters.gender !== 'all') {
        filteredUsers = filteredUsers.filter(user => user.jenis_kelamin === this.filters.gender);
      }

      // Sort by fullname A-Z
      filteredUsers.sort((a, b) => a.fullname.localeCompare(b.fullname));

      this.pagination.total = filteredUsers.length;
      this.pagination.last_page = Math.ceil(filteredUsers.length / this.pagination.per_page);

      const start = (this.pagination.current_page - 1) * this.pagination.per_page;
      const end = start + this.pagination.per_page;

      this.filteredUsers = filteredUsers.slice(start, end);
      this.pagination.from = start + 1;
      this.pagination.to = end > this.pagination.total ? this.pagination.total : end;
    },
    paginate(page) {
      this.pagination.current_page = page;
    },
    toDetail(user) {
      this.$router.push(`../users/${user.id}`);
    },
    getUserRole(role) {
      return role === 2 ? 'pemain' : 'pelatih';
    },
    filterByRole(event) {
      this.filters.role = event.target.value;
    },
    filterByGender(event) {
      this.filters.gender = event.target.value;
    },
    confirmDownload() {
      Swal.fire({
        title: 'Unduh Xlsx',
        text: 'Apakah Anda yakin akan mendownload seluruh data pengguna?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          this.downloadExcel(); // Panggil metode downloadExcel jika pengguna menekan Ya
        }
      });
    },
    downloadExcel() {
      let filteredData = this.allUsers;

      // Apply search filter if searchTerm is set
      if (this.searchTerm) {
        const searchTermLower = this.searchTerm.toLowerCase();
        filteredData = filteredData.filter(user =>
          user.fullname.includes(searchTermLower) ||
          user.username.includes(searchTermLower) ||
          user.email.includes(searchTermLower) ||
          user.nik_user.includes(searchTermLower) ||
          user.phone_number.includes(searchTermLower) ||
          user.jenis_kelamin.includes(searchTermLower) ||
          this.getUserRole(user.user_role).includes(searchTermLower) ||
          user.instagram_acc.includes(searchTermLower) ||
          user.city_user.includes(searchTermLower) ||
          user.address_acc.includes(searchTermLower) ||
          user.birthday_user.includes(searchTermLower)
        );
      }

      // Apply role filter if role is set
      if (this.filters.role && this.filters.role !== 'all') {
        filteredData = filteredData.filter(user => this.getUserRole(user.user_role) === this.filters.role);
      }

      // Apply gender filter if gender is set
      if (this.filters.gender && this.filters.gender !== 'all') {
        filteredData = filteredData.filter(user => user.jenis_kelamin === this.filters.gender);
      }

      const data = filteredData.map(user => ({
        'Nama Pengguna': user.fullname,
        'Username': user.username,
        'Email': user.email,
        'NIK': user.nik_user,
        'Nomor Telepon': user.phone_number,
        'Jenis Kelamin': user.jenis_kelamin,
        'Role': this.getUserRole(user.user_role),
        'Instagram': user.instagram_acc,
        'Kota': user.city_user,
        'Alamat': user.address_acc,
        'Tanggal Lahir': user.birthday_user,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);

      // Set column widths (adjust as needed)
      const columnWidths = [
        { wch: 20 }, // Lebar kolom 'Nama Pengguna'
        { wch: 15 }, // Lebar kolom 'Username'
        { wch: 30 }, // Lebar kolom 'Email'
        { wch: 22 }, // Lebar kolom 'NIK'
        { wch: 17 }, // Lebar kolom 'Nomor Telepon'
        { wch: 15 }, // Lebar kolom 'Jenis Kelamin'
        { wch: 10 }, // Lebar kolom 'Role'
        { wch: 20 }, // Lebar kolom 'Instagram'
        { wch: 15 }, // Lebar kolom 'Kota'
        { wch: 30 }, // Lebar kolom 'Alamat'
        { wch: 15 }, // Lebar kolom 'Tanggal Lahir'
      ];

      worksheet['!cols'] = columnWidths;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
      XLSX.writeFile(workbook, 'Daftar_Pengguna.xlsx');
    },
    handleSearch(value) {
      this.searchTerm = value; // Update searchTerm when input changes
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #f9f9f9;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
}

.search-download-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  margin-right: 10px;
}

.download-button {
  display: flex;
  align-items: center;
}

.download-button img {
  margin-right: 8px;
}

.download-button p {
  margin: 0;
}

.filter-dropdowns {
  display: flex;
  gap: 0.5rem;
}

.select-dropdown {
  padding: 8px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.select-dropdown:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.filter-button {
  background-color: #a80000;
}

.filter-button:hover {
  background-color: #c12626;
  transition-duration: 700ms;
}
</style>
