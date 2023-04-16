import { assign } from './assign';
import { merge } from './merge';

const getOptions = assign({
  headers: {
    Accept: '*/*',
  },
});

const parseURL = (slug: string, baseURL = '') => {
  return slug.match(/^(https?)?:?\/\//)
    ? slug
    : `${baseURL}/${slug.replace(/^\//, '')}`;
};

type AjaxOptions = {
  baseURL?: string;
}

export const createAjax = (opts: AjaxOptions = {}) => ({
  options: {
    baseURL: opts.baseURL || (() => {
      try {
        return location.origin;
      } catch (err) {
        return '/';
      }
    })(),
    token: '',
  },

  async request<T = unknown>(slug: string, options: RequestInit = {}): Promise<T> {
    const opts = getOptions(options);
    const url = parseURL(slug, this.options.baseURL);

    if (this.options.token) {
      merge(opts.headers, { Authorization: `Bearer ${this.options.token}` });
    }

    if (!(opts.body instanceof FormData)) {
      switch ((<never>opts.headers)['Content-Type']) {
        case 'application/x-www-form-urlencoded':
          opts.body = new URLSearchParams(<never>opts.body);
          break;
        default:
          merge(opts.headers, { 'Content-Type': 'application/json' });
          opts.body = JSON.stringify(opts.body);
          break;
      }
    }

    const res = await fetch(url, opts);
    if (res.status < 200 || res.status >= 300) {
      throw res;
    }

    const ctype = res.headers.get('Content-Type');
    if (ctype?.includes('application/json')) {
      return await res.json();
    }

    if (ctype?.includes('application/octet-stream')) {
      return <never>await res.arrayBuffer();
    }

    return <never>await res.text();
  },

  get<T = unknown>(url: string, options?: RequestInit): Promise<T> {
    return this.request(url, { ...options, method: 'get' });
  },

  post<T = unknown>(url: string, data: unknown, options?: RequestInit): Promise<T> {
    return this.request(url, { ...options, method: 'post', body: <never>data });
  },

  put<T = unknown>(url: string, data: unknown, options?: RequestInit): Promise<T> {
    return this.request(url, { ...options, method: 'put', body: <never>data });
  },

  delete<T = unknown>(url: string, options?: RequestInit): Promise<T> {
    return this.request(url, { ...options, method: 'delete' });
  },
});
