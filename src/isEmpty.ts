import { isObject } from './isObject';

/**
 * TODO: adicionar documentação
 */
export function isEmpty(val: unknown): boolean {
  if (isObject(val)) {
    return !Object.keys(val).length;
  }

  return !val;
}
