import { curry } from './curry';

export const uniqBy = curry(<T = any>(key: keyof T, arr: T[]): T[] => {
  return arr.filter((a, i) => arr.findIndex((b) => a[key] === b[key]) === i);
});
