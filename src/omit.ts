import { curry } from './curry';
import { PickFn } from './pick';

/**
 * TODO: adicionar documentação
 */
export const omit = curry((path: string | string[], value: object) => {
  const keys = ([] as string[]).concat(path);
  return Object.keys(value).reduce((r, k) => {
    const v = value[k as keyof typeof value];
    return keys.includes(k) || v === undefined ? r : { ...r, [k]: v };
  }, {});
}) as PickFn;
