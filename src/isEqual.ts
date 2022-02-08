import { curry } from './curry';
import { isObject } from './isObject';
import { size } from './size';

const { keys } = Object;

export const isEqual = curry((source: object, target: object): boolean => {
  if (!isObject(source) || !isObject(target)) {
    return source === target;
  }

  if (size(source) !== size(target)) {
    return false;
  }

  const src = source as any;
  const tgt = target as any;

  return keys(src).every((key: string): boolean => {
    if (isObject(src[key]) && isObject(tgt[key])) {
      return isEqual(src[key], tgt[key]);
    }

    return src[key] === tgt[key];
  });
});
