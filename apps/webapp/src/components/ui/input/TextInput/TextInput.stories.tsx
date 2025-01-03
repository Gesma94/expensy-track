import { IconType } from '@common/enums/icon';
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from 'react-aria-components';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/UI/inputs/TextInput',
  component: TextInput,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    'aria-label': 'Default',
    defaultValue: 'Default'
  }
};

export const WithIconBefore: Story = {
  args: {
    'aria-label': 'IconBefore',
    iconBefore: IconType.Search,
    defaultValue: 'Search'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Disabled',
    defaultValue: 'Disabled'
  }
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    'aria-label': 'ReadOnly',
    defaultValue: 'ReadOnly'
  }
};

export const Invalid: Story = {
  decorators: story => (
    <TextField defaultValue='Invalid' aria-label='Invalid' isInvalid={true}>
      {story()}
    </TextField>
  )
};
