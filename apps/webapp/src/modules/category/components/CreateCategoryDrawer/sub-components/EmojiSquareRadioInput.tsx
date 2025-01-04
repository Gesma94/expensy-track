import { getEmojiFromCategoryIcon } from '@common/utils/get-emoji-from-category-icon';
import { SquareRadioInput } from '@components/ui/input/RadioInput/SquareRadioInput';
import type { CategoryIcon as CategoryIconEnum } from '@gql/graphql';

type Props = {
  categoryIcon: CategoryIconEnum;
};

export function EmojiSquareRadioInput({ categoryIcon }: Props) {
  return (
    <SquareRadioInput className='text-2xl' value={categoryIcon}>
      {getEmojiFromCategoryIcon(categoryIcon)}
    </SquareRadioInput>
  );
}
