import { isArr } from './isArr';
import { isObject } from './isObject';

export function isObj<T extends object>(a: unknown): a is T {
  return isObject(a) && !isArr(a);
}
