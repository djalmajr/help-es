import { assign } from './assign';
import { merge } from './merge';

const getOptions = assign({
  headers: {
    Accept: '*/*',
  },
});

const parseURL = (slug: string, baseURL = '') => {
  return slug.match(/^(https?)?:?\/\//) ? slug : `${baseURL}/${slug.replace(/^\//, '')}`;
};

type AjaxOptions = {
  baseURL?: string;
};

type RequestOptions = RequestInit & {
  raw?: boolean;
};

export const createAjax = (opts: AjaxOptions = {}) => ({
  options: {
    // prettier-ignore
    baseURL: opts.baseURL || (() => {
      try {
        return location.origin;
      } catch (err) {
        return '/';
      }
    })(),
    token: '',
  },

  async request<T = unknown>(slug: string, options: RequestOptions = {}): Promise<T> {
    const cfg = getOptions(options);
    const url = parseURL(slug, this.options.baseURL);

    if (this.options.token) {
      merge(cfg.headers, { Authorization: `Bearer ${this.options.token}` });
    }

    if (!(cfg.body instanceof FormData)) {
      switch ((<never>cfg.headers)['Content-Type']) {
        case 'application/x-www-form-urlencoded':
          cfg.body = new URLSearchParams(<never>cfg.body);
          break;
        default:
          merge(cfg.headers, { 'Content-Type': 'application/json' });
          cfg.body = JSON.stringify(cfg.body);
          break;
      }
    }

    const res = await fetch(url, cfg);
    if (cfg.raw) return <never>res;
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
