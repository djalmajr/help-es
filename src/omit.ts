import { curry } from './curry';
import { diff } from './diff';
import { pick, PickFn } from './pick';

interface OmitFn extends PickFn {}

/**
 * TODO: adicionar documentação
 */
export const omit = curry((path: string | string[], obj: any) => {
  const arr = ([] as string[]).concat(path);

  return pick(diff(Object.keys(obj), arr), obj);
}) as OmitFn;
