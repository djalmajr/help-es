import { curry } from './curry';
import { isObj } from './isObj';
import { size } from './size';
import { Obj } from './types';

const { keys } = Object;

export const isEqual = curry(<T = unknown>(source: T, target: T): boolean => {
  if (!isObj(source) || !isObj(target)) {
    return source === target;
  }

  if (size(source) !== size(target)) {
    return false;
  }

  const src = source as Obj;
  const tgt = target as Obj;

  return keys(src).every((key: string): boolean => {
    if (isObj(src[key]) && isObj(tgt[key])) {
      return isEqual(src[key], tgt[key]);
    }

    return src[key] === tgt[key];
  });
});
