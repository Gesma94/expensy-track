import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/UI/inputs/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {};

export const Squared: Story = {
  args: {
    className: 'w-48'
  }
};

export const Disabled: Story = {
  args: {
    value: '#957109',
    isDisabled: true
  }
};
