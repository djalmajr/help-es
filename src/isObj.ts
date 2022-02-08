import { isArr } from './isArr';
import { isObject } from './isObject';

export function isObj(a: unknown): a is Record<string, unknown> {
  return isObject(a) && !isArr(a);
}
