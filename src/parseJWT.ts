import { atob } from './atob';

/**
 * Decode a JWT payload
 *
 * https://stackoverflow.com/a/38552302
 */
export function parseJWT(token: string) {
  const map = (s: string) => '%' + ('00' + s.charCodeAt(0).toString(16)).slice(-2);
  const str = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(decodeURIComponent(atob(str).split('').map(map).join('')));
}
