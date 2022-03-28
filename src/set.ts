import { copy } from './copy';
import { curry } from './curry';
import { isFn } from './isFn';
import { isStr } from './isStr';
import { Obj } from './types';

interface SetFn {
  (path: string | string[]): <B extends object>(value: unknown) => (source: B) => B;
  (path: string | string[]): <B extends object>(value: unknown, source: B) => B;
  <B extends object>(path: string | string[], value: unknown): (source: B) => B;
  <B extends object>(path: string | string[], value: unknown, source: B): B;
}

/**
 * https://github.com/fwilkerson/clean-set
 *
 * TODO: adicionar documentação
 */
export const set = curry((path: string | string[], value: unknown, source: Obj) => {
  isStr(path) && (path = path.split(/[\]\.\[]/).filter(Boolean));

  const src = copy(source);

  let val = src;

  for (let i = 0; i < path.length; i++) {
    // prettier-ignore
    val = val[path[i]] = i === path.length - 1
      ? (isFn(value) ? value(val[path[i]]) : value) as Obj
      : copy(val[path[i]] as Obj);
  }

  return src;
}) as SetFn;
