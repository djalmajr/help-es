import { curry } from './curry';

interface UniqByFn {
  <T extends object>(key: keyof T): (b: T[]) => T[];
  <T extends object>(key: keyof T, b: T[]): T[];
}

export const uniqBy = curry((key: string, arr: any[]) => {
  return arr.filter((a, i) => arr.findIndex((b) => a[key] === b[key]) === i);
}) as UniqByFn;
