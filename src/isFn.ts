import { Fn } from './types';

export function isFn(a: unknown): a is Fn<unknown[], unknown> {
  return typeof a === 'function';
}
