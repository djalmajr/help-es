import { isArray } from './isArray';

export function copy<T extends object>(src: T): T {
  return isArray(src) ? ([...src] as T) : { ...src };
}
