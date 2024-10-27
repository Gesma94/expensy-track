import { Button } from '@components/Button/Button';
import { useFilter } from '@react-aria/i18n';
import { useKeyboard } from '@react-aria/interactions';
import { type ListData, useListData } from '@react-stately/data';
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type PropsWithChildren,
  type ReactNode
} from 'react';
import {
  Group,
  GroupContext,
  type GroupProps,
  Input,
  type Key,
  Label,
  LabelContext,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Popover,
  type ComboBoxProps as RACComboBoxProps,
  type Selection,
  Tag,
  TagGroup,
  TagList,
  composeRenderProps
} from 'react-aria-components';

type Props<T extends object> = {
  items: T[];
  label: string;
  getKey: (item: T) => Key;
  getSearchValue: (item: T) => string;
  selectedItems: T[];
  onChange: (newSelectionList: T[]) => void;
  getTagTextValue: (item: T) => string;
  tagRender?: (item: T) => ReactNode;
  itemRender: (item: T) => ReactNode;
  renderEmptyState?: (filterValue: string) => ReactNode;
};

export function MultiSelect<T extends object>({
  label,
  getKey,
  items,
  getTagTextValue,
  tagRender,
  itemRender,
  getSearchValue,
  onChange,
  selectedItems,
  renderEmptyState: customRenderEmptyState
}: Props<T>) {
  const labelId = React.useId();
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const listbocRef = React.useRef<HTMLDivElement>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState<'none' | 'input' | 'open'>('none');
  const { keyboardProps } = useKeyboard({
    onKeyDown: e => {
      if (e.code === 'ArrowDown' || e.code === 'Enter') {
        setIsPopoverOpen('open');
      }
    }
  });

  const { contains } = useFilter({ sensitivity: 'base' });
  const [searchValue, setSearchValue] = useState('');
  const filter = useCallback(
    (item: T, filterText: string) => {
      return !selectedItems.find(x => getKey(x) === getKey(item)) && contains(getSearchValue(item), filterText);
    },
    [contains, getSearchValue, selectedItems, getKey]
  );
  const availableList = useListData({
    initialItems: items,
    getKey,
    filter
  });

  function handleComboBoxSelectionChange2(keys: Selection) {
    if (!keys) {
      return;
    }

    if (keys === 'all') {
    } else {
      const newArray = [...selectedItems];
      keys.forEach(key => {
        const item = availableList.getItem(key);

        newArray.push(item);

        setSearchValue('');
        onChange(newArray);
      });
    }
  }

  function handleRemoveTag(key: Set<Key>) {
    const newArray = [...selectedItems];

    key.forEach(k => {
      const index = newArray.findIndex(x => getKey(x) === k);

      if (index !== -1) {
        newArray.splice(index, 1);
      }
    });

    onChange(newArray);
  }

  function handleBlurInput() {
    if (isPopoverOpen === 'input') {
      setIsPopoverOpen('none');
    }
  }

  function handleSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.currentTarget.value);
    availableList.setFilterText(e.currentTarget.value);
    setIsPopoverOpen('input');
  }

  function renderEmptyState() {
    if (customRenderEmptyState) {
      return customRenderEmptyState(availableList.filterText);
    }

    return availableList.filterText ? `no value for ${availableList.filterText}` : 'no items';
  }

  useLayoutEffect(() => {
    if (isPopoverOpen === 'open') {
      listbocRef?.current?.focus();
    }
  }, [isPopoverOpen]);

  return (
    <>
      <div ref={triggerRef}>
        <Label id={labelId}>{label}</Label>
        <div className='flex border'>
          <TagGroup onSelectionChange={e => console.log(e)} onRemove={handleRemoveTag} aria-labelledby={labelId}>
            <TagList items={selectedItems}>
              {item => (
                <Tag textValue={getTagTextValue(item)} className='bg-blue-400 rounded-lg inline-flex'>
                  {tagRender?.(item) ?? getTagTextValue(item)}
                  <Button slot='remove'> X</Button>
                </Tag>
              )}
            </TagList>
          </TagGroup>
          <div>
            <Input
              aria-labelledby={labelId}
              onBlur={handleBlurInput}
              {...keyboardProps}
              onChange={handleSearchValueChange}
              value={searchValue}
            />
            <Button onPress={() => setIsPopoverOpen('open')}>▼</Button>
            <Popover
              placement='bottom start'
              triggerRef={triggerRef}
              isOpen={isPopoverOpen !== 'none'}
              onOpenChange={e => setIsPopoverOpen(e ? 'open' : 'none')}
            >
              <ListBox
                renderEmptyState={renderEmptyState}
                aria-labelledby={labelId}
                ref={listbocRef}
                selectionMode='single'
                items={availableList.items}
                onSelectionChange={handleComboBoxSelectionChange2}
              >
                {item => (
                  <ListBoxItem key={getKey(item)} id={getKey(item)} textValue={getTagTextValue(item)}>
                    {itemRender(item)}
                  </ListBoxItem>
                )}
              </ListBox>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
}
