import { typeOf } from './typeOf';

export function isString(value: unknown): value is string {
  return typeOf(value) === 'string';
}
