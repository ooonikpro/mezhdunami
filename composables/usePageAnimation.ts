const isAnimate = ref(false);

export const usePageAnimation = () => {
    const setAnimate = (value: boolean) => isAnimate.value = value

    return {
        isAnimate: readonly(isAnimate),
        setAnimate
    }
}
