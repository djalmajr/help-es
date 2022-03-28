import { curry } from './curry';
import { diff } from './diff';
import { pick, PickFn } from './pick';

/**
 * TODO: adicionar documentação
 */
export const omit = curry((path: string | string[], obj: never) => {
  const arr = ([] as string[]).concat(path);

  return pick(diff(Object.keys(obj), arr), obj);
}) as PickFn;
