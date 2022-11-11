export const useStore = (storageKey = 'mezhdunami') => {
  const getStorage = () => window.localStorage;

  const getStoreData = () => {
    const rawData = getStorage().getItem(storageKey);

    if (rawData) {
      return JSON.parse(rawData);
    }

    return {};
  };

  const get = <T extends any>(key: string): T | undefined => {
    try {
      const storeData = getStoreData();

      if (storeData.hasOwnProperty(key)) {
        return storeData[key] as T;
      }
    } catch (e) {

    }
  };

  const set = (key: string, value: any) => {
    try {
      const storeData = getStoreData();

      storeData[key] = value;

      getStorage().setItem(storageKey, JSON.stringify(storeData));
    } catch (e) {

    }
  };

  return {
    get,
    set
  };
};
