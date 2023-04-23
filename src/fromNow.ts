import { curry } from './curry';
import { parseDate } from './parseDate';
import { Obj } from './types';

interface Interval {
  divisor: number;
  ge: number;
  text?: string;
  unit: Intl.RelativeTimeFormatUnit;
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

const intervals = [
  { ge: YEAR, divisor: YEAR, unit: 'year' },
  { ge: MONTH, divisor: MONTH, unit: 'month' },
  { ge: WEEK, divisor: WEEK, unit: 'week' },
  { ge: DAY, divisor: DAY, unit: 'day' },
  { ge: HOUR, divisor: HOUR, unit: 'hour' },
  { ge: MINUTE, divisor: MINUTE, unit: 'minute' },
  { ge: 30 * SECOND, divisor: SECOND, unit: 'seconds' },
  { ge: 0, divisor: 1 },
] as Interval[];

const locales: Obj = {
  'en-US': 'in less than a minute',
  'pt-BR': 'menos de um minuto',
};

const translates: Obj = {
  'en-US': {
    recent: {
      past1: 'just now',
      pastN: 'just now',
      future1: 'just now',
      futureN: 'just now',
    },
    second: {
      past1: 'a second ago',
      pastN: '# seconds ago',
      future1: 'in a second',
      futureN: 'in # seconds',
    },
    minute: {
      past1: 'a minute ago',
      pastN: '# minutes ago',
      future1: 'in a minute',
      futureN: 'in # minutes',
    },
    hour: {
      past1: 'an hour ago',
      pastN: '# hours ago',
      future1: 'in an hour',
      futureN: 'in # hours',
    },
    day: {
      past1: 'yesterday',
      pastN: '# days ago',
      future1: 'tomorrow',
      futureN: 'in # days',
    },
    week: {
      past1: 'last week',
      pastN: '# weeks ago',
      future1: 'in a week',
      futureN: 'in # weeks',
    },
    month: {
      past1: 'last month',
      pastN: '# months ago',
      future1: 'in a month',
      futureN: 'in # months',
    },
    year: {
      past1: 'last year',
      pastN: '# years ago',
      future1: 'in a year',
      futureN: 'in # years',
    },
    century: {
      past1: 'last century',
      pastN: '# centuries ago',
      future1: 'in a century',
      futureN: 'in # centuries',
    },
    millenium: {
      past1: 'last millennium',
      pastN: '# millennia ago',
      future1: 'in a millennium',
      futureN: 'in # millennia',
    },
  },
  'pt-BR': {
    recent: {
      past1: 'há pouco tempo',
      pastN: 'há pouco tempo',
      future1: 'há pouco tempo',
      futureN: 'há pouco tempo',
    },
    second: {
      past1: 'há um segundo',
      pastN: 'há # segundos',
      future1: 'em um segundo',
      futureN: 'em # segundos',
    },
    minute: {
      past1: 'há um minuto',
      pastN: 'há # minutos',
      future1: 'in a minute',
      futureN: 'in # minutes',
    },
    hour: {
      past1: 'há uma hora',
      pastN: 'há # horas',
      future1: 'in an hour',
      futureN: 'in # hours',
    },
    day: {
      past1: 'ontem',
      pastN: 'há # dias',
      future1: 'amanhã',
      futureN: 'em # dias',
    },
    week: {
      past1: 'há uma semana',
      pastN: 'há # semanas',
      future1: 'em uma semana',
      futureN: 'em # semanas',
    },
    month: {
      past1: 'há um mês',
      pastN: 'há # meses',
      future1: 'em um mês',
      futureN: 'em # meses',
    },
    year: {
      past1: 'há um ano',
      pastN: 'há # anos',
      future1: 'em um ano',
      futureN: 'em # anos',
    },
    century: {
      past1: 'há um século',
      pastN: 'há # século',
      future1: 'em um século',
      futureN: 'em # séculos',
    },
    millenium: {
      past1: 'há um milênio',
      pastN: 'há # milênios',
      future1: 'em um milênio',
      futureN: 'em # milênios',
    },
  },
};

/**
 * Human readable elapsed or remaining time (example: 3 minutes ago)
 * @author github.com/victornpb
 * @see https://stackoverflow.com/a/67338038/938822
 * @param {string} [lang] Language to format the relative date
 * @param {Date|string} date A Date object, timestamp or string parsable with Date.parse()
 * @return {string} Human readable elapsed or remaining time
 */
function fromNowIntl(lang: string, date: Date | string) {
  const now = new Date(Date.now()).getTime();
  const diff = now - (parseDate(date) || new Date()).getTime();
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });

  for (const interval of intervals) {
    if (Math.abs(diff) >= interval.ge) {
      const x = Math.round(Math.abs(diff) / interval.divisor);
      return interval.unit
        ? rtf.format(diff < 0 ? x : -x, interval.unit)
        : locales[lang] || locales['en-US'];
    }
  }

  return date;
}

/**
 * Human readable elapsed or remaining time (example: 3 minutes ago)
 * @author github.com/victornpb
 * @see https://stackoverflow.com/a/67338038/938822
 * @param {string} [lang] Language to format the relative date
 * @param {Date|string} date A Date object, timestamp or string parsable with Date.parse()
 * @return {string} Human readable elapsed or remaining time
 */
function fromNowAlt(lang: string, date: Date | string) {
  const units = [
    { ...translates[lang].recent, max: 30 * SECOND, divisor: 1 },
    { ...translates[lang].second, max: MINUTE, divisor: SECOND },
    { ...translates[lang].minute, max: HOUR, divisor: MINUTE },
    { ...translates[lang].hour, max: DAY, divisor: HOUR },
    { ...translates[lang].day, max: WEEK, divisor: DAY },
    { ...translates[lang].week, max: 4 * WEEK, divisor: WEEK },
    { ...translates[lang].month, max: YEAR, divisor: MONTH },
    { ...translates[lang].year, max: 100 * YEAR, divisor: YEAR },
    { ...translates[lang].century, max: 1000 * YEAR, divisor: 100 * YEAR },
    { ...translates[lang].millenium, max: Infinity, divisor: 1000 * YEAR },
  ];
  const diff = Date.now() - (parseDate(date) || new Date()).getTime();
  const diffAbs = Math.abs(diff);
  for (const unit of units) {
    if (diffAbs < unit.max) {
      const isFuture = diff < 0;
      const x = Math.round(Math.abs(diff) / unit.divisor);
      if (x <= 1) return isFuture ? unit.future1 : unit.past1;
      return (isFuture ? unit.futureN : unit.pastN).replace('#', x);
    }
  }
}

export const fromNow = curry((lang: string, date: Date | string) => {
  try {
    new Intl.RelativeTimeFormat(lang);
    return fromNowIntl(lang, date);
  } catch (err) {
    return fromNowAlt(lang, date);
  }
});

export const fromNowBR = fromNow('pt-BR');
