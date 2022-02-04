import { isObj } from './isObj';

export const size = (data: unknown) => {
  if (!isObj(data) && typeof data !== 'string') {
    return 0;
  }

  return (data as any).length;
};
