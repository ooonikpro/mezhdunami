export const useStore = (storageKey = 'mezhdunami') => {
  const getStorage = () => window.localStorage;

  const getStoreData = (): Record<string, any> => {
    const rawData = getStorage().getItem(storageKey);

    if (rawData) {
      return JSON.parse(rawData);
    }

    return {};
  };

  const get = <T>(key: string): T | null => {
    try {
      const storeData = getStoreData();

      if (storeData.hasOwnProperty(key)) {
        return storeData[key] as T;
      }
    } catch (e) {
      console.error(e);
    }

    return null;
  };

  const set = (key: string, value: any) => {
    try {
      const storeData = getStoreData();

      storeData[key] = value;

      getStorage().setItem(storageKey, JSON.stringify(storeData));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    get,
    set,
  };
};
