import webpack from 'webpack';
import axios from 'axios';

const _ = require('lodash');
require('dotenv').config();
export default {
  server: {
    port: 80,
    host: "0.0.0.0"
  },

  target: 'server', 
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Prima Academy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo-prima.svg' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/content.css',
    '~/assets/css/skin.css',
    '~/assets/css/main.css',
    '~/assets/css/inputStyle.css',
    '~/assets/scss/main.scss',
    'vue-slick-carousel/dist/vue-slick-carousel.css',
    '@/node_modules/@braid/vue-formulate/themes/snow/snow.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/persistedState.js' },
    // { src: '~/plugins/charRemove.js' },
    // { src: '~/plugins/global.js' },
    // { src: "@/plugins/vue-multiselect.js", mode: "client" },
    // { src: '~/plugins/vSelect.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',

    // vite nuxt
    // 'nuxt-vite',

    // googlefonts
    // '@nuxtjs/google-fonts',

    // vueformulate
    '@braid/vue-formulate/nuxt',
  ],

  // config formulate
  formulate: {
    configPath: '~/formulate.config.js',
  },

  // config google font
  // googleFonts: {
  //   display: 'swap',
  //   // prefetch: true,
  //   download: true,
  //   fontsPath: '~assets/fonts',
  //   prefetch: true,
  //   inject: true,
  //   families: {
  //     // Poppins: true,
  //     Poppins: {
  //       wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  //     },
  //   },
  // },

  // vite config
  // vite: {
  //   build: true,
  // },

  // moment config
  moment: {
    defaultLocale: 'id',
    locales: ['id'],
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    // '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',

    // 'nuxt-highcharts',
    '@nuxtjs/auth-next',

    // moment module
    '@nuxtjs/moment',

    'vue-sweetalert2/nuxt',
    // "nuxt-lodash"
    
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
    'nuxt-highcharts',
    'vue-social-sharing/nuxt',
    '@nuxtjs/sitemap',
    'vue-scrollto/nuxt',
    ['nuxt-clipboard', { autoSetContainer: true }],
    ['nuxt-tailvue', {
      modal: true,
      toast: { 
        defaultProps: { 
          timeout: 3,
          classToast: 'bg-white z-[9999]',
          // classTitle: 'text-white',
          // classMessage: 'text-white',
          // classClose: 'text-white',
          // classTimeout: 'bg-red-300',
        } 
      } 
    }],
  ],

  // moment config
  dayjs: {
    locales: ['id'],
    defaultLocale: 'id',
    defaultTimeZone: 'Asia/Jakarta',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone', // import 'dayjs/plugin/timezone'
      'relativeTime',
      'advancedFormat'
    ] // Your Day.js plugin
  },
  // lodash: {
  //   prefix: "_",
  //   prefixSkip: ["string"],
  //   upperAfterPrefix: false,
  //   exclude: ["map"],
  //   alias: [
  //     ["camelCase", "stringToCamelCase"], // => stringToCamelCase
  //     ["kebabCase", "stringToKebab"], // => stringToKebab
  //     ["isDate", "isLodashDate"],
  //     ["flatMap", "flatMap"],  // => _isLodashDate
  //   ],
  // },
  sweetalert: {
    confirmButtonColor: '#04837B',
    cancelButtonColor: '#F12D2D',
  },
  env: {
    url: process.env.baseUrl.replace('/api/', '/'),
    baseUrl: process.env.baseUrl,
  },
  ssr:true,

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: "*",
        component: resolve("~/pages/notfound.vue"),
      });
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: "https://bepssi.kunci.co.id/",
    // baseURL: process.env.baseUrl,
    baseUrl: "be.olahraga.kunci.co.id",
    headers: {
      "Content-Type": "application/json",
    },
    // proxy: true,
    // prefix: '/',
  },

  auth: {
    // redirect: {
    //   login: '/login', // Specify your login route
    //   logout: '/login', // Specify your logout route
    //   home: '/dashboard', // Specify your home/dashboard route
    // },
    // Options
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'data',
          // autoFetch: true
        },
        endpoints: {
          login: { url: 'api/auth/login', method: 'post' },
          logout: { url: 'api/auth/logout', method: 'get' },
          user: { url: 'employee/profile', method: 'get', propertyName: false },
          documen: { url: 'api/secure-document/users', method: 'get', propertyName: false }, 
        },
      },
    },
    redirect: {
      login: '/dashboard',
      logout: '/login',
    },
    cookie: {
      options: {
        secure: true,
        expires: 10,
      },
    },
  },

  

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  // pwa: {
  //   manifest: {
  //     lang: 'en',
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // build: {
  //   transpile: [
  //     'defu',
  //   ],
  // },
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: 'lodash'
      })
    ],
    transpile: [
      'defu',
      /^gmap-vue($|\/)/, 
      // /^vue2-gmap-custom-marker($|\/)/
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
  // tailwindcss: {
  //   cssPath: '~/assets/css/tailwind.css',
  //   configPath: 'tailwind.config.js',
  //   exposeConfig: false,
  //   config: {},
  //   injectPosition: 0,
  // },

  // // config for storybook
  // storybook: {
  //   // Options
  //   addons: [
  //     '@storybook/addon-controls',
  //     '@storybook/addon-notes',
  //   ],
  //   stories: [
  //     '~/stories/**/*.stories.js',
  //     '~/stories/**/*.stories.mdx',
  //   ],
  // }

}
