import { COOKIE_KEY } from '@/constants';
import { ADMIN_ROUTES } from '@/constants/adminRoutes';
import { getCookie } from '@/utils/cookies';
import {
  createRouter, createWebHistory, RouteRecordRaw,
} from 'vue-router';

const isAuth = () => getCookie(COOKIE_KEY.token);

const routes: Array<RouteRecordRaw> = [
  {
    path: ADMIN_ROUTES.login,
    component: () => import('@/views/admin/LoginView.vue'),
    beforeEnter: (to, from, next) => {
      if (isAuth()) {
        next(ADMIN_ROUTES.main);
      } else {
        next();
      }
    },
  },
  {
    path: ADMIN_ROUTES.main,
    component: () => import('@/views/admin/AdminMainView.vue'),
    meta: {
      restricted: true,
    },
  },
  {
    path: ADMIN_ROUTES.newPatient,
    component: () => import('@/views/FormView.vue'),
    props: {
      title: 'Запись пациента',
      withoutConfirm: true,
      restoreUser: false,
      submitButtonText: 'Записать',
      fromHour: 9,
    },
    meta: {
      restricted: true,
    },
  },
  {
    path: ADMIN_ROUTES.schedule,
    component: () => import('@/views/admin/AdminScheduleView.vue'),
    meta: {
      restricted: true,
    },
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

router.beforeEach((to, from, next) => {
  if (!to.meta.restricted || (to.meta.restricted && isAuth())) {
    next();
  } else {
    next(ADMIN_ROUTES.login);
  }
});

export default router;
