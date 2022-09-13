import { Fn } from './types';

type Callback = Fn<[...any[]], any>; // eslint-disable-line

const _ = new WeakMap();

export function bind<T extends object>(ctx: T, cb: Callback | keyof T) {
  const fn = typeof cb === 'function' ? cb : <Callback>ctx[cb as never];
  const fns = _.get(ctx) || _.set(ctx, new Map()).get(ctx);

  return fns.get(fn) || fns.set(fn, fn.bind(ctx)).get(fn);
}
