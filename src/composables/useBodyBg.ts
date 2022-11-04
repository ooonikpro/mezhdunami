export const useBodyBg = () => (color: string) => {
  document
    .querySelector('meta[name="theme-color"]')!
    .setAttribute('content', color);
  document.documentElement.style.setProperty('--bg-color', color);
};
