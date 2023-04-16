import { uniq } from './uniq';

export function classNames(...args: unknown[]) {
  const cnames = args
    .filter(Boolean)
    .map(String)
    .join(' ')
    .split(/\r\n|\n|\r|\s+/)
    .filter(Boolean);
  return uniq(cnames).join(' ');
}
