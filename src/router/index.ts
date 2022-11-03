import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('../views/FormView.vue'),
  },
  {
    path: '/price-list',
    name: 'priceList',
    component: () => import('../views/price-list.vue'),
  },
  {
    path: '/order-page',
    name: 'orderPage',
    component: () => import('../views/order-page.vue'),
  },
  {
    path: '/recommendations',
    name: 'recommendations',
    component: () => import('../views/recommendations.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
