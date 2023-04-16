/**
 * https://github.com/auth0/jwt-decode/blob/master/lib/atob.js
 * https://github.com/davidchambers/Base64.js/blob/master/base64.js
 */

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

class InvalidCharacterError extends Error {
  override name = 'InvalidCharacterError';
}

export function atob(input: string) {
  const str = String(input).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=

  if (str.length % 4 === 1) {
    const message = "'atob' failed: The string to be decoded is not correctly encoded.";
    throw new InvalidCharacterError(message);
  }

  let output = '';

  for (
    let bc = 0, bs = 0, buffer, idx = 0;
    (buffer = str.charAt(idx++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }

  return output;
}
