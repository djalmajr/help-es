export function isURL(str: string): boolean {
  try {
    const { protocol } = new URL(str);

    return protocol === 'http:' || protocol === 'https:';
  } catch (o_O) {
    return false;
  }
}
