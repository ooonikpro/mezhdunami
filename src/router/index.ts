import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('@/views/FormView.vue'),
  },
  {
    path: '/price-list',
    name: 'priceList',
    component: () => import('@/views/PriceListView.vue'),
  },
  {
    path: '/order-page',
    name: 'orderPage',
    component: () => import('@/views/OrderView.vue'),
  },
  {
    path: '/recommendations',
    name: 'recommendations',
    component: () => import('@/views/RecommendationsView.vue'),
  },
  {
    path: '/admin',
    redirect: '/',
    component: () => import('@/views/admin/AdminContainerView.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/admin/AdminMainView.vue'),
      },
      {
        path: 'schedule',
        component: () => import('@/views/admin/AdminScheduleView.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
