import { curry } from './curry';
import type { Fn } from './types';

interface UniqWithFn {
  <T extends object>(fn: Fn<T[], boolean>): (b: T[]) => T[];
  <T extends object>(fn: Fn<T[], boolean>, b: T[]): T[];
}

export const uniqWith = curry((fn: Fn<never[], boolean>, arr: never[]) => {
  return arr.filter((a, i) => arr.findIndex((b) => fn(a, b)) === i);
}) as UniqWithFn;
