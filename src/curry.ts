import { Fn } from './types';

export type Curried<A extends any[], R> = <P extends Partial<A>>(
  ...args: P
) => P extends A
  ? R
  : A extends [...SameLength<P>, ...infer S]
  ? S extends any[]
    ? Curried<S, R>
    : never
  : never;

export type SameLength<T extends any[]> = Extract<{ [K in keyof T]: any }, any[]>;

/**
 * Curry a function by N arguments.
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
  return function (...args: any[]): any {
    return args.length < fn.length ? curry((fn as any).bind(null, ...args)) : fn(...(args as any));
  };
}
