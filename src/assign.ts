import { clone } from './clone';
import { curry } from './curry';
import { merge, MergeFn } from './merge';

export const assign = curry((target: never, source: never) => {
  return merge(clone(target), source);
}) as MergeFn;
