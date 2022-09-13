import { typeOf } from './typeOf';

export function isRecord<T extends object>(value: unknown): value is T {
  return typeOf(value) === 'object';
}
