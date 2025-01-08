import type { Meta, StoryObj } from '@storybook/react';
import { ColorPickerSwatch } from './ColorPickerSwatch';

const meta: Meta<typeof ColorPickerSwatch> = {
  title: 'Components/UI/inputs/ColorPickerSwatch',
  component: ColorPickerSwatch,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ColorPickerSwatch>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    value: '#957109'
  }
};
