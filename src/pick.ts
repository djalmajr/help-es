import { curry } from './curry';

export interface PickFn {
  (a: string | string[]): <B extends object>(b: B) => Partial<B>;
  <B extends object>(a: string | string[], b: B): Partial<B>;
}

/**
 * TODO: adicionar documentação
 */
export const pick = curry((path: string | string[], value: object) => {
  return ([] as string[]).concat(path).reduce((r, k) => {
    const v = value[k as keyof typeof value];

    return v === undefined ? r : { ...r, [k]: v };
  }, {});
}) as PickFn;
