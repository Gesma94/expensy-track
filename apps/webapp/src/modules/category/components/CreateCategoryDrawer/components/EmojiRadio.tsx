import { getEmojiFromCategoryIcon } from '@common/utils/get-emoji-from-category-icon';
import type { CategoryIcon as CategoryIconEnum } from '@gql/graphql';
import { Radio } from 'react-aria-components';
import { tv } from 'tailwind-variants';

const radioStyle = tv({
  base: 'size-16 flex items-center justify-center bg-ghost-white border rounded-lg cursor-pointer',
  variants: {
    isSelected: {
      true: 'border-celtic-blue',
      false: 'border-lavender-blue'
    }
  }
});

type Props = {
  categoryIcon: CategoryIconEnum;
};

export function EmojiRadio({ categoryIcon }: Props) {
  return (
    <Radio className={({ isSelected }) => radioStyle({ isSelected })} value={categoryIcon}>
      <span className='text-2xl font-bold'>{getEmojiFromCategoryIcon(categoryIcon)}</span>
    </Radio>
  );
}
