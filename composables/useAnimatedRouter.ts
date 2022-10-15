export const useAnimatedRouter = () => {
    const router = useRouter();
    const { setAnimate } = usePageAnimation();

    const originalPush = router.push;

    return {
        ...router,
        push: (...args) => {
            setAnimate(true);
            return originalPush.apply(router, args);
        },

        pushBack: (...args) => {
            setAnimate(true, true);
            return originalPush.apply(router, args);
        }
    }
}
