import { curry } from './curry';
import { isObject } from './isObject';
import { Obj, Spread } from './types';

const getCtor = (v: Obj) => v.constructor;

export interface MergeFn {
  <A extends object>(a: A): <B extends object>(b: B) => Spread<[A, B]>;
  <A extends object, B extends object>(a: A, b: B): Spread<[A, B]>;
}

export const merge = curry((target: Obj, source: never) => {
  for (const [key, val] of Object.entries(source)) {
    if (isObject(val)) {
      if (target[key] === undefined || getCtor(target[key]) !== getCtor(val as Obj)) {
        target[key] = new (val as any).constructor(); // eslint-disable-line
      }

      merge(target[key], val);
    } else {
      target[key] = val;
    }
  }

  return target;
}) as MergeFn;
