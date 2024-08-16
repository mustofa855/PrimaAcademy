<template>
  <div class="px-4 py-3 flex items-center justify-between sm:px-6">
    <!-- button mobile -->
    <div class="flex-1 flex justify-between sm:hidden">
      <a
        href="#"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        @click.prevent="prevPage"
      >Sebelumnya</a>
      <a
        href="#"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        @click.prevent="nextPage"
      >Selanjutnya</a>
    </div>

    <!-- button desktop -->
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Menampilkan
          <span class="font-medium">{{ pagination.from }}</span>
          -
          <span class="font-medium">{{ pagination.to }}</span>
          dari
          <span class="font-medium">{{ pagination.total }}</span>
        </p>
      </div>
      <div>
        <nav
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            @click.prevent="firstPage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            @click.prevent="prevPage"
          >
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <!-- loop button -->
          <div v-for="(page, index) in pages" :key="index" class="inline-flex">
            <button
              aria-current="page"
              :class="page === pagination.current_page ? active : noActive"
              :disabled="page === pagination.current_page"
              @click.prevent="$emit('paginate', page)"
            >{{ page }}</button>
          </div>
          <button
            class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            @click.prevent="nextPage"
          >
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            @click.prevent="lastPage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default: () => ({
        current_page: 1,
        first_page_url: '',
        from: 0,
        last_page: 1,
        last_page_url: '',
        next_page_url: null,
        path: '',
        per_page: 10,
        prev_page_url: null,
        to: 0,
        total: 0,
      }),
    },
  },
  data() {
    return {
      active: `
              z-10
              bg-indigo-50
              border-primary
              text-primary
              relative
              inline-flex
              items-center
              px-4
              py-2
              border
              text-sm
              font-medium
            `,
      noActive: `
              bg-white
              border-gray-300
              text-gray-500
              hover:bg-gray-50
              relative
              inline-flex
              items-center
              px-4
              py-2
              border
              text-sm
              font-medium
            `,
      maxPaginate: 5,
    }
  },
  computed: {
    pages() {
      const numShown = Math.min(this.maxPaginate, this.pagination.last_page)
      let first = this.pagination.current_page - Math.floor(numShown / 2)
      if (first < 1) first = 1
      let last = first + numShown - 1
      if (last > this.pagination.last_page) {
        last = this.pagination.last_page
        first = last - numShown + 1
      }
      return Array(last - first + 1).fill(0).map((_, index) => index + first)
    },
  },
  methods: {
    nextPage() {
      if (this.pagination.current_page < this.pagination.last_page) {
        this.$emit('paginate', this.pagination.current_page + 1)
      }
    },
    prevPage() {
      if (this.pagination.current_page > 1) {
        this.$emit('paginate', this.pagination.current_page - 1)
      }
    },
    firstPage() {
      if (this.pagination.current_page !== 1) {
        this.$emit('paginate', 1)
      }
    },
    lastPage() {
      if (this.pagination.current_page !== this.pagination.last_page) {
        this.$emit('paginate', this.pagination.last_page)
      }
    },
  },
}
</script>

<style></style>
