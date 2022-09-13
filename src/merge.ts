import { curry } from './curry';
import { isObject } from './isObject';
import type { Obj, Spread } from './types';

const ctor = (v: Obj<unknown>) => v?.constructor;

export interface MergeFn {
  <A extends object>(a: A): <B extends object>(b: B) => Spread<[A, B]>;
  <A extends object, B extends object>(a: A, b: B): Spread<[A, B]>;
}

export const merge = curry((target: Obj, source: Obj) => {
  for (const key in source) {
    if (isObject(source[key])) {
      if (target[key] === undefined || ctor(target[key]) !== ctor(source[key])) {
        target[key] = new source[key].constructor();
      }

      merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }

  return target;
}) as MergeFn;
