import { Obj } from './types';

/**
 * TODO: adicionar documentação
 */
export function arr2obj<T extends unknown>(
  key: keyof T,
  items?: T[],
  formatKey?: (value: string) => string,
): Obj<T> {
  const fn = formatKey || ((s) => s);

  return (items || []).reduce((r, d) => ({ ...r, [fn(d[key] as any)]: d }), {});
}
