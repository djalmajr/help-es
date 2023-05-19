import { clone } from './clone';
import { createEmitter } from './createEmitter';
import { isFunction } from './isFunction';
import { isObject } from './isObject';
import { omit } from './omit';
import { Obj } from './types';

type Store<T> = T & { subscribe(fn: (s: T) => void): () => never };

const { emit, on } = createEmitter();
const { defineProperty, getOwnPropertyDescriptor } = Object;

function handler() {
  return {
    get(obj: Obj, key: string) {
      if (key === '_isProxy') return true;
      const d = getOwnPropertyDescriptor(obj, key);
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
  };
}

type Options = {
  immediate?: boolean;
};

export function createStore<T extends object>(data: T, opts?: Options): Store<T> {
  const { immediate } = opts || {};
  const fns = <Function[]>[];
  const init = clone(data);

  defineProperty(init, 'subscribe', {
    value(fn: Function) {
      if (!fns.includes(fn)) fns.push(fn);
      return () => {
        const idx = fns.findIndex((l) => l === fn);
        idx !== -1 && fns.splice(idx, 1);
      };
    },
  });

  let nextTickId = 0;
  const store = new Proxy(init, handler());
  on('update', () => {
    const data = omit('subscribe', store);
    if (immediate) return fns.forEach((fn) => fn(data));
    if (nextTickId) cancelAnimationFrame(nextTickId);
    nextTickId = requestAnimationFrame(() => fns.forEach((fn) => fn(data)));
  });

  for (const prop in init) {
    const d = getOwnPropertyDescriptor(init, prop);
    if (d?.get && d?.configurable) {
      defineProperty(init, prop, {
        get: d.get.bind(store),
      });
    } else if (isFunction(init[prop])) {
      defineProperty(init, prop, {
        value: (init[prop] as any).bind(store),
      });
    }
  }

  return store as Store<T>;
}
