import type { Meta, StoryObj } from '@storybook/react';
import { SpinLoader } from './SpinLoader';

const meta: Meta<typeof SpinLoader> = {
  title: 'Components/UI/Loaders/SpinLoaders',
  component: SpinLoader,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof SpinLoader>;

export const Default: Story = {
  decorators: story => <div className='bg-background-dark inline-block p-4'>{story()}</div>
};

export const CustomColor: Story = {
  args: {
    color: 'secondary'
  },
  decorators: story => <div className='bg-background-dark inline-block p-4'>{story()}</div>
};

export const SmallSize: Story = {
  args: {
    size: 'small'
  },
  decorators: story => <div className='bg-background-dark inline-block p-4'>{story()}</div>
};

export const LargeSize: Story = {
  args: {
    size: 'large'
  },
  decorators: story => <div className='bg-background-dark inline-block p-4'>{story()}</div>
};
