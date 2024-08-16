<template>
  <transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="modal-overlay absolute w-full h-full bg-gray-800 opacity-80" @click="closeModal"></div>

      <div class="modal-container bg-white w-[1000px] h-[700px] mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
        <div class="modal-content py-4 text-left px-8">
          <!-- Modal Header -->
          <div class="flex justify-between items-center pb-3">
            <h3 class="text-3xl font-bold">{{ title }}</h3>
            <button @click="closeModal" class="modal-close cursor-pointer z-50">
              <span class="text-3xl">&times;</span>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="mb-4">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
  watch: {
    show(newValue) {
      if (!newValue) {
        this.closeModal();
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  background: rgba(0, 0, 0, 0.7);
}

.modal-container {
  max-height: 100%;
}

.modal-content {
  overflow: auto;
  max-height: 700px;
}

.modal-close {
  transition: all 0.3s;
}
</style>
