/* eslint-disable @typescript-eslint/no-explicit-any */

export declare type PropKey = number | string | symbol;

export declare type Fn<A extends unknown[], R> = (...args: A) => R;

export declare type Obj<T = any> = Record<PropKey, T>;

export declare type ValueOf<T> = T[keyof T];

export declare type Constructor<T> = new (...args: any[]) => T;

/******************************************************************************/

export declare type SameLength<T extends any[]> = Extract<{ [K in keyof T]: any }, any[]>;

export declare type Curried<A extends any[], R> = <P extends Partial<A>>(
  ...args: P
) => P extends A
  ? R
  : A extends [...SameLength<P>, ...infer S]
  ? S extends any[]
    ? Curried<S, R>
    : never
  : never;

/******************************************************************************/

/***
 * https://stackoverflow.com/a/49683575/2528550
 */

export type OptionalPropertyNames<T> = {
  [K in keyof T]-?: Obj extends { [P in K]: T[K] } ? K : never;
}[keyof T];

export type SpreadProperties<L, R, K extends keyof L & keyof R> = {
  [P in K]: L[P] | Exclude<R[P], undefined>;
};

export type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

export type SpreadTwo<L, R> = Id<
  Pick<L, Exclude<keyof L, keyof R>> &
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

export type Spread<A extends readonly [...any]> = A extends [infer L, ...infer R]
  ? SpreadTwo<L, Spread<R>>
  : unknown;

/******************************************************************************/

export declare type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never;

export declare type Tail<T extends any[]> = ((...t: T) => any) extends (
  _: any,
  ...tail: infer TT
) => any
  ? TT
  : [];

export declare type HasTail<T extends any[]> = T extends [] | [any] ? false : true;

export declare type Last<T extends any[]> = {
  0: Last<Tail<T>>;
  1: Head<T>;
}[HasTail<T> extends true ? 0 : 1];

export declare type Length<T extends any[]> = T['length'];

export declare type Prepend<E, T extends any[]> = ((head: E, ...args: T) => any) extends (
  ...args: infer U
) => any
  ? U
  : T;

export declare type Drop<N extends number, T extends any[], I extends any[] = []> = {
  0: Drop<N, Tail<T>, Prepend<any, I>>;
  1: T;
}[Length<I> extends N ? 1 : 0];

export declare type Cast<X, Y> = X extends Y ? X : Y;

export declare type Pos<I extends any[]> = Length<I>;

export declare type Next<I extends any[]> = Prepend<any, I>;

export declare type Prev<I extends any[]> = Tail<I>;

export declare type Iterator<
  Index extends number = 0,
  From extends any[] = [],
  I extends any[] = [],
> = {
  0: Iterator<Index, Next<From>, Next<I>>;
  1: From;
}[Pos<I> extends Index ? 1 : 0];

export declare type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
  0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>;
  1: R;
}[Pos<I> extends Length<T> ? 1 : 0];

export declare type Concat<T1 extends any[], T2 extends any[]> = Reverse<
  Reverse<T1> extends infer R ? Cast<R, any[]> : never,
  T2
>;

export declare type Append<E, T extends any[]> = Concat<T, [E]>;

/******************************************************************************/

// https://github.com/microsoft/TypeScript/issues/32164#issuecomment-764660652
export type Overloads<T> = T extends {
  (...args: infer A1): infer R1;
  (...args: infer A2): infer R2;
  (...args: infer A3): infer R3;
  (...args: infer A4): infer R4;
}
  ? [(...args: A1) => R1, (...args: A2) => R2, (...args: A3) => R3, (...args: A4) => R4]
  : T extends {
      (...args: infer A1): infer R1;
      (...args: infer A2): infer R2;
      (...args: infer A3): infer R3;
    }
  ? [(...args: A1) => R1, (...args: A2) => R2, (...args: A3) => R3]
  : T extends {
      (...args: infer A1): infer R1;
      (...args: infer A2): infer R2;
    }
  ? [(...args: A1) => R1, (...args: A2) => R2]
  : T extends {
      (...args: infer A1): infer R1;
    }
  ? [(...args: A1) => R1]
  : any;

export type OverloadedParameters<T> = Overloads<T> extends infer O
  ? { [K in keyof O]: Parameters<Extract<O[K], (...args: any) => any>> }
  : never;

export type OverloadedReturnType<T> = Overloads<T> extends infer O
  ? { [K in keyof O]: ReturnType<Extract<O[K], (...args: any) => any>> }
  : never;

/******************************************************************************/

/**
 * https://www.freecodecamp.org/news/typescript-curry-ramda-types-f747e99744ab/
 */
export declare namespace Curry {
  type GapOf<
    T1 extends any[],
    T2 extends any[],
    TN extends any[],
    I extends any[],
  > = T1[Pos<I>] extends R.Placeholder ? Append<T2[Pos<I>], TN> : TN;

  type GapsOf<T1 extends any[], T2 extends any[], TN extends any[] = [], I extends any[] = []> = {
    0: GapsOf<T1, T2, GapOf<T1, T2, TN, I> extends infer G ? Cast<G, any[]> : never, Next<I>>;
    1: Concat<TN, Drop<Pos<I>, T2> extends infer D ? Cast<D, any[]> : never>;
  }[Pos<I> extends Length<T1> ? 1 : 0];

  type PartialGaps<T extends any[]> = {
    [K in keyof T]?: T[K] | R.Placeholder;
  };

  type CleanedGaps<T extends any[]> = {
    [K in keyof T]: NonNullable<T[K]>;
  };

  type Gaps<T extends any[]> = CleanedGaps<PartialGaps<T>>;

  type Curry<F extends (...args: any) => any> = <T extends any[]>(
    ...args: Cast<Cast<T, Gaps<Parameters<F>>>, any[]>
  ) => GapsOf<T, Parameters<F>> extends [any, ...any[]]
    ? Curry<
        (
          ...args: GapsOf<T, Parameters<F>> extends infer G ? Cast<G, any[]> : never
        ) => ReturnType<F>
      >
    : ReturnType<F>;
}
