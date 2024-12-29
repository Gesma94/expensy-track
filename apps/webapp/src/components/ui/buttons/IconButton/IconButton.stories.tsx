import { IconType } from '@common/enums/icon';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/UI/Buttons/IconButton',
  component: IconButton,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const GhostVariant: Story = {
  args: {
    variant: 'ghost',
    icon: IconType.NotePencil
  }
};
