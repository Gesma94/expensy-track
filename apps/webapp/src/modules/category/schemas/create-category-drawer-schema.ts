import { CategoryIcon as CategoryIconEnum, CategoryType } from '@gql/graphql';
import { z } from 'zod';

export const createCategoryDrawerSchema = z.object({
  color: z.string().min(1, 'Please select a color'),
  parentId: z.string().optional(),
  type: z
    .nativeEnum(CategoryType)
    .or(z.literal(''))
    .refine(value => value !== '' && Object.values(CategoryType).includes(value), 'Please select the type of category'),
  icon: z
    .nativeEnum(CategoryIconEnum)
    .or(z.literal(''))
    .refine(value => value !== '' && Object.values(CategoryIconEnum).includes(value), 'Please select an icon'),
  displayName: z.string().min(1, 'Please add a name')
});

export type CreateCategoryDrawerSchema = z.infer<typeof createCategoryDrawerSchema>;
