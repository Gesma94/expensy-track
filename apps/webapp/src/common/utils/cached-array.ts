export const CachedArray = {
  get: <T>(key: string, defaultValue: T[]): T[] => {
    const localStorageValue = localStorage.getItem(key);

    if (!localStorageValue) {
      return defaultValue;
    }

    const parsedValue = JSON.parse(localStorageValue);

    if (!Array.isArray(parsedValue)) {
      localStorage.removeItem(key);
      return defaultValue;
    }

    return parsedValue;
  },
  set: <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  unshift: function <T>(key: string, value: T, maxLength: number) {
    const cachedValue = this.get<T>(key, []);

    cachedValue.unshift(value);

    if (cachedValue.length > maxLength) {
      cachedValue.pop();
    }

    this.set(key, cachedValue);
  }
};
