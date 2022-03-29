import { Any, Fn } from './types';

export type Curried<A extends Any[], R> = <P extends Partial<A>>(
  ...args: P
) => P extends A
  ? R
  : A extends [...SameLength<P>, ...infer S]
  ? S extends Any[]
    ? Curried<S, R>
    : never
  : never;

export type SameLength<T extends Any[]> = Extract<{ [K in keyof T]: Any }, Any[]>;

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
  return function curried(...args: Any[]): Any {
    if (args.some((a) => a === __) || args.length < fn.length) {
      return (...next: unknown[]) => curried(...cat(args, next));
    }

    return fn(...(args as Any));
  };
}
