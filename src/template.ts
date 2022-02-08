import { curry } from './curry';
import { get } from './get';

const regex = /{{(.+?)}}/g;

interface FnTemplate {
  <T extends object>(str: string, obj: T): string;
  <T extends object>(str: string): (obj: T) => string;
  test(str: string): boolean;
}

export const template: FnTemplate = curry((str: string, obj: any) => {
  return str.replace(regex, (_, k) => get(k, obj) || '');
}) as FnTemplate;

template.test = (str: string) => regex.test(str);
