<template>
  <div :class="isControlbar ? 'mb-2' : 'mb-8'">
    <!-- button back -->
    <div v-if="back" class="mb-2">
      <!-- <router-link :to="goBack">Kembali</router-link> -->
      <nuxt-link
        :to="back"
        class="p-2 hover:text-white duration-200 transition ease-out hover:bg-primary rounded-md"
      >Kembali</nuxt-link>
    </div>

    <!-- bredcrumbs -->
    <breadcrumbs v-if="breadcrumbs.length > 0" :items="breadcrumbs" />

    <!-- title section -->
    <div class="text-2xl font-bold">{{ title }}</div>
    <!-- subtitle section -->
    <div class="text-gray-500">{{ subtitle ? subtitle : $moment(time).format('LLLL') }}</div>
  </div>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    back: {
      type: String,
      default: '',
    },
    isControlbar: {
      type: Boolean,
      default: false,
    },
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      time: new Date(),
    }
  },

  mounted() {
  },
}
</script>
