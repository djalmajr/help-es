export function copy(src: any): any {
  return (src as any).pop ? [...src] : { ...src };
}
