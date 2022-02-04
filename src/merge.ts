import { curry } from './curry';
import { isObj } from './isObj';
import { Obj } from './types';

const getCtor = (v: any) => v.constructor;

export const merge = curry(<T = Obj>(target: T, source: T): T => {
  for (const [k, val] of Object.entries(source)) {
    const key = k as keyof T;

    if (isObj(val)) {
      if (target[key] === void 0 || getCtor(target[key]) !== getCtor(val)) {
        target[key] = new (val as any).constructor();
      }

      merge(target[key], val);
    } else {
      target[key] = val;
    }
  }

  return target;
});
