import { RouteLocationRaw, useRouter } from 'vue-router';
import { usePageAnimation } from '@/composables/usePageAnimation';

export const useAnimatedRouter = () => {
    const router = useRouter();
    const { turnOnAnimation } = usePageAnimation();

    const originalPush = router.push;

    const goTo = (location: RouteLocationRaw) => {
        turnOnAnimation();
        return originalPush.apply(router, [location]);
    }

    const goToBack = (location: RouteLocationRaw) => {
        turnOnAnimation({ reverse: true });
        return originalPush.apply(router, [location]);
    }

    return {
        goTo,
        goToBack
    }
}
