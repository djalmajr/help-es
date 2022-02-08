import { isArr } from './isArr';

export function copy<T extends object>(src: T): T {
  return isArr(src) ? ([...src] as T) : { ...src };
}
