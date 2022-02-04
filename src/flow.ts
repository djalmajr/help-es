export function flow(...fns: Function[]) {
  return (x: unknown) => fns.reduce((y, f) => f(y), x);
}
