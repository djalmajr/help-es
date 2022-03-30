import { parseJSON } from './parseJSON';
import { Obj, ValueOf } from './types';

type Cache<T> = T & {
  get<R = unknown>(key: ValueOf<T>): R | null;
  set(key: ValueOf<T>, value: unknown): void;
};

export function createCache<T extends Obj<string>>(init?: T): Cache<T> {
  return {
    ...init,
    get<R = unknown>(key: ValueOf<T>): R | null {
      return parseJSON(localStorage.getItem((key as unknown as string) || ''));
    },
    set(key: ValueOf<T>, value: unknown): void {
      localStorage.setItem(key as unknown as string, JSON.stringify(value));
    },
  } as Cache<T>;
}
