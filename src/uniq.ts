export function uniq<T = unknown>(arr: T[]) {
  return [...new Set(arr)];
}
