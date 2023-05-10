import { Obj } from './types';

type Search = string | RegExp;
type Replace = string | Parameters<String['replace']>[1];

// @ts-ignore
const str2rx = (str: string) => new RegExp(...str.split('/').filter(Boolean));
const single = (size: number) => [-1, 1].includes(size);
const replace = (rx: Obj, v: string, r?: RegExp): string | void => {
  for (const k in rx) {
    if ((r = str2rx(k)).test(v)) return v.replace(r, rx[k]);
  }
};

export function createPluralize() {
  const rsp: Obj = {};
  const rxs: Obj = {};
  return {
    addPluralRule(search: Search, replace: Replace) {
      rsp[search.toString()] = replace;
    },
    addSingularRule(search: Search, replace: Replace) {
      rxs[search.toString()] = replace;
    },
    plural(word: string, size = 0) {
      return single(size) ? word : replace(rsp, word) || `${word}s`;
    },
    singular(word: string, size = 1) {
      return single(size) ? replace(rxs, word) || word.slice(0, -1) : word;
    },
  };
}
