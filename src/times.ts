export function times(num: number): number[] {
  return Array(num)
    .fill(0)
    .map((_, idx) => idx + 1);
}
