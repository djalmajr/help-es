export function diff<T = unknown>(arr1: T[], arr2: T[]): T[] {
  return [arr1, arr2].reduce((a, b) => a.filter((c) => !b.includes(c)));
}
