import { createApp } from 'vue';
import App from '@/App.vue';
import '@/registerServiceWorker';
import { IS_PROD } from '@/constants/env';

const IS_ADMIN_DOMAIN = /dr-helen\./.test(window.location.host);

const app = createApp(App);

(async () => {
  if (IS_ADMIN_DOMAIN) {
    const { default: adminRouter } = await import('@/router/admin.routes');
    const { ADMIN_ROUTES } = await import('@/constants/adminRoutes');

    app.config.globalProperties.$adminRoutes = ADMIN_ROUTES;
    app.use(adminRouter);
  } else {
    if (IS_PROD) {
      const { registerYandexMetrika } = await import('@/yandexMetrika');
      registerYandexMetrika();
    }

    const { default: clientRouter } = await import('@/router/client.routes');
    const { CLIENT_ROUTES } = await import('@/constants/clientRoutes');

    app.config.globalProperties.$routes = CLIENT_ROUTES;
    app.use(clientRouter);
  }

  app.mount('#app');
})();
