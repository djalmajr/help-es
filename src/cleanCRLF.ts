export function cleanCRLF(value: string) {
  return value.replace(/\r\n|\n|\r|\s+/g, " ");
}
