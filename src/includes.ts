import { curry } from './curry';

interface IncludesFn {
  <T = unknown>(key: keyof T): (arr: T[], val: T) => boolean;
  <T = unknown>(key: keyof T, arr: T[]): (val: T) => boolean;
  <T = unknown>(key: keyof T, arr: T[], val: T): boolean;
}

export const includes = curry(<T>(key: keyof T, arr: T[], val: T) => {
  return arr.some((v) => v[key] === val[key]);
}) as IncludesFn;
