const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  assetsDir: 'assets',
  productionSourceMap: false,
  transpileDependencies: true,

  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/css/additional.scss";',
      },
    },
  },

  pwa: {
    workboxPluginMode: 'GenerateSW',
    manifestPath: 'manifest.json',
    iconPaths: null
  },

  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000'
      }
    }
  }
});
