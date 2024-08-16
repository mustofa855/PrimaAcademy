<template>
    <div tabindex="1" style="" class="font-lato">
      <transition name="fadefast">
        <div v-if="statModal" aria-hidden="true"
          class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-40 w-full h-full flex justify-center bg-gray-800/[.7]">
          <div v-click-outside="persistentAction" :class="width ? width : 'w-full lg:w-2/3'"
            class="fixed p-0 lg:p-4 z-20 lg:h-auto">
            <div :style="{ height: height ? height : 'h-[520px]' }" class="relative bg-white lg:rounded-lg shadow lg:px-6 px-5 py-10">
              <div class="flex items-center rounded-t ">
                <h3 class="flex-auto text-xl md:text-2xlplus text-center leading-8 font-lato text-warna-empat"
                  :class="show ? 'pl-[26px]' : 'pl-0'">
                  {{ title }} {{ getUsername() }}
                </h3>
                <button v-if="show" @click="tutupModal" class="flex-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
  
              <hr class="border-warna-lima my-4">
              <slot />
              <slot name="footer" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    props: ['value', 'title', 'persistent', 'width', 'height', 'show', 'username'],
    data() {
      return {
        statModal: false
      }
    },
    mounted() {
      this.initialize();
    },
    methods: {
      initialize() {
        this.statModal = this.value
      },
      tutupModal() {
        this.statModal = false
        this.$emit('input', false)
      },
      persistentAction() {
        if (this.persistent && this.persistent === true) {
          console.log("a")
        } else {
          this.tutupModal()
        }
      },
      getUsername() {
        return this.username ? ` - ${this.username}` : ''; // Kembalikan username jika prop username ada
      },
    },
  }
  </script>
  
  <style scoped>
  .modal-enter-active, .modal-leave-active {
    transition: opacity 0.5s;
  }
  
  /* Kondisi awal dan akhir dari animasi */
  .modal-enter, .modal-leave-to /* .modal-leave-active di versi Vue sebelumnya */ {
    opacity: 0;
  }
  </style>
  