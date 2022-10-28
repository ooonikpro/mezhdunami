export const useStore = () => {
    const startSoil = 'WJHc';
    const endSoil = 'W==';
    const encode = (str: string) => `${startSoil}${window.btoa(str)}${endSoil}`;
    const decode = (str: string) => window.atob(str.replace(startSoil, '').replace(endSoil, ''));

    const getStorage = () => window.localStorage;

    const get = <T extends any>(key: string): T | undefined => {
        try {
            const value = getStorage().getItem(encode(key));

            if (value) return JSON.parse(decode(value)) as T;

            return;
        } catch (e) {
            console.error(e);

            return;
        }
    };

    const set = (key: string, value: any) => {
        try {
            getStorage().setItem(encode(key), encode(JSON.stringify(value)));
        } catch (e) {
            console.error(e);

            return;
        }
    }

    return {
        get,
        set
    }
}
