import { curry } from './curry';
import { Obj } from './types';

/**
 * https://github.com/developit/dlv
 *
 * TODO: adicionar documentação
 */
export const get = curry(<T extends Obj>(path: string | string[], src: T) => {
  (path as string).split && (path = (path as string).split('.'));

  for (let i = 0, l = path.length; i < l; i++) {
    src = src ? src[path[i]] : undefined;
  }

  return src;
});
