export function flow<R extends unknown>(...fns: Function[]) {
  return (x: unknown) => fns.reduce((y, f) => f(y), x) as R;
}
