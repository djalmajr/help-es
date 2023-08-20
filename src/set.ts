import { copy } from './copy';
import { curry } from './curry';

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
export const set = curry((path: any, value: any, source: any) => {
  typeof path === 'string' && (path = path.split(/[\]\.\[]/).filter(Boolean));
  const src = copy(source);
  let val = src;
  for (let i = 0; i < path.length; i++) {
    // prettier-ignore
    val = val[path[i]] = i === path.length - 1
      ? typeof value === 'function' ? value(val[path[i]]) : value
      : val[path[i]] ? copy(val[path[i]]) : path[i+1]*0 === 0 ? [] : {};
  }
  return src;
}) as SetFn;
