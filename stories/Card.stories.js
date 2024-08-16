import Card from '~/components/Card.vue'

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    position: {
      options: ['right', 'left'],
      control: { type: 'radio' }
    },
  }
}

const Template = (args, { argTypes }) => ({
  components: { Card },
  props: Object.keys(argTypes),
  template: '<card v-bind="$props" />'
})

export const Default = Template.bind({})

export const CardTitle = Template.bind({})
CardTitle.args = {
  title: 'Card Title',
}
export const CardActions = (args, { argTypes }) => ({
  // components: { Card },
  props: Object.keys(argTypes),
  template: '<card v-bind="$props" ><template #actions><tombol-button>button</tombol-button> </template></card>'
})
CardActions.args = {
  title: 'Card Title',
}

