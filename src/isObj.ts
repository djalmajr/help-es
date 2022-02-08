export function isObj(a: unknown): a is object {
  return a !== null && typeof a === 'object';
}
