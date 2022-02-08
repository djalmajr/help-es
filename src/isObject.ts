export function isObject(a: unknown): a is object {
  return typeof a === 'object' && a !== null;
}
