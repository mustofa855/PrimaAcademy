<template>
    <div>
      <title-bar :title="title"/>
    </div>
  </template>
  
  <script>
  import TitleBar from '~/components/VerifyPage.vue'
  export default {
    components: { TitleBar },
    layout: 'admin',
    data() {
      return {
        title: 'Verification',
        subtitle: "Anda dapat melakukan verifikasi pada halaman ini. Anda dapat memilih menu di bawah ini.",
      }
    },
    methods: {
    },
  }
  </script>
  