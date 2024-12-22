import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Button>;

export const DefaultVariant: Story = {
  args: {
    variant: 'outline',
    children: 'Default button'
  },
  name: 'Default',
  tags: ['wewe']
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary button'
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost button'
  }
};

export const Small: Story = {
  args: {
    size: 'small',
    variant: 'primary',
    children: 'Small button'
  }
};

export const DefaultSize: Story = {
  args: {
    size: 'default',
    variant: 'primary',
    children: 'Default button'
  }
};

export const Large: Story = {
  args: {
    size: 'large',
    variant: 'primary',
    children: 'Large button'
  }
};

export const Disabled: Story = {
  args: {
    size: 'large',
    isDisabled: true,
    variant: 'primary',
    children: 'Large button'
  }
};

export const Loading: Story = {
  args: {
    size: 'large',
    isLoading: true,
    variant: 'primary',
    children: 'Large button'
  }
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    variant: 'primary',
    children: 'Full Width'
  }
};
