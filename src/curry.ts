/* eslint-disable @typescript-eslint/no-explicit-any */

import { Curried, Fn } from './types';

export const __ = Symbol('help-es');

const cat = (prev: unknown[], next: unknown[]) => {
  const arr = prev.reduce((res: unknown[], arg) => {
    return [...res, arg === __ ? next.shift() : arg];
  }, []);

  return [...arr, ...next];
};

/**
 * curry.
 *
 * https://stackoverflow.com/a/63905763/2528550
 *
 * @example
 *
 * const pow = curry((b, a) => Math.pow(a, b));
 * const toSquare = pow(2);
 * console.log(toSquare(9)) // logs 81
 */
export function curry<A extends unknown[], R>(fn: Fn<A, R>): Curried<A, R> {
  return function curried(...args: any[]): any {
    if (args.some((a) => a === __) || args.length < fn.length) {
      return (...next: unknown[]) => curried(...cat(args, next));
    }

    return fn(...(args as any));
  };
}
