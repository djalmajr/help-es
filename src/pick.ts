import { curry } from './curry';
import { Obj } from './types';

export interface PickFn {
  (a: string | string[]): <B extends object>(b: B) => Partial<B>;
  <B extends object>(a: string | string[], b: B): Partial<B>;
}

/**
 * TODO: adicionar documentação
 */
export const pick = curry((path: string | string[], obj: Obj) => {
  const keys = ([] as string[]).concat(path);

  return keys.reduce((res, key) => {
    if (obj.hasOwnProperty(key)) {
      res[key] = obj[key];
    }

    return res;
  }, {} as Obj);
}) as PickFn;
