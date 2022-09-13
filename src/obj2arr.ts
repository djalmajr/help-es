import { Obj } from './types';

/**
 * TODO: adicionar documentação
 */
export function obj2arr<T extends Obj<unknown>>(value: T): [keyof T, T][] {
  return Object.entries(value).map(([k, v]) => [k, v]) as [keyof T, T][];
}
