import type { MercuriusContext } from 'mercurius';
import type {
  Maybe,
  ResolverFn,
  ResolverWithResolve,
  Resolvers,
  ResolversParentTypes
} from '../../@types/graphql-generated.js';

type ExtractResolverReturnType<T> = T extends ResolverFn<infer TResult, infer _TParent, infer _TContext, infer _TArgs>
  ? NonNullable<TResult>
  : T extends ResolverWithResolve<infer TResult, infer _TParent, infer _TContext, infer _TArgs>
    ? NonNullable<TResult>
    : never;

type ExtractArgs<T> = T extends ResolverFn<infer _TResult, infer _TParent, infer _TContext, infer TArgs>
  ? NonNullable<TArgs>
  : T extends ResolverWithResolve<infer _TResult, infer _TParent, infer _TContext, infer TArgs>
    ? NonNullable<TArgs>
    : Record<string, never>;

type LoaderQueriesArg<TObj extends keyof ResolversParentTypes, TParams> = Array<{
  obj: ResolversParentTypes[TObj];
  params: TParams;
}>;

export type MercuriusLoaderTyped<TContext = MercuriusContext> = {
  [K in keyof Resolvers<TContext>]: {
    [Field in keyof Required<Resolvers<TContext>>[K]]: (
      queries: LoaderQueriesArg<K, ExtractArgs<Required<Resolvers<TContext>>[K][Field]>>,
      context: TContext
    ) => Promise<Array<Maybe<ExtractResolverReturnType<Required<Resolvers<TContext>>[K][Field]>>>>;
  };
};
