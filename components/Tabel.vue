<template>
  <div>
    <table class="w-full">
      <!-- create table head -->
      <thead>
        <!-- extra head / double head -->
        <tr v-if="extraHeader" class="bg-primary text-left text-white !rounded-xl">
          <th
            v-for="(item, index) in extraHeaderTable"
            :key="index"
            :colspan="item.colspan"
            class="py-2 px-4"
          >{{ item.text }}</th>
        </tr>
        <!-- primary head -->
        <tr class="bg-primary text-left text-white !rounded-xl">
          <th v-for="(item, index) in headerTable" :key="index" class="py-2 px-4">{{ item.text }}</th>
        </tr>
      </thead>

      <tbody>
        <!-- start data table -->
        <tr
          v-for="(item, index) in data"
          :key="index"
          class="bg-white px-4"
          :class="index % 2 == 0 ? '' : 'bg-gray-100'"
        >
          <td
            v-for="(itemHeader, indexHeader) in headerTable"
            :key="indexHeader"
            class="p-2 border-border-b-2 px-4"
          >
            <slot
              :name="itemHeader.key"
              v-bind="{ index, indexHeader, itemHeader, item }"
            >{{ item[itemHeader.key] }}</slot>
          </td>
        </tr>
        <!-- end data table -->
      </tbody>
    </table>
    <!-- start loading -->
    <div v-if="isLoading" class="m-4 flex justify-center justify-items-center items-center">
      <div
        class="ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8 border-t-primary animate-spin"
      ></div>
      <p class="font-semibold mx-2">Tunggu Sebentar</p>
    </div>
    <div v-if="setTimeout" class="font-semibold m-4 text-center">Data Tidak Ditemukan</div>
    <!-- end loading -->
  </div>
</template>

<script>
export default {
  props: {
    headerTable: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    extraHeader: {
      type: Boolean,
      default: false,
    },
    extraHeaderTable: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      setTimeout: false,
      isLoading: false,
    };
  },
  watch: {
    data: {
      handler(e) {
        if (e) {
          this.timeOut(false)
        } else {
          this.loading();
        }
      },
      deep: true,
    },
    isLoading: {
      handler(e) {
        // eslint-disable-next-line no-console
        console.log(e);
        if (e) {
          this.setTimeout = false;
        } else if (this.data.length === 0 && !e) {
          this.setTimeout = true;
        }
      }
    },
  },
  mounted() {
    this.loading()
  },
  methods: {
    loading(e) {
      // check if data not empty
      if (this.data.length > 0) {
        this.timeOut()
        this.isLoading = e || false
      }
      // check if data empty
      else {
        this.timeOut(true)
        this.isLoading = e || true
      }
    },
    timeOut(e) {
      // check time out
      if (e) {
        setTimeout(() => {
          this.isLoading = false
        }, 3000);
      }
      // if data avaliable
      else {
        clearTimeout();
        this.isLoading = false
      }
    },
  },
}
</script>

<style>
</style>
