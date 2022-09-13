import { isFunction } from './isFunction';
import { isObject } from './isObject';
import { omit } from './omit';
import { Fn, Obj } from './types';

type Callback = Fn<[...any[]], any>; // eslint-disable-line

const handler = (callback: Callback) => {
  return {
    get(obj: Obj, prop: string) {
      if (prop === '_isProxy') {
        return true;
      }

      const d = Object.getOwnPropertyDescriptor(obj, prop);

      if (isObject(obj[prop]) && !isFunction(obj[prop]) && !obj[prop]._isProxy && d?.writable) {
        obj[prop] = new Proxy(obj[prop], handler(callback));
      }

      return obj[prop];
    },

    set(obj: Obj, prop: string, value: unknown) {
      if (obj[prop] !== value) {
        obj[prop] = value;
        callback(obj);
      }

      return true;
    },

    deleteProperty(obj: Obj, prop: string) {
      delete obj[prop];
      callback(obj);
      return true;
    },
  };
};

export const createStore = (init: Obj = {}) => {
  const fns = <Callback[]>[];

  const subscribe = (fn: Callback) => {
    if (!fns.includes(fn)) {
      fns.push(fn);
    }

    return () => {
      const idx = fns.findIndex((l) => l === fn);

      idx !== -1 && fns.splice(idx, 1);
    };
  };

  let nextTickId = 0;

  const store = new Proxy(
    Object.assign(init, { subscribe }),
    handler((state: Obj) => {
      if (nextTickId) {
        cancelAnimationFrame(nextTickId);
      }

      nextTickId = requestAnimationFrame(() => {
        fns.forEach((fn) => fn(omit('subscribe', state)));
      });
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
        value: init[prop].bind(store),
        configurable: false,
        writable: false,
      });
    }
  }

  return store;
};
