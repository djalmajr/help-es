import { curry } from './curry';

type Lang = {
  locale: string;
  currency: string;
};

export const formatCurrency = curry((lang: Lang, value: string) => {
  return new Intl.NumberFormat(lang.locale, {
    style: 'currency',
    currency: lang.currency,
  }).format(Number(value));
});

export const formatBRCurrency = formatCurrency({
  locale: 'pt-br',
  currency: 'BRL',
});
