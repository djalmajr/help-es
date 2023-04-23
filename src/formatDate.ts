import { curry } from './curry';
import { parseDate } from './parseDate';

export const createDateFormatter = curry((locale: string, value: Date | string) => {
  const date = parseDate(value);
  return date ? new Intl.DateTimeFormat(locale).format(date) : String(value);
});

export const formatBRDate = createDateFormatter('pt-BR');
