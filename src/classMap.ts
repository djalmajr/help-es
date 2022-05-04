import { classNames } from './classNames';
import { Obj } from './types';

export function classMap(value: Obj): string {
  return classNames(Object.keys(value).map((key) => value[key] && key));
}
