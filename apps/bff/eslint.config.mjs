import rootConfig from "./../../eslint.config.mjs";
import graphqlEslint from "@graphql-eslint/eslint-plugin";

export default [
  ...rootConfig,

  {
    ignores: ["src/@types/mercurius-generated.ts"],
  },

  {
    files: ["*.graphql"],
    languageOptions: {
      parser: graphqlEslint,
    },
    plugins: {
      "@graphql-eslint": graphqlEslint,
    },
  },
];