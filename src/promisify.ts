import { Fn } from './types';

/**
 * TODO: adicionar documentação
 */
export function promisify(fn: Fn<[...unknown[]], unknown>, hasOptions?: boolean) {
  return function (this: unknown, ...args: unknown[]) {
    return new Promise((rsv, rjc) => {
      if (hasOptions) { fn.call(this, rsv, rjc, args[0]); return; }
      args.push((err: Error, res: unknown) => (err ? rjc(err) : rsv(res)));
      fn.call(this, ...args);
    });
  };
}
