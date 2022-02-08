import { copy } from './copy';
import { curry } from './curry';

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
export const set = curry((path: string | string[], value: unknown, source: any) => {
  (path as string).split && (path = (path as string).split('.'));

  let val = value as any;
  let next = copy(source);
  let last = next;

  for (let i = 0, l = path.length; i < l; i++) {
    last = last[path[i]] =
      i === l - 1 ? (val && val.call && val(last[path[i]])) || val : copy(last[path[i]]);
  }

  return next;
}) as SetFn;
