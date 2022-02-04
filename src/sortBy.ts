import { curry } from './curry';
import { Obj } from './types';

/**
 * TODO: adicionar documentação
 */
export const sortBy = curry(function <T extends Obj>(key: string, a: T, b: T) {
  return (a[key] > b[key] && 1) || (a[key] < b[key] && -1) || 0;
});
