import type { Fn } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flow<R = unknown>(...fns: Fn<[...any], unknown>[]) {
  return (x: unknown) => fns.reduce((y, f) => f(y), x) as R;
}
