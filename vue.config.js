const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/css/additional.scss";',
      },
    },
  },

  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
      },
    },
  },

  pwa: {
    themeColor: '#F3BAB3',
    msTileColor: '#F3BAB3',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      name: 'Между Нами. Косметология для своих',
      short_name: 'Между Нами',
      display: 'standalone',
      background_color: '#F3BAB3',
      lang: 'ru',
      dir: 'ltr',
    },
  },
});
