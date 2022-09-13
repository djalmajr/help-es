import { typeOf } from './typeOf';

export const size = (value: unknown): number => {
  switch (typeOf(value)) {
    case 'array':
    case 'object':
      return Object.keys(value as object).length;

    case 'map':
    case 'set':
      return (value as Map<never, never>).size;

    case 'string':
      return (value as string).length;
  }

  return 0;
};
