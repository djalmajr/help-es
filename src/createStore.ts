import { createEmitter } from './createEmitter';
import { isFunction } from './isFunction';
import { isObject } from './isObject';
import { omit } from './omit';
import { Obj } from './types';

const { emit, on } = createEmitter();

const handler = () => ({
  get(obj: Obj, key: string) {
    if (key === '_isProxy') return true;
    const d = Object.getOwnPropertyDescriptor(obj, key);
    const nok = isObject(obj[key]) && !obj[key]._isProxy && d?.writable;
    nok && (obj[key] = new Proxy(obj[key], handler()));
    return obj[key];
  },
  set(obj: Obj, key: string, val: unknown) {
    if (obj[key] !== val) (obj[key] = val), emit('update');
    return true;
  },
  deleteProperty(obj: Obj, key: string) {
    delete obj[key];
    emit('update');
    return true;
  },
});

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
  const store = new Proxy(Object.assign(init as never, { subscribe }), handler());
  on('update', () => {
    const data = omit('subscribe', store);
    if (nextTickId) cancelAnimationFrame(nextTickId);
    nextTickId = requestAnimationFrame(() => fns.forEach((fn) => fn(data)));
  });

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
