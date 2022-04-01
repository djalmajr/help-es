import { curry } from './curry';

interface SortByFn {
  <T extends object>(key: keyof T): (b: T, c: T) => number;
  <T extends object>(key: keyof T, b: T): (c: T) => number;
  <T extends object>(key: keyof T, b: T, c: T): number;
}

/**
 * TODO: adicionar documentação
 */
export const sortBy = curry(function <T extends object>(k: keyof T, a: T, b: T) {
  return (a[k] > b[k] && 1) || (a[k] < b[k] && -1) || 0;
}) as SortByFn;
