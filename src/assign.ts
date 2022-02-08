import { clone } from './clone';
import { curry } from './curry';
import { merge, MergeFn } from './merge';

export const assign = curry((target: any, source: any) => {
  return merge(clone(target), source);
}) as MergeFn;
