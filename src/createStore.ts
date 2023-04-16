import { isFunction } from './isFunction';
import { isObject } from './isObject';
import { Obj } from './types';

function handler(callback: Function) {
  return {
    get(obj: Obj, key: string) {
      if (key === '_isProxy') return true;
      const d = Object.getOwnPropertyDescriptor(obj, key);
      const ok = isObject(obj[key]) && !obj[key]._isProxy && d?.writable;
      ok && (obj[key] = new Proxy(obj[key], handler(callback)));
      return obj[key];
    },
    set(obj: Obj, key: string, val: unknown) {
      if (obj[key] !== val) (obj[key] = val), callback(obj);
      return true;
    },
    deleteProperty(obj: Obj, key: string) {
      delete obj[key];
      callback(obj);
      return true;
    },
  };
}

export function createStore<T = Obj>(init: T): T & { subscribe(fn: (s: T) => void): () => never } {
  const fns = <Function[]>[];
  const subscribe = (fn: Function) => {
    if (!fns.includes(fn)) fns.push(fn);
    return () => {
      const idx = fns.findIndex((l) => l === fn);
      idx !== -1 && fns.splice(idx, 1);
    };
  };

  let nextTickId = 0;
  const store = new Proxy(
    Object.assign(init as never, { subscribe }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handler(({ subscribe, ...data }: Obj) => {
      if (nextTickId) cancelAnimationFrame(nextTickId);
      nextTickId = requestAnimationFrame(() => fns.forEach((fn) => fn(data)));
    }),
  );

  for (const prop in init) {
    const d = Object.getOwnPropertyDescriptor(init, prop);
    if (d?.get && d?.configurable) {
      Object.defineProperty(init, prop, {
        get: d.get.bind(store),
        configurable: false,
      });
    } else if (isFunction(init[prop])) {
      Object.defineProperty(init, prop, {
        value: (init[prop] as any).bind(store),
        configurable: false,
        writable: false,
      });
    }
  }

  return store as never;
}
