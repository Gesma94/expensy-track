import { getEmojiFromCategoryIcon } from '@common/utils/get-emoji-from-category-icon';
import { Text } from '@components/ui/Text/Text';
import type { ComponentProps } from 'react';
import type { CategoryIcon as CategoryIconGqlEnum } from '../../../../gql/graphql';

type Props = ComponentProps<typeof Text> & {
  icon: CategoryIconGqlEnum;
};

export const CategoryIcon = ({ icon, ...textProps }: Props) => {
  return <Text {...textProps}>{getEmojiFromCategoryIcon(icon)}</Text>;
};
