import { Obj } from './types';

export function styleMap(value: Obj<number | string>): string {
  return Object.keys(value)
    .map((key) => `${key}: ${value[key]}`)
    .join(';');
}
