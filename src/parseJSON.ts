export function parseJSON<T = unknown>(value: unknown): T {
  try {
    return JSON.parse(value as string) as T;
  } catch (err) {
    return value as T;
  }
}
