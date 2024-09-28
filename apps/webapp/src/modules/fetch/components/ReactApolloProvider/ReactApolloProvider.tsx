import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: `${import.meta.env.VITE_BFF_ADDRESS}/graphql`,
  cache: new InMemoryCache(),
  credentials: "include",
});

export function ReactApolloProvider({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
