export declare type Any = any; // eslint-disable-line

export declare type Fn<A extends unknown[], R> = (...args: A) => R;

export declare type Obj<T = unknown> = Record<string, T>;

export declare type ValueOf<T> = T[keyof T];

export declare type Head<T extends Any[]> = T extends [Any, ...Any[]] ? T[0] : never;

export declare type Tail<T extends Any[]> = ((...t: T) => Any) extends (
  _: Any,
  ...tail: infer TT
) => Any
  ? TT
  : [];

export declare type HasTail<T extends Any[]> = T extends [] | [Any] ? false : true;

export declare type Last<T extends Any[]> = {
  0: Last<Tail<T>>;
  1: Head<T>;
}[HasTail<T> extends true ? 0 : 1];

export declare type Length<T extends Any[]> = T['length'];

export declare type Prepend<E, T extends Any[]> = ((head: E, ...args: T) => Any) extends (
  ...args: infer U
) => Any
  ? U
  : T;

export declare type Drop<N extends number, T extends Any[], I extends Any[] = []> = {
  0: Drop<N, Tail<T>, Prepend<Any, I>>;
  1: T;
}[Length<I> extends N ? 1 : 0];

export declare type Cast<X, Y> = X extends Y ? X : Y;

export declare type Pos<I extends Any[]> = Length<I>;

export declare type Next<I extends Any[]> = Prepend<Any, I>;

export declare type Prev<I extends Any[]> = Tail<I>;

export declare type Iterator<
  Index extends number = 0,
  From extends Any[] = [],
  I extends Any[] = [],
> = {
  0: Iterator<Index, Next<From>, Next<I>>;
  1: From;
}[Pos<I> extends Index ? 1 : 0];

export declare type Reverse<T extends Any[], R extends Any[] = [], I extends Any[] = []> = {
  0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>;
  1: R;
}[Pos<I> extends Length<T> ? 1 : 0];

export declare type Concat<T1 extends Any[], T2 extends Any[]> = Reverse<
  Reverse<T1> extends infer R ? Cast<R, Any[]> : never,
  T2
>;

export declare type Append<E, T extends Any[]> = Concat<T, [E]>;

/**
 * https://www.freecodecamp.org/news/typescript-curry-ramda-types-f747e99744ab/
 */
export declare namespace Curry {
  type GapOf<
    T1 extends Any[],
    T2 extends Any[],
    TN extends Any[],
    I extends Any[],
  > = T1[Pos<I>] extends R.Placeholder ? Append<T2[Pos<I>], TN> : TN;

  type GapsOf<T1 extends Any[], T2 extends Any[], TN extends Any[] = [], I extends Any[] = []> = {
    0: GapsOf<T1, T2, GapOf<T1, T2, TN, I> extends infer G ? Cast<G, Any[]> : never, Next<I>>;
    1: Concat<TN, Drop<Pos<I>, T2> extends infer D ? Cast<D, Any[]> : never>;
  }[Pos<I> extends Length<T1> ? 1 : 0];

  type PartialGaps<T extends Any[]> = {
    [K in keyof T]?: T[K] | R.Placeholder;
  };

  type CleanedGaps<T extends Any[]> = {
    [K in keyof T]: NonNullable<T[K]>;
  };

  type Gaps<T extends Any[]> = CleanedGaps<PartialGaps<T>>;

  type Curry<F extends (...args: Any) => Any> = <T extends Any[]>(
    ...args: Cast<Cast<T, Gaps<Parameters<F>>>, Any[]>
  ) => GapsOf<T, Parameters<F>> extends [Any, ...Any[]]
    ? Curry<
        (
          ...args: GapsOf<T, Parameters<F>> extends infer G ? Cast<G, Any[]> : never
        ) => ReturnType<F>
      >
    : ReturnType<F>;
}
