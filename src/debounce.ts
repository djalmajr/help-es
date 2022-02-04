import { curry } from './curry';
import { Fn } from './types';

/**
 * TODO: adicionar documentação
 *
 * https://davidwalsh.name/function-debounce
 */
export const debounce = curry(function <T extends any[], R>(
  wait: number,
  func: Fn<T, R>,
): Fn<T, R> {
  let timeout: NodeJS.Timeout;

  return function (...args: T) {
    // @ts-ignore
    // eslint-disable-next-line consistent-this
    const self = this;

    const later = function () {
      // @ts-ignore
      timeout = undefined;
      func.apply(self, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (!timeout) {
      func.apply(self, args);
    }
  } as Fn<T, R>;
});
