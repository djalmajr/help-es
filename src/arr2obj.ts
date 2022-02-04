import { Obj } from './types';

/**
 * TODO: adicionar documentação
 */
export function arr2obj<T = unknown>(
  key: keyof T,
  items?: T[],
  formatter?: (value: string) => string,
): Obj<T> {
  const fn = formatter || ((s) => s);

  return (items || []).reduce((r, d) => ({ ...r, [fn(d[key] as any)]: d }), {});
}
