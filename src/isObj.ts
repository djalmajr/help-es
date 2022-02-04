export function isObj(a: unknown): a is Record<string, any> {
  return a !== null && typeof a === 'object';
}
