/**
 * TODO: adicionar documentação
 */
export function isEmpty(data: unknown): boolean {
  if (typeof data === 'object' && data !== null) {
    return !Object.keys(data || {}).length;
  }

  return !data;
}
