/**
 * TODO: adicionar documentação
 */
export function asObject<T extends object>(data: T): T {
  if (!(data instanceof Object)) {
    return data;
  }

  const res = {} as never;

  for (const key in data) {
    res[key] = asObject(data[key] as never);
  }

  return res;
}
