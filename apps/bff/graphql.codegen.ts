import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: ['./src/**/*.graphql'],
  config: {
    useTypeImports: true,
    scalars: {
      DateTime: 'Date'
    }
  },
  generates: {
    './src/gql/graphql-generated.ts': {
      plugins: ['typescript', 'typescript-resolvers']
    },
    './src/gql/test-graphql-generated.ts': {
      documents: ['./test/**/*.ts', './src/**/__test__/**/*.ts'],
      plugins: ['typescript', 'typescript-operations']
    }
  }
};

export default config;
