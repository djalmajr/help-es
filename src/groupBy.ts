import { curry } from './curry';
import { Obj } from './types';

interface GroupByFn {
  <T = unknown>(fn: (a: T) => unknown): (arr: T[]) => Obj<T[]>;
  <T = unknown>(fn: (a: T) => unknown, arr: T[]): Obj<T[]>;
}

/**
 * TODO: adicionar documentação
 */
export const groupBy = curry((fn: Function, items: unknown[]) => {
  const res = {} as Obj;
  for (const item of items) {
    const key = fn(item);
    res[key] ||= [];
    res[key].push(item);
  }
  return res;
}) as GroupByFn;
