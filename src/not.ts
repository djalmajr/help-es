import { isFunction } from './isFunction';
import type { Fn } from './types';

interface NotFn {
  <T extends unknown[], R = unknown>(value: Fn<T, R>): Fn<T, boolean>;
  (value: unknown): boolean;
}

/**
 * TODO: adicionar documentação
 */
export const not = ((value: unknown) => {
  return isFunction(value) ? (...a: unknown[]) => !value(...a) : !value;
}) as NotFn;
