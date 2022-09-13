import { copy } from './copy';
import { curry } from './curry';
import { isFunction } from './isFunction';
import { isString } from './isString';
import { Obj } from './types';

interface SetFn {
  (path: string | string[]): <B extends object>(value: unknown, source: B) => B;
  <B extends object>(path: string | string[], value: unknown): (source: B) => B;
  <B extends object>(path: string | string[], value: unknown, source: B): B;
}

/**
 * https://github.com/fwilkerson/clean-set
 *
 * TODO: adicionar documentação
 */
export const set = curry((path: string | string[], value: unknown, source: Obj<unknown>) => {
  isString(path) && (path = path.split(/[\]\.\[]/).filter(Boolean));

  const src = copy(source);

  let val = src;

  for (let i = 0; i < path.length; i++) {
    val = val[path[i]] =
      i === path.length - 1
        ? ((isFunction(value) ? value(val[path[i]]) : value) as never)
        : copy(val[path[i]] as never);
  }

  return src;
}) as SetFn;
