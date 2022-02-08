export declare type Fn<A extends unknown[], R> = (...args: A) => R;

export declare type Obj<T = any> = Record<string, T>;

export declare type ValueOf<T> = T[keyof T];

/***
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/lodash/common/function.d.ts
 */

export declare interface Curry {
  <T1, R>(func: (t1: T1) => R): Curried1<T1, R>;
  <T1, T2, R>(func: (t1: T1, t2: T2) => R): Curried2<T1, T2, R>;
  // <T1, T2, T3, R>(func: (t1: T1, t2: T2, t3: T3) => R): Curried3<T1, T2, T3, R>;
  // <T1, T2, T3, T4, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4) => R): Curried4<T1, T2, T3, T4, R>;
  // <T1, T2, T3, T4, T5, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R): Curried5<T1, T2, T3, T4, T5, R>;
  // (func: (...args: any[]) => any): (...args: any[]) => any;
}

export declare interface Curried1<T1, R> {
  (): Curried1<T1, R>;
  (t1: T1): R;
}
export declare interface Curried2<T1, T2, R> {
  (): Curried2<T1, T2, R>;
  (t1: T1): Curried1<T2, R>;
  (t1: T1, t2: T2): R;
}

/***
 * https://stackoverflow.com/a/49683575/2528550
 */

export declare type OptionalPropertyNames<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never;
}[keyof T];

export declare type SpreadProperties<L, R, K extends keyof L & keyof R> = {
  [P in K]: L[P] | Exclude<R[P], undefined>;
};

export declare type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

export declare type SpreadTwo<L, R> = Id<
  Pick<L, Exclude<keyof L, keyof R>> &
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

export declare type Spread<A extends readonly [...any]> = A extends [infer L, ...infer R]
  ? SpreadTwo<L, Spread<R>>
  : unknown;
