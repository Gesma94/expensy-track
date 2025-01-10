import { IconType } from '@common/enums/icon';
import type { Meta, StoryObj } from '@storybook/react';
import { FieldSelect, Option } from './FieldSelect';

const meta: Meta<typeof FieldSelect> = {
  title: 'Components/UI/inputs/Select',
  component: FieldSelect,
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

type Story = StoryObj<typeof FieldSelect>;

export const Default: Story = {
  args: {
    label: 'Default',
    children: Options
  }
};

export const WithIconBefore: Story = {
  args: {
    label: 'With Icon',
    iconBefore: IconType.Search,
    children: Options
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    iconBefore: IconType.Search,
    isDisabled: true,
    children: Options
  }
};

export const Invalid: Story = {
  args: {
    label: 'Invalid',
    isInvalid: true,
    children: Options,
    errorMessage: 'Lorem Ipsum Error'
  }
};

export const InvalidDisabled: Story = {
  args: {
    label: 'Invalid Disabled',
    isInvalid: true,
    isDisabled: true,
    children: Options,
    errorMessage: 'Lorem Ipsum Error'
  }
};
