import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: ["./../bff/src/**/*.graphql"],
  documents: "src/**/*.{ts,tsx}",
  config: {
    useTypeImports: true,
    scalars: {
      DateTime: "Date",
    },
  },
  generates: {
    "./src/gql/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
