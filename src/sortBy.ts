import { curry } from './curry';
import { get } from './get';

interface SortByFn {
  <T extends object>(key: keyof T): (b: T, c: T) => number;
  <T extends object>(key: keyof T, b: T): (c: T) => number;
  <T extends object>(key: keyof T, b: T, c: T): number;
}

/**
 * TODO: adicionar documentação
 */
export const sortBy = curry(function <T extends object>(k: keyof T, a: T, b: T) {
  const v = get<T>(k as string);
  return (v(a) > v(b) && 1) || (v(a) < v(b) && -1) || 0;
}) as SortByFn;
