export function uniq<T extends unknown>(arr: T[]) {
  return [...new Set(arr)];
}
