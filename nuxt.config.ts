const title = 'Между Нами. Косметология для своих';
const description = 'Онлайн запись';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: [
    '@kevinmarrec/nuxt-pwa'
  ],

  pwa: {
    icon: false,
    workbox: {
      enabled: process.env.NODE_ENV === 'production'
    },

    meta: {
      viewport: 'width=device-width, initial-scale=1, user-scalable=no, minimal-ui',
      mobileApp: 'yes',
      mobileAppIOS: 'yes',
      appleStatusBarStyle: 'black',
      favicon: false,
      name: title,
      description,
      theme_color: '#F3BAB3',
      lang: 'ru',
      ogTitle: title,
      ogDescription: description,
      ogType: 'website',
      ogSiteName: 'mezhdunami.app',
      ogHost: 'https://mezhdunami.app',
      ogImage: '/preview.jpg',
      nativeUI: true
    }
  },

  css: ['@/assets/css/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/_colors.scss"; @import "@/assets/css/_mixins.scss";'
        }
      }
    }
  },

  app: {
    head: {
      meta: [
        {
          name: 'format-detection',
          content: 'no'
        }
      ],

      link: [
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'shortcut icon',
          type: 'image/svg+xml',
          href: '/favicon.svg'
        }
      ]
    },

    pageTransition: {
      name: 'page',
      mode: 'in-out'
    }
  }
});
