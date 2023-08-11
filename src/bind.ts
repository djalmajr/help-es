import { Fn } from './types';

type Callback = Fn<[...any[]], any>;
const _ = new WeakMap();
const { defineProperty, getOwnPropertyDescriptor } = Object;

export function bind<T extends object>(ctx: T, arg?: Callback | keyof T) {
  if (arg) {
    const fn = typeof arg === 'function' ? arg : <Callback>ctx[arg as never];
    const fns = _.get(ctx) || _.set(ctx, new Map()).get(ctx);
    return fns.get(fn) || fns.set(fn, fn.bind(ctx)).get(fn);
  }

  for (const key in ctx) {
    const d = getOwnPropertyDescriptor(ctx, key);
    if (d?.get && d?.configurable) {
      defineProperty(ctx, key, { get: d.get.bind(ctx) });
    } else if (typeof ctx[key] === 'function') {
      defineProperty(ctx, key, { value: (ctx[key] as any).bind(ctx) });
    }
  }

  return ctx;
}
