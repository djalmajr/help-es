/**
 * TODO: adicionar documentação
 */
export function latinize(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
