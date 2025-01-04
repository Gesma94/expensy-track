import type { Meta, StoryObj } from '@storybook/react';
import { InputLabel } from './InputLabel';

const meta: Meta<typeof InputLabel> = {
  title: 'Components/UI/inputs/InputLabel',
  component: InputLabel,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof InputLabel>;

export const Default: Story = {
  args: {
    children: 'Default'
  }
};
