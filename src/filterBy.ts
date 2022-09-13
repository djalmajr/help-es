import { curry } from './curry';
import { latinize } from './latinize';
import { Obj } from './types';

export const filterBy = curry((key: string, search: string, value: Obj<unknown>) => {
  const query = latinize(search).toLowerCase().trim();

  return query
    ? latinize(value[key] as string)
        .toLowerCase()
        .includes(query)
    : true;
});
