import { camelCase } from './camelCase';

/**
 * TODO: adicionar documentação
 */
export function pascalCase(str: string): string {
  return camelCase(' ' + str);
}
