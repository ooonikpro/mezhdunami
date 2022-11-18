export * from './calendar';
export * from './procedures';

export const debounce = <T extends (args?: any | any[]) => void>(fn: T, duration = 0) => {
  let timer: string | number | NodeJS.Timeout | null | undefined = null;

  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => fn(...args), duration);
  };
};
