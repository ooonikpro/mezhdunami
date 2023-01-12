const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  outputDir: 'mezhdunami.app/nginx/www',

  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/css/additional.scss";',
      },
    },
  },

  devServer: {
    allowedHosts: ['localhost', 'dr-helen.localhost'],
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
      },
    },
  },

  pwa: {
    themeColor: '#FFF2EC',
    msTileColor: '#FFF2EC',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      name: 'Между Нами. Косметология для своих',
      short_name: 'Между Нами',
      display: 'standalone',
      background_color: '#FFF2EC',
      lang: 'ru',
      dir: 'ltr',
    },
  },

  configureWebpack: {
    resolve: {
      fallback: {
        url: false,
        fs: false,
        tls: false,
        net: false,
        path: false,
        zlib: false,
        http: false,
        https: false,
        stream: false,
        crypto: false,
        assert: false,
      },
    },
  },
});
