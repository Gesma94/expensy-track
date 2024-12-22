import type tailwindConfig from '../../../tailwind.config';

type FlattenColors<T = typeof tailwindConfig.theme.colors> = {
  [K in keyof T]: T[K] extends string
    ? // Case 1: value is a string
      K & string
    : // Case 2: value is a nested object
      T[K] extends Record<string, string>
      ? {
          [P in keyof T[K]]: P extends 'DEFAULT'
            ? // When subkey is "DEFAULT", just use the parent key
              K & string
            : // Otherwise, "parent-subKey"
              `${K & string}-${P & string}`;
        }[keyof T[K]]
      : never;
}[keyof T];

export type TailwindColors = FlattenColors<typeof tailwindConfig.theme.colors>;
