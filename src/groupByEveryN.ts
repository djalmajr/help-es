import { curry } from './curry';

/**
 * TODO: adicionar documentação
 */
export const groupByEveryN = curry(<T>(num: number, items: T[]): T[][] => {
  const res = [];
  const arr = [...items];

  while (arr.length > 0) {
    res.push(arr.splice(0, arr.length >= num ? num : arr.length));
  }

  return res;
});
