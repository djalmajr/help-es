import Matercolor from 'matercolors';

type Rgb = { r: number; g: number; b: number };

// https://stackoverflow.com/a/9664560/2528550
export const isDarkColor = ({ r, g, b }: Rgb) => {
  const brightness = r * 299 + g * 587 + b * 114;
  return brightness / 250000 >= 0.5;
};

// https://stackoverflow.com/a/5624139/2528550
export const hex2rgb = (hex: string) => {
  const rxShort = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const rxLong = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  hex = hex.replace(rxShort, (_, r, g, b) => r + r + g + g + b + b);
  const [, r, g, b] = rxLong.exec(hex) || [];
  if (!r) return null;
  return { r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16) };
};

// https://stackoverflow.com/a/5624139/2528550
export const rgb2hex = (r: number, g: number, b: number) => {
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
};

const arr = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export function palette(color: string) {
  const pal = new Matercolor(color);
  const res = {} as Record<typeof arr[number], string>;
  return arr.reduce((acc, idx) => ((acc[idx] = pal[idx]), acc), res);
}
