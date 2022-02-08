import { isFn } from './isFn';
import { Fn } from './types';

interface NotFn {
  <T extends unknown[], R extends unknown>(a: Fn<T, R>): Fn<T, boolean>;
  (a: unknown): boolean;
}

/**
 * TODO: adicionar documentação
 */
export const not = ((val: any) => {
  return isFn(val) ? (...a: unknown[]) => !val(...a) : !val;
}) as NotFn;
