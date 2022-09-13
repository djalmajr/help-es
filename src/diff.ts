import { curry } from './curry';

interface DiffFn {
  <A extends unknown[]>(target: A): <B extends unknown[]>(source: B) => [...A, ...B];
  <A extends unknown[], B extends unknown[]>(target: A, source: B): [...A, ...B];
}

export const diff = curry((target: never[], source: never[]) => {
  return [source, target].reduce((a, b) => a.filter((c) => !b.includes(c)));
}) as DiffFn;
