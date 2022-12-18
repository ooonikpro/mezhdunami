import { ADMIN_ROUTES } from '@/constants/adminRoutes';
import { CLIENT_ROUTES } from '@/constants/clientRoutes';

declare module 'vue' {
  interface ComponentCustomProperties {
    $routes: typeof CLIENT_ROUTES
    $adminRoutes: typeof ADMIN_ROUTES
  }
}
