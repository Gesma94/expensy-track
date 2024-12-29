import { IconType } from '@common/enums/icon';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/UI/Icons/Icon',
  component: Icon,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const CaretDown: Story = {
  args: {
    icon: IconType.CaretDown
  }
};
export const Check: Story = {
  args: {
    icon: IconType.Check
  }
};
export const Close: Story = {
  args: {
    icon: IconType.Close
  }
};
export const GitMerge: Story = {
  args: {
    icon: IconType.GitMerge
  }
};
export const NotePencil: Story = {
  args: {
    icon: IconType.NotePencil
  }
};
export const Plus: Story = {
  args: {
    icon: IconType.Plus
  }
};
export const Trash: Story = {
  args: {
    icon: IconType.Trash
  }
};
