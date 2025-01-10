import { getEmojiFromCategoryIcon } from '@common/utils/get-emoji-from-category-icon';
import { Text } from '@components/ui/Text/Text';
import { Option } from '@components/ui/field-inputs/FieldSelect/FieldSelect';
import type { CategoryListElementFragment } from '@gql/graphql';

type Props = {
  category: CategoryListElementFragment;
  otherCategoryId: string | null | undefined;
};

export function CategoryOption({ category, otherCategoryId }: Props) {
  if (category.id === otherCategoryId) {
    return null;
  }

  return (
    <Option id={category.id} key={category.id} textValue={category.displayName}>
      <Text slot='label'>
        {getEmojiFromCategoryIcon(category.icon)} {category.displayName}
      </Text>
    </Option>
  );
}
