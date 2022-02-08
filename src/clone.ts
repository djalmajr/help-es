import { isObj } from './isObj';

/**
 * http://documentcloud.github.io/underscore-contrib/#snapshot
 *
 * TODO: adicionar documentação
 */
export function clone<T extends object>(data: T): T {
  if (!isObj(data)) {
    return data;
  }

  const res = new (data as any).constructor();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      res[key] = clone(data[key] as any);
    }
  }

  return res;
}
