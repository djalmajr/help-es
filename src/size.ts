import { isObject } from './isObject';
import { isStr } from './isStr';

export const size = (val: unknown): number => {
  if (!isObject(val) && !isStr(val)) {
    return 0;
  }

  return Object.keys(val).length;
};
