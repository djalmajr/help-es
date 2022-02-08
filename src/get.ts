import { curry } from './curry';
import { isStr } from './isStr';

interface GetFn {
  (a: string | string[]): <R extends unknown>(b: object) => R;
  <R extends unknown>(a: string | string[], b: object): R;
}

/**
 * https://github.com/developit/dlv
 *
 * TODO: adicionar documentação
 */
export const get = curry((path: string | string[], src: object): unknown => {
  isStr(path) && (path = path.split('.'));

  for (let i = 0, l = path.length; i < l; i++) {
    src = src ? (src as any)[path[i]] : undefined;
  }

  return src;
}) as GetFn;
