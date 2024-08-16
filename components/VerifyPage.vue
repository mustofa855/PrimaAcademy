<template>
  <div>
    <title-bar :title="title" />
    <div class="flex flex-wrap gap-4">
      <!-- Card Dokumen -->
      <div
        class=" Document-Verification hover:bg-gray-100 duration-200 ease-out transition max-w-xs w-80 bg-white p-4 shadow-md rounded-lg  flex items-center cursor-pointer"
        :class="to === '/verification' ? 'cursor-pointer' : ''" @click="toPage('/verification/doc-list/')">
        <!-- icon  -->
        <div class="bg-primary rounded-full w-12 h-12 flex mr-4">
          <img :src="(`/${icon_Doc}`)" class="m-auto w-8" />
        </div>
        <h2 class="font-bold text-xl cursor-pointer">Dokumen</h2>
      </div>

      <!-- Card Test Parameter  -->
      <div
        class="hover:bg-gray-100 duration-200 ease-out transition max-w-xs w-80 bg-white p-4 shadow-md rounded-lg flex items-center cursor-pointer"
        :class="to === '/verification' ? 'cursor-pointer' : ''" @click="toPage('/verification/test-parameter')">
        <!-- icon   -->
        <div class="bg-primary rounded-full w-12 h-12 flex mr-4">
          <img :src="(`/${icon_Param}`)" class="m-auto w-8" />
        </div>
        <h2 class="font-bold text-xl cursor-pointer"><a href=""></a>Test Parameter</h2>
      </div>

      <!-- Card Test Tugas  -->
      <div
        class="hover:bg-gray-100 duration-200 ease-out transition max-w-xs w-80 bg-white p-4 shadow-md rounded-lg flex items-center cursor-pointer"
        :class="to === '/verification' ? 'cursor-pointer' : ''" @click="toPage('/verification/task')">
        <!-- icon   -->
        <div class="bg-primary rounded-full w-12 h-12 flex mr-4">
          <img :src="(`/${icon_Task}`)" class="m-auto w-8" />
        </div>
        <h2 class="font-bold text-xl cursor-pointer"><a href=""></a>Verifikasi Tugas</h2>
      </div>
    </div>
  </div>
</template>

  
<script>
export default {
  // components: { TombolButton },
  props: {
    /**
     * Title of the card
     * @type {String}
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * icon from static folder use the extension name
     * @type {String}
     * @default paper.svg
     */
    icon_Doc: {
      type: String,
      default: 'paper.svg',
    },
    icon_Part: {
      type: String,
      default: 'partner.svg',
    },
    icon_Param: {
      type: String,
      default: 'testparam.svg',
    },
    icon_Task: {
      type: String,
      default: 'icon-task.svg',
    },
    to: {
      type: String,
      default: '',
    },
  },
  methods: {
    toPage(route) {

      this.$router.push(route)
      // Implement your navigation logic here using the 'route' prop
      // For example, you can use Vue Router to navigate to the specified route.
    },
  },
}
</script>
  
<style lang="scss" scoped></style>
  