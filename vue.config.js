const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  assetsDir: 'assets',
  productionSourceMap: false,
  transpileDependencies: true,

  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/css/additional.scss";`
      }
    }
  },

  pwa: {
    workboxPluginMode: 'InjectManifest',
    name: 'Косметология для своих',
    themeColor: '#F3BAB3',
    msTileColor: '#F3BAB3',
    appleMobileWebAppStatusBarStyle: '',
    manifestCrossorigin: 'anonymous',
    manifestOptions: {
      background_color: '#F3BAB3',
    },
  },
});
