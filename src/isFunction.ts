import { typeOf } from './typeOf';
import type { Fn } from './types';

export function isFunction(value: unknown): value is Fn<unknown[], unknown> {
  return typeOf(value) === 'function';
}
