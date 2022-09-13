import { typeOf } from './typeOf';

export function isObject<T = object>(value: unknown): value is T {
  return ['array', 'object'].includes(typeOf(value));
}
