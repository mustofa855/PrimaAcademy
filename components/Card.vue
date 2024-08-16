<template>
  <!-- card section -->
  <div class="bg-white shadow-md rounded-md p-4 px-4" @click="$emit('click')">
    <!-- content section -->
    <CardTitle v-if="title">{{ title }}</CardTitle>
    <slot />
    <div class :class="`text-${position}`">
      <slot name="actions" />
    </div>
  </div>
</template>
<script>
import CardTitle from './CardTitle.vue'
export default {
  name: 'Card',
  components: { CardTitle },
  props: {
    title: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: 'right',
    },
  },
}
</script>
