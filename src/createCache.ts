import { isString } from './isString';
import { parseJSON } from './parseJSON';
import { ValueOf } from './types';

export function createCache<T extends object>(nameOrInit?: string | T, init?: T) {
  if (isString(nameOrInit)) {
    nameOrInit = `${nameOrInit}:`;
  } else {
    init = nameOrInit;
    nameOrInit = '';
  }

  return {
    ...init,
    del(key: keyof T): void {
      localStorage.removeItem(nameOrInit + (key as never));
    },
    get<R = ValueOf<T>>(key: keyof T): R | null {
      return parseJSON(localStorage.getItem(nameOrInit + (key as never) || ''));
    },
    set(key: keyof T, value: ValueOf<T>): void {
      localStorage.setItem(nameOrInit + (key as never), JSON.stringify(value));
    },
  };
}
