export * from './calendar';
export * from './procedures';

export const debounce = (fn: (args?: any[]) => void, duration = 0) => {
  let timer: string | number | NodeJS.Timeout | null | undefined = null;

  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => fn(...args), duration);
  };
};
