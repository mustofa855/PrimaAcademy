<template>
  
  <button 
    :class="[
        'p-2 px-4 text-white rounded-md shadow-md duration-200 ease-out transition relative group',
        disabled ? '!bg-gray-300 hover:cursor-not-allowed' : '',
        dense ? 'p-2 px-2' : '',
        text ? `!text-${color} !bg-transparent shadow-none hover:text-${color}-shade` : '',
        color === 'secondary' ? 'bg-secondary hover:bg-secondary-shade' : '',
        color === 'primary' ? 'bg-primary hover:bg-primary-shade' : '',
        color === 'success' ? 'bg-success hover:bg-success-shade' : '',
    ]"
    @click="click()"
>
    <span v-if="tooltip" 
        class="absolute object-top bg-gray-900 rounded-md p-2 text-xs -top-9 w-max -translate-x-1/2 mx-auto invisible group-hover:visible"
    >{{ tooltip }}</span>
    <slot></slot>
    <!-- <router-link v-if="to" :to="to"></router-link> -->
</button>

</template>
<script>
export default {
  props: {
    to: {
      type: [String, Object],
      default: '',
    },
    dense: {
      type: Boolean,
      default: false,
    },
    fontBold: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
  methods: {
    click() {
      this.$emit('click')
    },
  },
}
</script>
