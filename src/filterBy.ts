import { curry } from './curry';
import { latinize } from './latinize';
import type { Obj } from './types';

export const filterBy = curry((key: string, search: string, val: Obj) => {
  const query = latinize(search).toLowerCase().trim();

  return query ? latinize(val[key] as string).toLowerCase().includes(query) : true;
});
