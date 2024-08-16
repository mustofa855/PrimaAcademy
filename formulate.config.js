// formulate.config.js
// import { id } from '@braid/vue-formulate-i18n'

export default {
  // plugins: [id],
  // locale: 'id',
  // rules: {
  //   foobar: ({ value }) => ['foo', 'bar'].includes(value),
  // },
  classes: {
    outer: 'mb-4',
    input(contex) {
      switch (contex.classification) {
        case 'checkbox':
          return '';
        case 'image':
          return '';
        // default:
        //   return 'border border-gray-400 rounded-lg px-3 py-2 focus:border-primary outline-none border-box w-full duration-200 ease-out transition'
        default:
          return 'border border-gray-400 rounded-lg px-3 py-2 focus:border-primary outline-none border-box w-full duration-200 ease-out transition';
      }
    },
    fileImagePreview: 'max-h-96',
    label: 'font-semibold',
    errors: 'text-danger',
  },
}
