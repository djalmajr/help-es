/**
 * TODO: adicionar documentação
 */
export function camelCase(str: string): string {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_m, char) => char.toUpperCase());
}
