import type { Meta, StoryObj } from '@storybook/react';
import { ActionButton } from './ActionButton';

const meta: Meta<typeof ActionButton> = {
  title: 'Components/UI/Buttons/ActionButton',
  component: ActionButton,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ActionButton>;

export const Default: Story = {
  args: {
    action: 'Default',
    onPress: () => alert('Clicked')
  }
};

export const Disabled: Story = {
  args: {
    action: 'Disabled',
    isDisabled: true,
    onPress: () => alert('Clicked')
  }
};
