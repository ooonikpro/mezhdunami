export const useStore = (storageKey = 'mezhdunami') => {
  const startSoil = 'WJHc';
  const endSoil = 'W==';
  const encode = (str: string) => `${startSoil}${window.btoa(str)}${endSoil}`;
  const decode = (str: string) => window.atob(str.replace(startSoil, '').replace(endSoil, ''));

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
    set,
  };
};
