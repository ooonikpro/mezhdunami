import { CLIENT_ROUTES } from '@/constants/clientRoutes';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: CLIENT_ROUTES.main,
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: CLIENT_ROUTES.about,
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: CLIENT_ROUTES.form,
    component: () => import('@/views/FormView.vue'),
    props: {
      restoreUser: true,
    },
  },
  {
    path: CLIENT_ROUTES.priceList,
    component: () => import('@/views/PriceListView.vue'),
  },
  {
    path: CLIENT_ROUTES.orderPage,
    component: () => import('@/views/OrderView.vue'),
  },
  {
    path: CLIENT_ROUTES.recommendations,
    component: () => import('@/views/recommendations/RecommendationsView.vue'),
  },
  {
    path: CLIENT_ROUTES.howToPrepareToProcedure,
    component: () => import('@/views/recommendations/RecommendationsBeforeView.vue'),
  },
  {
    path: CLIENT_ROUTES.recommendationsAfterProcedures,
    component: () => import('@/views/recommendations/RecommendationsAfterView.vue'),
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
