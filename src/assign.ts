import { clone } from './clone';
import { curry } from './curry';
import { merge } from './merge';
import { Obj } from './types';

export const assign = curry(<T extends Obj>(target: T, source: T): T => {
  return merge(clone(target), source);
});
