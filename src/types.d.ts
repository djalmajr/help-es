export declare type Fn<A extends unknown[], R> = (...args: A) => R;

export declare type Obj<T = unknown> = Record<string, T>;

export declare type ValueOf<T> = T[keyof T];

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
