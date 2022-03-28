import { curry } from './curry';
import { Fn } from './types';

interface DebounceFn {
  (a: number): <T extends unknown[], R = unknown>(f: Fn<T, R>) => Fn<T, R>;
  <T extends unknown[], R = unknown>(a: number, f: Fn<T, R>): Fn<T, R>;
}

/**
 * TODO: adicionar documentação
 *
 * https://davidwalsh.name/function-debounce
 */
export const debounce = curry((wait: number, fn: Fn<unknown[], unknown>) => {
  let timeout: NodeJS.Timeout | void;

  return function (this: unknown, ...args: unknown[]) {
    const later = () => {
      timeout = undefined;
      fn.apply(this, args);
    };

    clearTimeout(timeout as NodeJS.Timeout);

    timeout = setTimeout(later, wait);

    if (!timeout) {
      fn.apply(this, args);
    }
  };
}) as DebounceFn;
