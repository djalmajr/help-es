import { curry } from './curry';
import { Fn } from './types';

interface DebounceFn {
  (a: number): <T extends unknown[], R extends unknown>(f: Fn<T, R>) => Fn<T, R>;
  <T extends unknown[], R extends unknown>(a: number, f: Fn<T, R>): Fn<T, R>;
}

/**
 * TODO: adicionar documentação
 *
 * https://davidwalsh.name/function-debounce
 */
export const debounce = curry((wait: number, fn: Function) => {
  let timeout: any;

  return function (this: any, ...args: any[]) {
    const self = this;

    const later = function () {
      timeout = undefined;
      fn.apply(self, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (!timeout) {
      fn.apply(self, args);
    }
  };
}) as DebounceFn;
