import { isObject } from './isObject';

/**
 * http://documentcloud.github.io/underscore-contrib/#snapshot
 *
 * TODO: adicionar documentação
 */
export function clone<T extends object>(data: T): T {
  if (!isObject(data)) {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = new (data as any).constructor();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      res[key] = clone(data[key] as never);
    }
  }

  return res;
}
