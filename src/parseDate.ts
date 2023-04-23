import { isString } from './isString';

export function parseDate(date?: unknown) {
  if (date instanceof Date) return date;
  if (isString(date)) {
    let arr;
    const rx1 = /^(\d{4})-(\d{2})-(\d{2})/;
    const rx2 = /^(\d{2})\/(\d{2})\/(\d{4})/;
    const getDate = ([y, m, d]: string[]) => {
      const val = new Date(~~y, ~~m - 1, ~~d, 0, 0, 0);
      return ~~m <= 12 && val.getTime() ? val : null;
    };
    if ((arr = date.match(rx1))) return getDate(arr.slice(1, 4));
    if ((arr = date.match(rx2))) return getDate(arr.slice(1, 4).reverse());
  }
  return null;
}
