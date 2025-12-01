import localforage from 'localforage';
export const cache = {
    get: async (key: string) => await localforage.getItem(key),
    set: async (key: string, value: any) => await localforage.setItem(key, value),
    remove: async (key: string) => await localforage.removeItem(key),
};