import localforage from 'localforage';

export const useStore = () => {
  const get = <T>(key: string) => localforage.getItem<T | null>(key);
  const set = (key: string, value: any) => localforage.setItem(key, value);
  const remove = (key: string) => localforage.removeItem(key);

  return {
    get,
    set,
    remove,
  };
};
