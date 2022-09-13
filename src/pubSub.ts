import type { Fn, Obj } from './types';

type Callback = Fn<[...any], any>; // eslint-disable-line

export const subscriptions = <Obj<Callback[]>>{};

export const subscribe = (key: string, fn: Callback) => {
  subscriptions[key] ||= [];

  if (!subscriptions[key].includes(fn)) {
    subscriptions[key] = subscriptions[key].concat(fn);
  }

  return () => unsubscribe(key, fn);
};

export const unsubscribe = (key: string, fn: Callback) => {
  subscriptions[key] = subscriptions[key].filter((f: Callback) => f !== fn);
};

export const publish = (key: string, data: Obj<unknown> = {}) => {
  subscriptions[key]?.forEach((fn) => fn(data));
};
