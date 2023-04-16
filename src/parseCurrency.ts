import { curry } from './curry';

export const parseCurrency = curry((locale: string, value: string) => {
  try {
    // For when the input gets clears
    if (typeof value === 'string' && !value.length) {
      value = '0.00';
    }

    // Detecting and parsing between comma and dot
    const group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
    const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');

    let reversed: string | number = value
      .replace(new RegExp('\\' + group, 'g'), '')
      .replace(new RegExp('\\' + decimal, 'g'), '.') // => 1232.21 €
      .replace(/[^0-9.]/g, ''); // => 1232.21

    const digitsAfterDecimal = (reversed.split('.')[1] || []).length;

    if (digitsAfterDecimal > 2) {
      reversed = (reversed as never) * Math.pow(10, digitsAfterDecimal - 2);
    }

    return Number.isNaN(reversed) ? 0 : reversed;
  } catch (error) {
    return value;
  }
});

export const parseBRCurrency = parseCurrency('pt-br');
