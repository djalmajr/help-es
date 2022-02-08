export function isArr(a: unknown): a is unknown[] {
  return Array.isArray(a);
}
