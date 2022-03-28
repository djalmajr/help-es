/* eslint-disable @typescript-eslint/no-explicit-any */

import { curry } from './curry';
import { isObject } from './isObject';
import { Spread } from './types';

const getCtor = (v: any) => v.constructor;

export interface MergeFn {
  <A extends object>(a: A): <B extends object>(b: B) => Spread<[A, B]>;
  <A extends object, B extends object>(a: A, b: B): Spread<[A, B]>;
}

export const merge = curry((target: any, source: never) => {
  for (const [key, val] of Object.entries(source)) {
    if (isObject(val)) {
      if (target[key] === void 0 || getCtor(target[key]) !== getCtor(val)) {
        target[key] = new (val as any).constructor();
      }

      merge(target[key], val);
    } else {
      target[key] = val;
    }
  }

  return target;
}) as MergeFn;
