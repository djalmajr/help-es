import { curry } from './curry';

export const createDateFormatter = curry((locale: string, date: Date | string) => {
  return date ? new Intl.DateTimeFormat(locale).format(new Date(date)) : null;
});

export const formatBRDate = createDateFormatter('pt-BR');
