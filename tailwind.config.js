/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    'node_modules/tv-*/dist/tv-*.umd.min.js',
  ],
  theme: {
    extend: {
      zIndex: {
        '1':'1',
        '2':'2',
        '3':'3',
        '4':'4',
        '5':'5',
        '6':'6',
        '7':'7',
        '8':'8',
        '9':'9'
      },
      lineHeight: {
        '4plus': '18.2px'
      },
      fontSize: {
        '2xs':'10px',
        'xsmin': '11px',
        'xsplus': '13px',
        'xlplus': '22px',
        '2xlplus': '25px',
        '3xlmin': '27px',
        '3xlplus': '31px',
        '4xlmin': '34px',
        '4xlplus': '39px',
        '5xlplus': '49px',
        '6xlplus': '61px'
      },
      borderRadius: {
        'smplus': '3px',
        'plus': '5px',
        'lgplus': '10px'
      },
      borderWidth: {
        '3': '3px'
      },
      spacing: {
        '0.5plus': '3px',
        'plus': "5px",
        '2.5plus': '11px',
        '3plus': '15px',
        '4plus': '18px',
        '6plus': '25px',
        '7plus': '30px',
        '8plus': '34px',
        '10plus': '42px',
        '12plus': '50px',
        '14plus': '60px',
        '20plus': '90px',
        '24plus': '100px',
        '28plus': '120px',
        '32plus': '140px',
        '36plus': '151px',
        '60plus': '248px',
        //banyak digunakan untuk px
        'tipis' : '20px',
        'sedang' : '40px',
        'sedangplus' : '48px',
        'tebal' : '80px',
      },
      boxShadow: {
        'xlplus': '0 15px 50px rgba(109, 119, 139, 0.15)',
        'btn-default': '0px 10px 20px rgba(205, 70, 59, 0.2)',
        'card': '0px 10px 20px rgba(0, 0, 0, 0.1)',
        'cardlist': '0px 15px 40px rgba(0, 0, 0, 0.1)',
        'list': '0px 5px 20px rgba(0, 0, 0, 0.05)',
        'dashboard':'0px 10px 20px rgba(24, 35, 99, 0.05)',
        'fab':'0px 4px 4px rgba(0, 0, 0, 0.25)'
      },
      height: {
        '0.5plus': '3px',
        '30': '120px',
        '50': '200px',
        '70': '280px',
        '75': '308px'
      },
      width: {
        '30': '120px',
        '35': '140px',
        '95': '380px',
        '70': '280px'
      },
      colors: {
        'light': '#F7F8FB',
        'primary': '#A80000',
        'primary-shade': '#700000',
        'secondary': '#1476EB',
        'secondary-shade': '#105CB7',
        'danger': '#F12D2D',
        'danger-shade': '#D80E0E',
        'success': '#04837B',
        'success-shade': '#024D48',
        'dark': '#222831',
        'warning': '#FFA900',
        'warning-shade': '#C78400',
        'orange': '#EE712B',
        'primaryDark': '#222831',
        'latar': '#F3F3F7',
        'satu': '#EFEFEF',
        'dua': '#222',
        'tiga': '#333',
        'empat': '#444',
        'lima': '#555',
        'enam': '#BBB',
        'tujuh': '#EEE',
        'delapan': '#888',
        'sembilan': '#312F2F',
        'sepuluh': '#9B9B9B',

        '11': '#CC433B',
        '12': '#F5F5F5',
        '13': '#CCC',
        '14': '#27AE60',
        '15': '#A0A0A0',
        '16': '#AAAAAA',
        '17': '#E6E6E6',
        '18': '#E8E8E8',
        '19': '#DDD',
        '20': '#DB2127',

        '21': '#9ACA3C',
        '22': '#373535',
        '23': '#6EA700',
        '24': '#0E95CC',
        '25': '#666',
        '26': '#DFDEDE',
        '27': '#EAEAEA',
        '28': '#D9D9D9',
        '29': '#373535'
      },
      scale: {
        '120': '1.2',
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [
    // require("@tailwindcss/line-clamp")
  ],
}