const { defineProperty, getOwnPropertyDescriptor } = Object;

export function bindAll<T extends object>(ctx: T): T {
  for (const key in ctx) {
    const d = getOwnPropertyDescriptor(ctx, key);
    if (d?.get && d?.configurable) {
      defineProperty(ctx, key, { get: d.get.bind(ctx) });
    } else if (typeof ctx[key] === 'function') {
      defineProperty(ctx, key, { value: (ctx[key] as any).bind(ctx) });
    }
  }

  return ctx;
}
