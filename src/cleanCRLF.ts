export function cleanCRLF(value: string): string {
  return value.replace(/\r\n|\n|\r|\s+/g, ' ');
}
