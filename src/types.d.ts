export declare type Fn<A extends any[], R> = (...args: A) => R;

export declare type Obj<T = any> = Record<string, T>;

export declare type ValueOf<T> = T[keyof T];
