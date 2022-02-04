import { Obj } from './types';

/**
 * TODO: adicionar documentação
 */
export function obj2arr<T extends Obj>(obj: T): [keyof T, T][] {
  return Object.entries(obj || {}).map(([k, v]) => [k, v]);
}
