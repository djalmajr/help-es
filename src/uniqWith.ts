import { curry } from './curry';
import { Fn } from './types';

export const uniqWith = curry(<T = any>(fn: Fn<T[], boolean>, arr: T[]): T[] => {
  return arr.filter((a, i) => arr.findIndex((b) => fn(a, b)) === i);
});
