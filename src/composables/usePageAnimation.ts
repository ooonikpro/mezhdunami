import { ref, readonly } from 'vue';

const isAnimate = ref(false);
const isReverse = ref(false);

export const usePageAnimation = () => {
  const setAnimate = (value: boolean, reverse = false) => {
    isAnimate.value = value;
    isReverse.value = reverse;
  };

  const turnOnAnimation = ({ reverse } = { reverse: false }) => setAnimate(true, reverse);

  const turnOffAnimation = () => {
    let timeout: null | any = null;

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        setAnimate(false, false);
      }, 600);
    };
  };

  return {
    isAnimate: readonly(isAnimate),
    isReverse: readonly(isReverse),
    turnOnAnimation,
    turnOffAnimation: turnOffAnimation(),
  };
};
