import { Fn } from './types';

type Callback = Fn<[...any[]], any>;
const _ = new WeakMap();

export function bind<T extends object>(ctx: T, arg?: Callback | keyof T): Callback {
  const fn = typeof arg === 'function' ? arg : <Callback>ctx[arg as never];
  const fns = _.get(ctx) || _.set(ctx, new Map()).get(ctx);
  return fns.get(fn) || fns.set(fn, fn.bind(ctx)).get(fn);
}
