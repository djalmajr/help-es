import { curry } from './curry';

interface SortByFn {
  <T extends object>(key: keyof T): (b: T) => (c: T) => number;
  <T extends object>(key: keyof T, b: T): (c: T) => number;
  <T extends object>(key: keyof T, b: T, c: T): number;
}

/**
 * TODO: adicionar documentação
 */
export const sortBy = curry((k: string, a: any, b: any) => {
  return (a[k] > b[k] && 1) || (a[k] < b[k] && -1) || 0;
}) as SortByFn;
