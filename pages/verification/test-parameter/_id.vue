<template>
    <div>
        <!-- Loading Spinner -->
        <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>

        <!-- Title Bar -->
        <title-bar is-controlbar :title="'Detail Test Parameter'"
            :subtitle="'Pada halaman ini Anda dapat melihat detail test parameter'" />

        <!-- Tombol Kembali -->
        <div class="flex mb-4">
            <tombol-button @click="$router.push('/verification/test-parameter')"
                class="bg-success text-white kembali-button">
                Kembali ke Daftar Test
            </tombol-button>
        </div>

        <!-- Tampilan Video -->
        <div v-if="videoPlay" ref="videoSection" class="mb-6">
            <iframe width="100%" height="500" :src="videoPlay" frameborder="0" allowfullscreen></iframe>
        </div>

        <!-- Tab header -->
        <div v-if="performanceData">
            <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row sm:gap-y-2">
                <li v-for="category in performanceData['performance-test'].performance_category" :key="category.id"
                    @click="selectedCategory = category.name" class="mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-base uppercase font-bold px-5 py-3 shadow-xl rounded block leading-normal cursor-pointer "
                        :class="{
            'text-gray-900 bg-white transition duration-300 hover:bg-gray-200': selectedCategory !== category.name,
            'selected-category text-white bg-700': selectedCategory === category.name
        }">
                        {{ category.name }}
                    </a>
                </li>
            </ul>
        </div>

        <!-- Tab Form -->
        <div v-if="performanceData"
            class="relative py-3 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-5">
            <div class="flex border-gray-900/10 relative">
                <div class="relative text-base font-semibold text-gray-900 py-1 pr-10">
                    <h5 class="text-lg font-semibold mb-2">{{ performanceData.fullname }}</h5>
                    <h5 class="text-lg font-semibold mb-2">Rekomendasi : {{ performanceData.recommendeds }}</h5>
                    <div v-if="performanceData.status_param !== 1"
                        class="relative top-0 left-0 bg-gray-200 rounded-md py-1 my-2 px-2 w-[600px] tooltip-container cursor-pointer">
                        <select v-model="rekomendasi"
                            class="styled-select w-full px-4 py-2 text-base border rounded-lg cursor-pointer"
                            placeholder="Pilih Rekomendasi">
                            <option disabled value="">Pilih Rekomendasi</option>
                            <option v-for="option in recom" :key="option" :value="option">{{ option }}</option>
                        </select>
                        <span class="tooltiptext">Pilih Rekomendasi</span>
                    </div>
                    <h5 class="text-lg font-semibold mb-2">Status Verifikasi : <span
                            class="text-yellow-500 text-lg font-semibold">{{
            getStatusParam(performanceData.status_param) }}</span></h5>
                </div>
            </div>
            <div v-if="selectedCategory !== 'mental'" v-for="test in getTestsByCategory(selectedCategory)"
                :key="test.name" class="my-2">
                <label :for="test.name" class="block text-xl font-medium py-2">{{ test.name }}</label>
                <div class="flex items-center space-x-2">
                    <input v-model="test.grade" :id="test.name" type="number" placeholder="Masukkan grade"
                        class="w-1/2 px-4 py-3 text-xl border rounded-lg"
                        :disabled="performanceData.status_param === 1" />
                    <button @click.prevent="playVideos(test.link_video)" v-if="test.link_video"
                        class="flex items-center bg-red-700 rounded-full hover:bg-red-800 transition duration-300 text-white p-2 text-lg"
                        title="Play Video">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="white"
                                d="M10 15.577L15.577 12L10 8.423v7.154ZM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q-1.214-1.216-2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21Z" />
                        </svg>
                        <p class="mx-2">Play Video</p>
                    </button>
                </div>
            </div>
            <div v-else>
                <!-- Handle the case when 'mental' category is selected -->
                <div class="text-xl font-semibold text-gray-900 py-1 pr-10">
                    <h5>Skor: </h5>
                </div>
                <div class="text-5xl font-semibold rounded-md py-1 px-2 pl-10 pb-5 text-green-500">
                    <p>{{ performanceData['performance-test'].performance_category.find(cat => cat.name ===
            'mental').tests[0].mental_score }}</p> <!-- Tampilkan disini  -->
                </div>
                <div class="text-xl font-semibold text-gray-900 py-1 pr-10">
                    <h5>Rating Anxiety: </h5>
                </div>
                <div class="text-5xl font-semibold rounded-md py-1 px-2 pl-10 pb-5 text-green-500">
                    <p>{{ performanceData['performance-test'].performance_category.find(cat => cat.name ===
            'mental').tests[0].anxiety_score }}</p> <!-- Tampilkan disini  -->
                </div>
                <div class="flex items-center space-x-2">
                    <input
                        v-model="performanceData['performance-test'].performance_category.find(cat => cat.name === 'mental').tests[0].anxiety_score"
                        type="number" placeholder="Rating nilai anxiety"
                        class="w-1/2 px-4 py-3 text-3xl border rounded-lg" />
                </div>
                <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row sm:gap-y-2 ">
                    <li class="mb-px border-2 mr-2 last:mr-0 flex-auto text-center rounded-xl">
                        <a class="text-base font-bold uppercase px-5 py-3 shadow-lg rounded-xl block leading-normal cursor-pointer "
                            :title="'Sub Tab 1 dalam Mental'" v-on:click="toggleSubTabs(1)"
                            v-bind:class="{ 'text-gray-900 bg-white': subTab !== 1, 'text-white bg-red-700': subTab === 1 }">
                            1-16 = Low Level Anxiety
                        </a>
                    </li>
                    <li class="mb-px border-2 mr-2 last:mr-0 flex-auto text-center rounded-xl">
                        <a class="text-base font-bold uppercase px-5 py-3 shadow-lg rounded-xl block leading-normal cursor-pointer "
                            :title="'Sub Tab 2 dalam Mental'" v-on:click="toggleSubTabs(2)"
                            v-bind:class="{ 'text-gray-900 bg-white': subTab !== 2, 'text-white bg-red-700': subTab === 2 }">
                            17-24 = Average Level Anxiety
                        </a>
                    </li>
                    <li class="mb-px border-2 mr-2 last:mr-0 flex-auto text-center rounded-xl">
                        <a class="text-base font-bold uppercase px-5 py-3 shadow-lg rounded-xl block leading-normal cursor-pointer "
                            :title="'Sub Tab 3 dalam Mental'" v-on:click="toggleSubTabs(3)"
                            v-bind:class="{ 'text-gray-900 bg-white': subTab !== 3, 'text-white bg-red-700': subTab === 3 }">
                            >25 = High Level Anxiety
                        </a>
                    </li>
                </ul>
                <div>
                    <div v-show="subTab === 1">
                        <table class="w-full border-collapse text-center border border-black">
                            <thead class="border border-black">
                                <tr class="bg-red-700 border border-black">
                                    <th class="py-2 text-xl px-4 text-center border border-black">Skor</th>
                                    <th class="py-2 text-xl px-4 text-center border border-black">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="index in 16" :key="index" class="border-t">
                                    <td class="py-2 text-xl px-4 border border-black">{{ index }}</td>
                                    <td class="py-2 text-xl px-4 border border-black">{{ 100 - (index - 1) * 2 }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-show="subTab === 2">
                        <table class="w-full border-collapse text-center border border-black">
                            <thead class="border border-black">
                                <tr class="bg-red-700 border border-black">
                                    <th class="py-2 text-xl px-4 text-center border border-black">Skor</th>
                                    <th class="py-2 text-xl px-4 text-center border border-black">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="index in 8" :key="index + 16" class="border-t">
                                    <td class="py-2 text-xl px-4 border border-black">{{ index + 16 }}</td>
                                    <td class="py-2 text-xl px-4 border border-black">{{ 70 - index * 2 }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-show="subTab === 3">
                        <table class="w-full border-collapse text-center border border-black">
                            <thead class="border border-black">
                                <tr class="bg-red-700 border border-black">
                                    <th class="py-2 text-xl px-4 text-center border border-black">Skor</th>
                                    <th class="py-2 text-xl px-4 text-center border border-black">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="index in 21" :key="index + 24" class="border-t">
                                    <template v-if="index !== 10">
                                        <!-- Memeriksa agar angka 10 tidak ditampilkan -->
                                        <td class="py-2 text-xl px-4 border border-black">{{ index + 24 }}</td>
                                        <td class="py-2 text-xl px-4 border border-black">{{ 54 - index * 2 }}</td>
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div v-if="performanceData.status_param !== 1" class=" flex justify-end">
                <button @click="showVerificationAlert"
                    class="button-verifikasi text-lg font-semibold mt-6 flex items-center justify-end gap-x-6 px-6 py-3 bg-red-700 text-white transition duration-200 rounded-lg hover:bg-green-700">
                    Verifikasi
                </button>
            </div>
        </div>
    </div>
</template>


<script>
import Swal from 'sweetalert2'

export default {
    layout: 'admin',
    data() {
        return {
            subTab: 1,
            performanceData: null,
            selectedCategory: 'teknik',  // Inisialisasi dengan 'teknik'
            videoSrc: '',  // Tambahkan videoSrc jika diperlukan
            recom: [
                'Amatir',
                'SSB Tingkat Provinsi',
                'SSB Tingkat Kota',
                'Ellite Pro U17',
                'Ellite Pro U15',
                'Ellite Pro U13',
                'Ellite Pro U14',
                'Ellite Pro U16',
                'Ellite Pro U17',
                'Ellite Pro U18',
                'Ellite Pro U19',
                'Ellite Pro U20',
                'Liga 3',
                'Liga 2',
                'Liga 1',
                'Abroad Asia',
                'Abroad Eropa',
                'Belum ada rekomendasi',
            ], // Initialize with your options
            rekomendasi: '', // Bind to selected recommendation
            videoPlay: '',
        }
    },
    methods: {
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
        async fetchPerformanceData() {
            this.loading = true; // Set loading to true when starting to fetch data
            try {
                const response = await this.$axios.$get(`https://6672a1756ca902ae11b1155d.mockapi.io/api/test-parameter/${this.$route.params.id}`);
                this.performanceData = response;
                if (!this.selectedCategory) {
                    this.selectedCategory = this.performanceData['performance-test'].performance_category[0]?.name || 'teknik';
                }
            } catch (error) {
                console.error('Error fetching performance data:', error);
            } finally {
                this.loading = false; // Set loading to false when data fetching is complete
            }
        },
        getTestsByCategory(categoryName) {
            const category = this.performanceData['performance-test'].performance_category.find(cat => cat.name === categoryName);
            return category ? category.tests : [];
        },
        async submitGrades() {
            this.performanceData.recommendeds = this.rekomendasi;
            this.performanceData.status_param = 1;
            try {
                await this.$axios.$put(`https://6672a1756ca902ae11b1155d.mockapi.io/api/test-parameter/${this.$route.params.id}`, this.performanceData);
                Swal.fire('Berhasil', 'Data telah diverifikasi.', 'success');
                this.$router.push('/verification/test-parameter');
            } catch (error) {
                Swal.fire('Error', 'Terjadi kesalahan saat mengirim data.', 'error');
            }
        },
        async showVerificationAlert() {
            // Check if all grades are filled
            for (const category of this.performanceData['performance-test'].performance_category) {
                for (const test of category.tests) {
                    if (test.grade === null || test.grade === '') {
                        Swal.fire('Error', 'Harap isi semua nilai.', 'error');
                        return;
                    }
                }
            }

            // cek apakah rekomendasi sudah diisi
            if (!this.rekomendasi) {
                Swal.fire('Error', 'Harap pilih rekomendasi.', 'error');
                return;
            }

            const result = await Swal.fire({
                title: 'Apakah Anda yakin?',
                text: "Anda tidak dapat mengembalikan aksi ini!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, verifikasi!'
            });
            if (result.isConfirmed) {
                this.submitGrades();
            }
        },
        getEmbedLink(videoUrl) {
            if (!videoUrl) return '';
            const videoId = this.extractVideoId(videoUrl);
            return `https://www.youtube.com/embed/${videoId}`;
        },
        extractVideoId(videoUrl) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = videoUrl.match(regExp);
            return match && match[2].length === 11 ? match[2] : null;
        },
        isYoutubeLink(url) {
            return url.includes('youtube.com');
        },
        playVideos(link_video) {
            this.videoPlay = this.getEmbedLink(link_video);
            this.scrollToVideo();
        },
        scrollToVideo() {
            this.$nextTick(() => { // <-- Tambahkan this.$nextTick
                if (this.$refs.videoSection) { // <-- Tambahkan pengecekan apakah videoSection ada
                    this.$refs.videoSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        },
        toggleSubTabs(tabNumber) {
            this.subTab = tabNumber;
        },
    },
    created() {
        this.fetchPerformanceData();
    }
}
</script>

<style scoped>
.kembali-button:hover {
    background-color: #045C57;
}

.button-category:hover {
    background-color: #8e0303;
}

.selected-category {
    background-color: #a80000;
}

.button-verifikasi:hover {
    background-color: #8e0303;
}

.tooltip-container {
    position: relative;
    display: inline-block;
}

.tooltip-container .tooltiptext {
    visibility: hidden;
    width: 150px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.5s;
}

.tooltip-container .tooltiptext::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.tooltip-container:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}

.loader {
    border-top-color: #a80000;
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
