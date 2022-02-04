import { Fn } from './types';

/**
 * TODO: adicionar documentação
 */
export function not<T extends any[], R>(value: unknown | Fn<T, R>): boolean | Fn<T, boolean> {
  return typeof value === 'function' ? (...args: T) => !value(...args) : !value;
}
