import { getEmojiFromCategoryIcon } from '@common/utils/get-emoji-from-category-icon';
import type { CategoryIcon as CategoryIconEnum } from '@gql/graphql';
import { Radio } from 'react-aria-components';
import { tv } from 'tailwind-variants';

const radioStyle = tv({
  base: 'size-16 flex items-center justify-center bg-background-white border rounded-lg transition-colors duration-500 ',
  variants: {
    isSelected: {
      true: 'border-secondary border-2',
      false: 'border-edge-light-default cursor-pointer'
    },
    isHovered: {
      true: '',
      false: ''
    },
    isPressed: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    {
      isSelected: false,
      isHovered: true,
      className: 'bg-background-white-hover'
    },
    {
      isSelected: false,
      isPressed: true,
      className: 'bg-background-white-active'
    }
  ]
});

type Props = {
  categoryIcon: CategoryIconEnum;
};

export function EmojiRadio({ categoryIcon }: Props) {
  return (
    <Radio
      className={({ isSelected, isHovered, isPressed }) => radioStyle({ isSelected, isHovered, isPressed })}
      value={categoryIcon}
    >
      <span className='text-2xl font-bold'>{getEmojiFromCategoryIcon(categoryIcon)}</span>
    </Radio>
  );
}
