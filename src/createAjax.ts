import { merge } from './merge';
import { omit } from './omit';
import { set } from './set';

const parseURL = (slug: string, baseURL = '') => {
  return slug.match(/^(https?)?:?\/\//) ? slug : `${baseURL}/${slug.replace(/^\//, '')}`;
};

type AjaxOptions = {
  baseURL?: string;
  token?: string;
};

type RequestOptions = RequestInit & {
  raw?: boolean;
};

export const createAjax = (opts: AjaxOptions = {}) => ({
  options: {
    baseURL: (() => {
      try {
        return opts.baseURL || location.origin;
      } catch (err) {
        return '/';
      }
    })(),
  } as RequestInit & AjaxOptions,

  async request<T = unknown>(slug: string, { raw, ...init }: RequestOptions = {}): Promise<T> {
    const token = this.options.token?.trim();
    token && merge(init, set('headers.Authorization', `Bearer ${token}`, {}));
    merge(init, set('headers.Accept', '*/*', {}));
    merge(init, omit(['baseURL', 'token'], this.options));

    if (!(init.body instanceof FormData)) {
      switch ((<never>init.headers)['Content-Type']) {
        case 'application/x-www-form-urlencoded':
          init.body = new URLSearchParams(<never>init.body);
          break;
        default:
          merge(init, set('headers.Content-Type', 'application/json', {}));
          init.body = JSON.stringify(init.body);
          break;
      }
    }

    const res = await fetch(parseURL(slug, this.options.baseURL), init);
    if (raw) return <never>res;
    if (res.status < 200 || res.status >= 300) throw res;

    const type = res.headers.get('Content-Type');
    if (/application\/json/.test(type!)) return await res.json();
    if (/application\/octet-stream/.test(type!)) return <never>await res.arrayBuffer();
    if (/(application|audio|image|video)\//.test(type!)) return <never>await res.blob();
    return <never>await res.text();
  },

  get<T = unknown>(url: string, options?: RequestOptions): Promise<T> {
    return this.request(url, { ...options, method: 'get' });
  },

  post<T = unknown>(url: string, data: unknown, options?: RequestOptions): Promise<T> {
    return this.request(url, { ...options, method: 'post', body: <never>data });
  },

  put<T = unknown>(url: string, data: unknown, options?: RequestOptions): Promise<T> {
    return this.request(url, { ...options, method: 'put', body: <never>data });
  },

  delete<T = unknown>(url: string, options?: RequestOptions): Promise<T> {
    return this.request(url, { ...options, method: 'delete' });
  },
});
