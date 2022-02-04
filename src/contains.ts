import { curry } from './curry';
import { latinize } from './latinize';

/**
 * TODO: adicionar documentação
 */
export const contains = curry((text: string, value: string): boolean => {
  return latinize(text).toLowerCase().includes(latinize(value).toLowerCase().trim());
});
