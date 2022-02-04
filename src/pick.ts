import { curry } from './curry';
import { Obj } from './types';

/**
 * TODO: adicionar documentação
 */
export const pick = curry(function <T extends Obj>(path: string | string[], obj: T): T {
  const keys = ([] as string[]).concat(path);

  return keys.reduce(function (res, key) {
    if (obj.hasOwnProperty(key)) {
      (res as Obj)[key] = obj[key];
    }

    return res;
  }, {} as T);
});
