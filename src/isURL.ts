export function isURL(str: string): boolean {
  try {
    return /^https?/.test(new URL(str).protocol);
  } catch (o_O) {
    return false;
  }
}
