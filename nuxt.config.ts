// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    buildModules: [
        '@nuxtjs/pwa',
    ],

    css: ['@/assets/css/main.scss'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/css/_colors.scss"; @import "@/assets/css/_mixins.scss";',
                }
            }
        }
    },

    app: {
        head: {
            title: 'Кабинет врача-косметолога Елены Овечкиной в Калининграде',

            meta: [
                {
                    name: 'theme-color',
                    content: '#F3BAB3'
                },
                {
                    name: 'mobile-web-app-capable',
                    content: 'yes'
                },
                {
                    name: 'apple-mobile-web-app-status-bar-style',
                    content: 'black-translucent',
                },
                {
                    name: 'title',
                    content: 'Косметология для своих'
                },
                {
                    name: 'og:title',
                    content: 'Косметология для своих'
                },
                {
                    name: 'description',
                    content: 'Кабинет врача-косметолога Елены Овечкиной в Калининграде',
                },
                {
                    name: 'og:description',
                    content: 'Кабинет врача-косметолога Елены Овечкиной в Калининграде',
                },

                {
                    name: 'format-detection',
                    content: 'no'
                }
            ],

            link: [
                {
                    rel: 'apple-touch-icon',
                    href: '/apple-touch-icon.png',
                },
                {
                    rel: 'shortcut icon',
                    type: 'image/svg+xml',
                    href: '/favicon.svg',
                },
                {
                    rel: 'manifest',
                    href: '/manifest.json'
                }
            ]
        },

        pageTransition: {
            name: 'page',
            mode: 'in-out'
        }
    },
})
