import { bind } from './bind';
import { clone } from './clone';
import { createEmitter } from './createEmitter';
import { isObject } from './isObject';
import { omit } from './omit';
import { guid } from './random';
import { Obj } from './types';

type State<T> = T & {
  dispose(fn: (s: T) => void): void;
  observe(fn: (s: T) => void): () => void;
};

const { emit, on } = createEmitter();
const { defineProperty, getOwnPropertyDescriptor } = Object;

function handler(uid: string) {
  return {
    get(obj: Obj, key: string) {
      if (key === '_isProxy') return true;
      const d = getOwnPropertyDescriptor(obj, key);
      const nok = isObject(obj[key]) && !obj[key]._isProxy && d?.writable;
      nok && (obj[key] = new Proxy(obj[key], handler(uid)));
      return obj[key];
    },
    set(obj: Obj, key: string, val: unknown) {
      if (obj[key] !== val) (obj[key] = val), emit(`update:${uid}`);
      return true;
    },
    deleteProperty(obj: Obj, key: string) {
      delete obj[key];
      emit(`update:${uid}`);
      return true;
    },
  };
}

type Options = {
  immediate?: boolean;
};

export function createState<T extends object>(data?: T, opts?: Options): State<T> {
  const { immediate } = opts || {};
  const fns = <Function[]>[];
  const init = clone(data || {}) as Obj;
  const uid = guid();

  defineProperty(init, 'dispose', {
    value(fn: Function) {
      const idx = fns.findIndex((f) => f === fn);
      idx !== -1 && fns.splice(idx, 1);
    },
  });

  defineProperty(init, 'observe', {
    value(fn: Function) {
      if (!fns.includes(fn)) fns.push(fn);
      return () => init.dispose(fn);
    },
  });

  let nextTickId = 0;
  const state = new Proxy(init, handler(uid));
  on(`update:${uid}`, () => {
    const data = omit(['dispose', 'observe'], state);
    if (immediate) return fns.forEach((fn) => fn(data));
    if (nextTickId) cancelAnimationFrame(nextTickId);
    nextTickId = requestAnimationFrame(() => fns.forEach((fn) => fn(data)));
  });
  emit(`update:${uid}`);

  return bind(state);
}
