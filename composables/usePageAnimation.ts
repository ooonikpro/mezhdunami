const isAnimate = ref(false);
const isReverse = ref(false);

export const usePageAnimation = () => {
    const setAnimate = (value: boolean, reverse: boolean = false) => {
        isAnimate.value = value;
        isReverse.value = reverse;
    }

    return {
        isAnimate: readonly(isAnimate),
        isReverse: readonly(isReverse),
        setAnimate
    }
}
