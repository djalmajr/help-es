import { isObject } from './isObject';
import { Any } from './types';

/**
 * http://documentcloud.github.io/underscore-contrib/#snapshot
 *
 * TODO: adicionar documentação
 */
export function clone<T extends object>(data: T): T {
  if (!isObject(data)) {
    return data;
  }

  const res = new (data as Any).constructor();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      res[key] = clone(data[key] as never);
    }
  }

  return res;
}
