import { useState, useEffect } from 'react';

export function useLocalStorage(key = '', initialValue = '') {
  /*
  does not implement lazy initial state initialization
  does not allow for key change
  */
  const [value, setValue] = useState(() => {
    const preStored = window.localStorage.getItem(key);

    if (preStored != null) {
      return preStored instanceof Object ? JSON.parse(preStored) : preStored;
    }

    return initialValue;
  });

  useEffect(() => {
    const toStore = value instanceof Object ? JSON.stringify(value) : value;

    window.localStorage.setItem(key, toStore);

    return () => window.localStorage.removeItem(key);
  }, [key, value]);

  return [value, setValue];
}
