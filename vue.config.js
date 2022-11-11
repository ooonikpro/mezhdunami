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
});
