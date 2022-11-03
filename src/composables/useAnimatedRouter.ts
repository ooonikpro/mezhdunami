export const useAnimatedRouter = () => {
    const router = useRouter();
    const { turnOnAnimation } = usePageAnimation();

    const originalPush = router.push;

    const goTo = (...args) => {
        turnOnAnimation();
        return originalPush.apply(router, args);
    }

    const goToBack = (...args) => {
        turnOnAnimation({ reverse: true });
        return originalPush.apply(router, args);
    }

    return {
        goTo,
        goToBack
    }
}
