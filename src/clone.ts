import { isObj } from './isObj';
import { Obj } from './types';

/**
 * http://documentcloud.github.io/underscore-contrib/#snapshot
 *
 * TODO: adicionar documentação
 */
export function clone<T extends Obj>(data: T): T {
  if (!isObj(data)) {
    return data;
  }

  const res = new (data as any).constructor();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      res[key] = clone(data[key]);
    }
  }

  return res;
}
