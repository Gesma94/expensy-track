import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from 'react-aria-components';
import { SquareRadioInput } from './SquareRadioInput';

const meta: Meta<typeof SquareRadioInput> = {
  title: 'Components/UI/inputs/Radio/SquareRadioInput',
  component: SquareRadioInput,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof SquareRadioInput>;

export const Default: Story = {
  args: {
    value: '🍿',
    children: '🍿'
  },
  decorators: story => (
    <RadioGroup orientation='horizontal' aria-label='Default' className='flex gap-2'>
      {story()}
      <SquareRadioInput value='🍕'>🍕</SquareRadioInput>
    </RadioGroup>
  )
};

export const Disabled: Story = {
  args: {
    value: '🍿',
    children: '🍿',
    isDisabled: true
  },
  decorators: story => (
    <RadioGroup orientation='horizontal' aria-label='Default' className='flex gap-2'>
      {story()}
      <SquareRadioInput value='🍕'>🍕</SquareRadioInput>
    </RadioGroup>
  )
};

export const Invalid: Story = {
  args: {
    value: '🍿',
    children: '🍿'
  },
  decorators: story => (
    <RadioGroup isInvalid={true} orientation='horizontal' aria-label='Default' className='flex gap-2'>
      {story()}
      <SquareRadioInput value='🍕'>🍕</SquareRadioInput>
    </RadioGroup>
  )
};
