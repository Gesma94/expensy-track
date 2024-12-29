import { IconType } from '@common/enums/icon';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Buttons/Button',
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

export const DisabledPrimary: Story = {
  args: {
    isDisabled: true,
    variant: 'primary',
    children: 'Disabled button'
  }
};

export const DisabledOutline: Story = {
  args: {
    isDisabled: true,
    variant: 'outline',
    children: 'Disabled button'
  }
};

export const DisabledGhost: Story = {
  args: {
    isDisabled: true,
    variant: 'ghost',
    children: 'Disabled button'
  }
};

export const LoadingPrimary: Story = {
  args: {
    isLoading: true,
    variant: 'primary',
    children: 'Loading button'
  }
};

export const LoadingOutline: Story = {
  args: {
    isLoading: true,
    variant: 'outline',
    children: 'Loading button'
  }
};

export const LoadingGhost: Story = {
  args: {
    isLoading: true,
    variant: 'ghost',
    children: 'Loading button'
  }
};

export const IconBeforePrimary: Story = {
  args: {
    iconBefore: IconType.NotePencil,
    variant: 'primary',
    children: 'button'
  }
};

export const IconBeforeOutline: Story = {
  args: {
    iconBefore: IconType.NotePencil,
    variant: 'outline',
    children: 'button'
  }
};

export const IconBeforeGhost: Story = {
  args: {
    iconBefore: IconType.NotePencil,
    variant: 'ghost',
    children: 'button'
  }
};

export const IconBeforeLoadingPrimary: Story = {
  args: {
    isLoading: true,
    iconBefore: IconType.NotePencil,
    variant: 'primary',
    children: 'button'
  }
};

export const IconBeforeLoadingOutline: Story = {
  args: {
    isLoading: true,
    iconBefore: IconType.NotePencil,
    variant: 'outline',
    children: 'button'
  }
};

export const IconBeforeLoadingGhost: Story = {
  args: {
    isLoading: true,
    iconBefore: IconType.NotePencil,
    variant: 'ghost',
    children: 'button'
  }
};

export const LoadingDisabledPrimary: Story = {
  args: {
    isLoading: true,
    isDisabled: true,
    variant: 'primary',
    children: 'Loading button'
  }
};

export const LoadingDisabledOutline: Story = {
  args: {
    isLoading: true,
    isDisabled: true,
    variant: 'outline',
    children: 'Loading button'
  }
};

export const LoadingDisabledGhost: Story = {
  args: {
    isLoading: true,
    isDisabled: true,
    variant: 'ghost',
    children: 'Loading button'
  }
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    variant: 'primary',
    children: 'Full Width'
  }
};
