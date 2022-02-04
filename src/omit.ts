import { curry } from './curry';
import { pick } from './pick';
import { Obj } from './types';

/**
 * TODO: adicionar documentação
 */
export const omit = curry(function <T extends Obj>(path: string | string[], obj: T): T {
  const arr = ([] as string[]).concat(path);
  const keys = Object.keys(obj).filter((k) => !arr.includes(k));

  return pick(keys, obj);
});
