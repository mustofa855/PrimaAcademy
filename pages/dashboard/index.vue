<template>
  <div>
    <title-bar :title="pageTitle" />
    <div class="grid grid-cols-2 gap-4">
      <div class="p-5 bg-white rounded-lgplus">
        <HchartDonatChart :seriesData="dataSeriesDonut.seriesData" :seriesName="dataSeriesDonut.seriesName"
          :colors="dataSeriesDonut.colors" :legend="true" />
      </div>
      <div class="p-5 bg-neutral-200 rounded-lg-plus shadow-2xl rounded-2xl">
        <div class="mt-4 grid grid-cols-2 gap-4">
          <!-- Card Documents Unverified -->
          <div @click="showTable('unverifiedDocuments')"
            class="hover:bg-red-700 transition duration-500 ease-out max-w-xs w-50 h-40 aspect-w-1 aspect-h-1 bg-white p-4 shadow-2xl rounded-lg flex flex-col items-center cursor-pointer group">
            <!-- icon  -->
            <div
              class="bg-primary rounded-full w-12 h-12 flex items-center justify-center mb-4 cursor-pointer group-hover:bg-white transition duration-500 ease-out">
              <img :src="`/${icon_Doc}`" class="w-8 group-hover:filter group-hover:invert" />
            </div>
            <h2 class="font-bold text-xl cursor-pointer group-hover:text-white">Unverified Documents</h2>
            <p class="mt-2 text-lg text-gray-600">Jumlah: {{ unverifiedDocuments.length }}</p>
          </div>

          <!-- Card Test Parameter Unverified -->
          <div @click="showTable('unverifiedTests')"
            class="hover:bg-red-700 transition duration-500 ease-out max-w-xs w-50 h-40 aspect-w-1 aspect-h-1 bg-white p-4 shadow-2xl rounded-lg flex flex-col items-center cursor-pointer group">
            <!-- icon  -->
            <div
              class="bg-primary rounded-full w-12 h-12 flex items-center justify-center mb-4 cursor-pointer group-hover:bg-white transition duration-500 ease-out">
              <img :src="`/${icon_Task}`" class="w-8 group-hover:filter group-hover:invert" />
            </div>
            <h2 class="font-bold text-xl cursor-pointer group-hover:text-white">Unverified Test Parameters</h2>
            <p class="mt-2 text-lg text-gray-600">Jumlah: {{ unverifiedTests.length }}</p>
          </div>

          <!-- Card Tasks Unverified -->
          <div @click="showTable('unverifiedTasks')"
            class="hover:bg-red-700 transition duration-500 ease-out max-w-xs w-50 h-40 aspect-w-1 aspect-h-1 bg-white p-4 shadow-2xl rounded-lg flex flex-col items-center cursor-pointer group">
            <!-- icon  -->
            <div
              class="bg-primary rounded-full w-12 h-12 flex items-center justify-center mb-4 cursor-pointer group-hover:bg-white transition duration-500 ease-out">
              <img :src="`/${icon_Param}`" class="w-8 group-hover:filter group-hover:invert" />
            </div>
            <h2 class="font-bold text-xl cursor-pointer group-hover:text-white">Unverified Tasks</h2>
            <p class="mt-2 text-lg text-gray-600">Jumlah: {{ unverifiedTasks.length }}</p>
          </div>

          <!-- Card Players -->
          <div @click="showTable('players')"
            class="hover:bg-red-700 transition duration-500 ease-out max-w-xs w-50 h-40 aspect-w-1 aspect-h-1 bg-white p-4 shadow-2xl rounded-lg flex flex-col items-center cursor-pointer group">
            <!-- icon  -->
            <div
              class="bg-primary rounded-full w-12 h-12 flex items-center justify-center mb-4 cursor-pointer group-hover:bg-white transition duration-500 ease-out">
              <img :src="`/${icon_Player}`" class="w-8 group-hover:filter group-hover:invert" />
            </div>
            <h2 class="font-bold text-xl cursor-pointer group-hover:text-white">Pemain</h2>
            <p class="mt-2 text-lg text-gray-600">Jumlah: {{ players.length }}</p>
          </div>

          <!-- Card Coaches -->
          <div @click="showTable('coaches')"
            class="hover:bg-red-700 transition duration-500 ease-out max-w-xs w-50 h-40 aspect-w-1 aspect-h-1 bg-white p-4 shadow-2xl rounded-lg flex flex-col items-center cursor-pointer group">
            <!-- icon  -->
            <div
              class="bg-primary rounded-full w-12 h-12 flex items-center justify-center mb-4 cursor-pointer group-hover:bg-white transition duration-500 ease-out">
              <img :src="`/${icon_Coach}`" class="w-8 group-hover:filter group-hover:invert" />
            </div>
            <h2 class="font-bold text-xl cursor-pointer group-hover:text-white">Pelatih</h2>
            <p class="mt-2 text-lg text-gray-600">Jumlah: {{ coaches.length }}</p>
          </div>

          <!-- Card Class -->
          <div @click="showTable('kelas')"
            class="hover:bg-red-700 transition duration-500 ease-out max-w-xs w-50 h-40 aspect-w-1 aspect-h-1 bg-white p-4 shadow-2xl rounded-lg flex flex-col items-center cursor-pointer group">
            <!-- icon  -->
            <div
              class="bg-primary rounded-full w-12 h-12 flex items-center justify-center mb-4 cursor-pointer group-hover:bg-white transition duration-500 ease-out">
              <img :src="`/${icon_Doc}`" class="w-8 group-hover:filter group-hover:invert" />
            </div>
            <h2 class="font-bold text-xl cursor-pointer group-hover:text-white">Kelas</h2>
            <p class="mt-2 text-lg text-gray-600">Jumlah: {{ classes.length }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <!-- Dokumen -->
      <button v-if="currentTable === 'unverifiedDocuments'" @click="goToVerificationDocList"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Lihat Semua Dokumen
      </button>
      <table v-if="currentTable === 'unverifiedDocuments'" class="table-auto">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Dokumen</th>
            <th>Nama Pengirim</th>
            <th>Tanggal Dibuat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(doc, index) in unverifiedDocuments.slice(0, 11)" :key="doc.id">
            <td v-if="index < 10">{{ index + 1 }}</td>
            <td v-if="index < 10">{{ doc.name_document }}</td>
            <td v-if="index < 10">{{ doc.fullname }}</td>
            <td v-if="index < 10">{{ formatDate(doc.tgl_dibuat) }}</td>
            <td v-if="index < 10">
              <span v-if="doc.status_doc == 1">Diterima</span>
              <span v-else>Menunggu</span>
            </td>
          </tr>
          <tr>
            <td colspan="5" @click="goToVerificationDocList" class="cursor-pointer hover:bg-gray-100 text-blue-500">
              Untuk melihat detail data harap menuju halaman ini
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Tugas -->
      <button v-if="currentTable === 'unverifiedTasks'" @click="goToVerificationTaskList"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Lihat Semua Tugas
      </button>
      <table v-if="currentTable === 'unverifiedTasks'" class="table-auto">
        <thead>
          <tr>
            <th>No.</th>
            <th>Kelas</th>
            <th>Nama Pengirim</th>
            <th>Tanggal Dibuat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in unverifiedTasks.slice(0, 10)" :key="task.id">
            <td v-if="index < 10">{{ index + 1 }}</td>
            <td v-if="index < 10">{{ task.kelas }}</td>
            <td v-if="index < 10">{{ task.fullname }}</td>
            <td v-if="index < 10">{{ formatDate(task.tgl_dibuat) }}</td>
            <td>
              <span v-if="task.status_tugas == 1">Diterima</span>
              <span v-else>Diajukan</span>
            </td>
          </tr>
          <tr>
            <td colspan="5" @click="goToVerificationTaskList" class="cursor-pointer hover:bg-gray-100 text-blue-500">
              Untuk melihat detail data harap menuju halaman ini
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Test Parameter -->
      <button v-if="currentTable === 'unverifiedTests'" @click="goToVerificationTestsList"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Lihat Semua Tes
      </button>
      <table v-if="currentTable === 'unverifiedTests'" class="table-auto">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Pengirim</th>
            <th>Tanggal Dibuat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(test, index) in unverifiedTests.slice(0, 10)" :key="test.id">
            <td v-if="index < 10">{{ index + 1 }}</td>
            <td v-if="index < 10">{{ test.fullname }}</td>
            <td v-if="index < 10">{{ test.tgl_dibuat }}</td>
            <td v-if="index < 10">
              <span v-if="test.status_param == 1">Diterima</span>
              <span v-else>Menunggu</span>
            </td>
          </tr>
          <tr>
            <td colspan="5" @click="goToVerificationTestsList" class="cursor-pointer hover:bg-gray-100 text-blue-500">
              Untuk melihat detail data harap menuju halaman ini
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pemain -->
      <button v-if="currentTable === 'players'" @click="goToUsers"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Lihat Semua Pemain
      </button>
      <table v-if="currentTable === 'players'" class="table-auto">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Pemain</th>
            <th>Jenis Kelamin</th>
            <th>No Telepon</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in players.slice(0, 10)" :key="player.id">
            <td v-if="index < 10">{{ index + 1 }}</td>
            <td v-if="index < 10">{{ player.fullname }}</td>
            <td v-if="index < 10">{{ player.jenis_kelamin }}</td>
            <td v-if="index < 10">{{ player.phone_number }}</td>
            <td v-if="index < 10">{{ player.email }}</td>
          </tr>
          <tr>
            <td colspan="5" @click="goToUsers" class="cursor-pointer hover:bg-gray-100 text-blue-500">
              Untuk melihat detail data harap menuju halaman ini
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pelatih -->
      <button v-if="currentTable === 'coaches'" @click="goToUsers"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Lihat Semua Pelatih
      </button>
      <table v-if="currentTable === 'coaches'" class="table-auto">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Pelatih</th>
            <th>No Telepon</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(coach, index) in coaches.slice(0, 10)" :key="coach.id">
            <td v-if="index < 10">{{ index + 1 }}</td>
            <td v-if="index < 10">{{ coach.fullname }}</td>
            <td v-if="index < 10">{{ coach.phone_number }}</td>
            <td v-if="index < 10">{{ coach.email }}</td>
          </tr>
          <tr>
            <td colspan="5" @click="goToUsers" class="cursor-pointer hover:bg-gray-100 text-blue-500">
              Untuk melihat detail data harap menuju halaman ini
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Kelas -->
      <button v-if="currentTable === 'kelas'" @click="goToKelas"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Lihat Semua Kelas
      </button>
      <table v-if="currentTable === 'kelas'" class="table-auto">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Kelas</th>
            <th>Tipe Kelas</th>
            <th>Level Kelas</th>
            <th>Kategori</th>
            <th>Status Kelas</th>
            <th>Jumlah Video</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(kelas, index) in classes.slice(0, 10)" :key="kelas.id">
            <td v-if="index < 10">{{ index + 1 }}</td>
            <td v-if="index < 10">{{ kelas.nama_kelas }}</td>
            <td v-if="index < 10">
              <span v-if="kelas.isPremium == 1">Gratis</span>
              <span v-else-if="kelas.isPremium == 2">Premium</span>
            </td>
            <td v-if="index < 10">{{ kelas.level_kelas }}</td>
            <td v-if="index < 10">{{ kelas.kategori_kelas }}</td>
            <td v-if="index < 10">
              <span v-if="kelas.status_kelas == 1">Aktif</span>
              <span v-else-if="kelas.status_kelas == 2">Non Aktif</span>
            </td>
            <td v-if="index < 10">{{ kelas.videos.length }}</td>
          </tr>
          <tr>
            <td colspan="5" @click="goToKelas" class="cursor-pointer hover:bg-gray-100 text-blue-500">
              Untuk melihat detail data harap menuju halaman ini
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TitleBar from '~/components/TitleBar.vue';
import axios from 'axios';
import HchartDonatChart from '~/components/hchart/donatChart.vue';

export default {
  components: { TitleBar, HchartDonatChart },
  layout: 'admin',
  data() {
    return {
      pageTitle: 'Dashboard',
      subtitle: new Date(),
      dataSeries: [
        {
          name: 'Overview - Total Konten',
          data: [100, 25, 75],
          totalData: 200,
        },
      ],
      dataSeriesDonut: {
        seriesData: [],
        seriesName: 'Overview - Total Konten',
        colors: [
          '#C0392B',
          '#633974',
          '#21618C',
          '#1E8449',
          '#D4AC0D',
          '#D5F5E3',
          '#5DADE2',
        ],
      },
      currentTable: null,
      unverifiedDocuments: [],
      unverifiedTasks: [],
      unverifiedTests: [],
      players: [],
      coaches: [],
      classes: []
    };
  },
  props: {
    title: {
      type: String,
      default: 'Dashboard',
    },
    icon_Doc: {
      type: String,
      default: 'paper.svg',
    },
    icon_Param: {
      type: String,
      default: 'testparam.svg',
    },
    icon_Coach: {
      type: String,
      default: 'icon_coach.svg',
    },
    icon_Task: {
      type: String,
      default: 'icon-task.svg',
    },
    icon_Player: {
      type: String,
      default: 'icon_player.svg',
    },
    to: {
      type: String,
      default: '',
    },
  },
  mounted() {
    const user = localStorage.getItem('user');
    if (!user) {
      // Redirect to login if no user data is found
      this.$router.push('/login');
    }
    this.getDataStats();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('id-ID', options);
    },
    async getDataStats() {
      try {
        const [documentsResponse, usersResponse, tasksResponse, paramsResponse, classesResponse] = await Promise.all([
          axios.get('https://6672a1756ca902ae11b1155d.mockapi.io/api/secure-documents'),
          axios.get('https://6662bec962966e20ef09d5d2.mockapi.io/api/users'),
          axios.get('https://6662bec962966e20ef09d5d2.mockapi.io/api/tasks'),
          axios.get('https://6672a1756ca902ae11b1155d.mockapi.io/api/test-parameter'),
          axios.get('https://667994bf18a459f6395091e1.mockapi.io/api/class'),
        ]);

        const documents = documentsResponse.data;
        const users = usersResponse.data;
        const tasks = tasksResponse.data;
        const params = paramsResponse.data;
        const classes = classesResponse.data;

        // Filter documents that are unverified
        this.unverifiedDocuments = documents.filter(doc => doc.status_doc !== 1 && doc.status_doc !== 2);

        // Separate users into players and coaches
        this.players = users.filter(user => user.user_role === 2);
        this.coaches = users.filter(user => user.user_role === 3);

        // Filter Task that are unverified
        this.unverifiedTasks = tasks.filter(task => task.status_tugas !== 1 && task.status_tugas !== 2);

        // Filter Test Parameter that are unverified
        this.unverifiedTests = params.filter(param => param.status_param !== 1 && param.status_param !== 2);

        // Calculate the total count
        const totalDocuments = documents.length;
        const totalPlayers = this.players.length;
        const totalCoaches = this.coaches.length;
        const totalTasks = tasks.length;
        const totalTests = params.length;
        const totalClasses = classes.length;

        // Update dataSeries with the new totals
        this.dataSeries = [
          {
            name: 'Dokumen',
            totalData: totalDocuments,
          },
          {
            name: 'Pemain',
            totalData: totalPlayers,
          },
          {
            name: 'Pelatih',
            totalData: totalCoaches,
          },
          {
            name: 'Tugas',
            totalData: totalTasks,
          },
          {
            name: 'Tes Parameter',
            totalData: totalTests,
          },
          {
            name: 'Kelas',
            totalData: totalClasses,
          },
        ];

        // Prepare data for the donut chart
        this.dataSeriesDonut.seriesData = [
          { name: 'Dokumen', y: totalDocuments },
          { name: 'Pemain', y: totalPlayers },
          { name: 'Pelatih', y: totalCoaches },
          { name: 'Tugas', y: totalTasks },
          { name: 'Tes Parameter', y: totalTests },
          { name: 'Kelas', y: totalClasses },
        ];

        // Simpan data kelas ke state
        this.classes = classes;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    showTable(table) {
      this.currentTable = table;
    },

    goToVerificationDocList() {
      this.$router.push('/verification/doc-list');
    },
    goToVerificationTaskList() {
      this.$router.push('/verification/task');
    },
    goToVerificationTestsList() {
      this.$router.push('/verification/test-parameter');
    },
    goToUsers() {
      this.$router.push('/users');
    },
    goToKelas() {
      this.$router.push('/class');
    },
  },
  middleware: 'auth'
};
</script>


<style>
.text-lg {
  font-size: 1.25rem;
  /* Ubah ukuran font sesuai kebutuhan */
}

.btn {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.table-auto {
  width: 100%;
  border-collapse: collapse;
}

.table-auto th,
.table-auto td {
  border: 1px solid #ddd;
  padding: 0.5rem;
}

.table-auto th {
  background-color: #f2f2f2;
}

.group-hover\:bg-white {
  background-color: #b91c1c;
}

.group-hover\:text-white {
  color: black;
}

.group-hover\:filter {
  filter: invert(100%);
}

.group-hover\:invert {
  filter: invert(100%);
}
</style>
