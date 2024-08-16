<template>
  <div>
    <!-- Title Bar -->
    <title-bar is-controlbar :title="'Daftar Kelas'" :subtitle="'Pada menu ini anda dapat melihat dan mengelola kelas.'" />

    <!-- Search and Add New Class Button -->
    <div class="search-download-container">
      <search-input class="search-input" @input="handleSearch" v-model="searchTerm" />
      <tombol-button @click="navigateToCreateClass"
        class="bg-success download-button text-white flex items-center space-x-2 hover:bg-success-shade duration-700">
        <!-- <img class="w-7" :src="'/add.svg'" /> -->
        <p>Tambah Kelas Baru</p>
      </tombol-button>
    </div>

    <!-- Card Class -->
    <div class="grid grid-cols-1 gap-6">
      <card-class 
        v-for="kelas in filteredClasses" 
        :key="kelas.id" 
        :kelas="kelas" 
        @hover="hoverClass"
        @leave="leaveClass"
        @updateClass="handleUpdateClass"
        @deleteClass="handleDeleteClass" />
    </div>

    <!-- Pagination -->
    <pagination :pagination="pagination" @paginate="handlePaginate" />
  </div>
</template>

<script>
import TitleBar from '~/components/TitleBar.vue';
import SearchInput from '~/components/SearchInput.vue';
import TombolButton from '~/components/TombolButton.vue';
import CardClass from '~/components/CardClass.vue';
import Pagination from '~/components/Pagination.vue';
import Swal from 'sweetalert2';

export default {
  components: { TitleBar, SearchInput, TombolButton, CardClass, Pagination },
  layout: 'admin',
  data() {
    return {
      allClasses: [],
      filteredClasses: [],
      searchTerm: '',
      pagination: {
        current_page: 1,
        from: 1,
        to: 8,
        per_page: 8,
        total: 0,
        last_page: 1,
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
      this.updatePagination();
    },
  },
  mounted() {
    this.fetchClasses();
  },
  methods: {
    async fetchClasses() {
      try {
        const response = await fetch('https://667994bf18a459f6395091e1.mockapi.io/api/class');
        const data = await response.json();
        this.allClasses = data;
        this.pagination.total = this.allClasses.length;
        this.pagination.last_page = Math.ceil(this.allClasses.length / this.pagination.per_page);
        this.updatePagination();
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    },
    updatePagination() {
      let filteredClasses = this.allClasses;

      if (this.searchTerm) {
        const searchTermLower = this.searchTerm.toLowerCase();
        filteredClasses = filteredClasses.filter(kelas =>
          kelas.name.toLowerCase().includes(searchTermLower) ||
          kelas.description.toLowerCase().includes(searchTermLower)
        );
      }

      this.pagination.total = filteredClasses.length;
      this.pagination.last_page = Math.ceil(filteredClasses.length / this.pagination.per_page);

      const start = (this.pagination.current_page - 1) * this.pagination.per_page;
      const end = start + this.pagination.per_page;

      this.filteredClasses = filteredClasses.slice(start, end);
      this.pagination.from = start + 1;
      this.pagination.to = end > this.pagination.total ? this.pagination.total : end;
    },
    handlePaginate(page) {
      this.pagination.current_page = page;
    },
    handleSearch(value) {
      this.searchTerm = value;
    },
    navigateToCreateClass() {
      this.$router.push('/class/create');
    },
    handleUpdateClass(kelas) {
      this.$router.push({ path: `/class/update/${kelas.id}` });
    },
    async handleDeleteClass(kelas) {
      try {
        const { value } = await Swal.fire({
          title: 'Yakin ingin menghapus kelas?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak',
        });

        if (value) {
          const response = await fetch(`https://667994bf18a459f6395091e1.mockapi.io/api/class/${kelas.id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            await Swal.fire('Sukses!', 'Kelas berhasil dihapus.', 'success');
            this.fetchClasses(); // Update daftar kelas setelah penghapusan
          } else {
            await Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus kelas.', 'error');
          }
        }
      } catch (error) {
        console.error('Error deleting class:', error);
        await Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus kelas.', 'error');
      }
    },
    hoverClass(id) {
      this.hoveredClassId = id;
    },
    leaveClass() {
      this.hoveredClassId = null;
    },
  },
};
</script>

<style scoped>
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
</style>
