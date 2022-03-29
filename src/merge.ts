import { curry } from './curry';
import { isObject } from './isObject';
import { Any, Obj } from './types';

/***
 * https://stackoverflow.com/a/49683575/2528550
 */

export type OptionalPropertyNames<T> = {
  [K in keyof T]-?: Obj extends { [P in K]: T[K] } ? K : never;
}[keyof T];

export type SpreadProperties<L, R, K extends keyof L & keyof R> = {
  [P in K]: L[P] | Exclude<R[P], undefined>;
};

export type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

export type SpreadTwo<L, R> = Id<
  Pick<L, Exclude<keyof L, keyof R>> &
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

export type Spread<A extends readonly [...Any]> = A extends [infer L, ...infer R]
  ? SpreadTwo<L, Spread<R>>
  : unknown;

const getCtor = (v: Obj) => v.constructor;

export interface MergeFn {
  <A extends object>(a: A): <B extends object>(b: B) => Spread<[A, B]>;
  <A extends object, B extends object>(a: A, b: B): Spread<[A, B]>;
}

export const merge = curry((target: Obj<Any>, source: never) => {
  for (const [key, val] of Object.entries(source)) {
    if (isObject(val)) {
      if (target[key] === void 0 || getCtor(target[key]) !== getCtor(val as Obj)) {
        target[key] = new (val as Any).constructor();
      }

      merge(target[key], val);
    } else {
      target[key] = val;
    }
  }

  return target;
}) as MergeFn;
