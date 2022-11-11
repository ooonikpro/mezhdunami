export const useStatusBar = () => {
  const getSelector = () => document.querySelector('meta[name=apple-mobile-web-app-status-bar-style]');

  const setBlack = () => getSelector()?.setAttribute('content', 'black');
  const setWhite = () => getSelector()?.setAttribute('content', 'black-translucent');

  return {
    setBlack,
    setWhite,
  };
};
