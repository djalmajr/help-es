import { curry } from './curry';
import { isObject } from './isObject';
import { size } from './size';

const { keys } = Object;

export const isEqual = curry((source: never, target: never): boolean => {
  if (!isObject(source) || !isObject(target)) {
    return source === target;
  }

  if (size(source) !== size(target)) {
    return false;
  }

  return keys(source).every((key: string): boolean => {
    if (isObject(source[key]) && isObject(target[key])) {
      return isEqual(source[key], target[key]);
    }

    return source[key] === target[key];
  });
});
