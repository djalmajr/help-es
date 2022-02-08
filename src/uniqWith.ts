import { curry } from './curry';
import { Fn } from './types';

interface UniqWithFn {
  <T extends object>(fn: Fn<T[], boolean>): (b: T[]) => T[];
  <T extends object>(fn: Fn<T[], boolean>, b: T[]): T[];
}

export const uniqWith = curry((fn: Fn<any[], boolean>, arr: any[]) => {
  return arr.filter((a, i) => arr.findIndex((b) => fn(a, b)) === i);
}) as UniqWithFn;
