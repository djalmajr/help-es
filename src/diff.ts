import { curry } from './curry';

interface DiffFn {
  <A extends unknown[]>(a: A): <B extends unknown[]>(b: B) => [...A, ...B];
  <A extends unknown[], B extends unknown[]>(a: A, b: B): [...A, ...B];
}

export const diff = curry((a: never[], b: never[]) => {
  return [a, b].reduce((c, d) => c.filter((e) => !d.includes(e)));
}) as DiffFn;
