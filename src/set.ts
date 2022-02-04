import { copy } from './copy';
import { curry } from './curry';
import { Fn, Obj, ValueOf } from './types';

type Value<T extends Obj> = ValueOf<T> | Fn<ValueOf<T>, ValueOf<T>>;

/**
 * https://github.com/fwilkerson/clean-set
 *
 * TODO: adicionar documentação
 */
export const set = curry(function <T extends Obj, V = Value<T>>(
  path: string | string[],
  value: V,
  source: T,
): T {
  (path as string).split && (path = (path as string).split('.'));

  let val = value as any;
  let next = copy(source);
  let last = next;

  for (let i = 0, l = path.length; i < l; i++) {
    last = last[path[i]] =
      i === l - 1 ? (val && val.call && val(last[path[i]])) || val : copy(last[path[i]]);
  }

  return next;
});
