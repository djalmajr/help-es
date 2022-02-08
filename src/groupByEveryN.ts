import { curry } from './curry';

interface GroupByEveryNFn {
  (a: number): <B extends unknown[]>(b: B) => B[];
  <B extends unknown[]>(a: number, b: B): B[];
}

/**
 * TODO: adicionar documentação
 */
export const groupByEveryN = curry((num: number, items: unknown[]): unknown[][] => {
  const res = [];
  const arr = [...items];

  while (arr.length > 0) {
    res.push(arr.splice(0, arr.length >= num ? num : arr.length));
  }

  return res;
}) as GroupByEveryNFn;
