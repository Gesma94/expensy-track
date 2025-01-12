import { IconType } from '@common/enums/icon';
import type { Meta, StoryObj } from '@storybook/react';
import { Option } from './Option';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/UI/inputs/Select',
  component: Select,
  tags: ['autodocs']
};

const Options = (
  <>
    <Option id='1'>Option 1</Option>
    <Option id='2'>Option 2</Option>
    <Option id='3'>Option 3</Option>
    <Option id='4'>Option 4</Option>
  </>
);

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    children: Options
  }
};

export const WithIconBefore: Story = {
  args: {
    iconBefore: IconType.Search,
    children: Options
  }
};

export const Disabled: Story = {
  args: {
    iconBefore: IconType.Search,
    isDisabled: true,
    children: Options
  }
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
    children: Options
  }
};

export const InvalidDisabled: Story = {
  args: {
    isInvalid: true,
    isDisabled: true,
    children: Options
  }
};
