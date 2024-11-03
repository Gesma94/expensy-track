import { useMemo } from 'react';

type ReturnType = {
  bffAddress: string;
  graphqlEndpoint: string;
};

export function useEnv(): ReturnType {
  if (!import.meta.env.VITE_BFF_ADDRESS) {
    throw new Error("no 'VITE_BFF_ADDRESS' env variable found");
  }

  const returnValueMemoized = useMemo<ReturnType>(
    () => ({
      bffAddress: import.meta.env.VITE_BFF_ADDRESS,
      graphqlEndpoint: `${import.meta.env.VITE_BFF_ADDRESS}/graphql`
    }),
    []
  );

  return returnValueMemoized;
}
