import { Fn } from './types';

export function flow<R = unknown>(...fns: Fn<unknown[], unknown>[]) {
  return (x: unknown) => fns.reduce((y, f) => f(y), x) as R;
}
