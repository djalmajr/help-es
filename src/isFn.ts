export function isFn(a: unknown): a is (...b: unknown[]) => unknown {
  return typeof a === 'function';
}
