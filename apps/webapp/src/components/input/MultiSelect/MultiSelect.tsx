import { Button } from '@components/Button/Button';
import { useFilter } from '@react-aria/i18n';
import { type PressEvent, useKeyboard, usePress } from '@react-aria/interactions';
import { useListData } from '@react-stately/data';
import React, { useCallback, useLayoutEffect, useState, type KeyboardEvent, type ReactNode } from 'react';
import {
  Input,
  type Key,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  type Selection,
  Tag,
  TagGroup,
  TagList
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
  itemRender: (item: T, isSelected: boolean) => ReactNode;
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
  const listBoxRef = React.useRef<HTMLDivElement>(null);

  const [isPopoverOpen, setIsPopoverOpen] = useState<'no' | 'from-search-value-change' | 'open'>('no');

  const { contains } = useFilter({ sensitivity: 'base' });
  const { keyboardProps } = useKeyboard({ onKeyDown: onInputKeyDown });
  const { pressProps } = usePress({
    onPress: onListBoxCustomPress,
    onPressUp: onListBoxCustomPress,
    onPressEnd: onPressEventContinuePropagation,
    onPressStart: onPressEventContinuePropagation
  });

  function onInputKeyDown(e: KeyboardEvent): void {
    if (e.code === 'ArrowDown' || e.code === 'Enter') {
      setIsPopoverOpen('open');
    }
  }

  function onPressEventContinuePropagation(e: PressEvent) {
    e.continuePropagation();
  }

  function onListBoxCustomPress(e: PressEvent) {
    if (e.target.matches('button[slot="remove"]')) {
      const newArray = [...selectedItems];
      const key = e.target.parentElement?.getAttribute('data-key');

      if (key) {
        const index = newArray.findIndex(x => getKey(x) === key);

        if (index !== -1) {
          newArray.splice(index, 1);
        }

        onChange(newArray);
      }
    } else {
      e.continuePropagation();
    }
  }

  function addKeysInSelected(keys: Key[] | Set<Key>) {
    const newArray = [...selectedItems];

    keys.forEach(key => {
      const item = availableList.getItem(key);

      if (item) {
        newArray.push(item);
      }
    });

    onChange(newArray);
  }

  function removeKeysInSelected(keys: Key[] | Set<Key>) {
    const newArray = [...selectedItems];

    keys.forEach(key => {
      const index = newArray.findIndex(x => getKey(x) === key);

      if (index !== -1) {
        newArray.splice(index, 1);
      }
    });

    onChange(newArray);
  }

  function handleListBoxSelectionChange(keys: Selection) {
    if (!keys) {
      return;
    }

    const selectedKeys = keys === 'all' ? availableList.items.map(item => getKey(item)) : keys;

    addKeysInSelected(selectedKeys);
    availableList.setFilterText('');
  }

  function handleBlurInput() {
    if (isPopoverOpen === 'from-search-value-change') {
      setIsPopoverOpen('no');
    }
  }

  function handleSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.currentTarget.value;
    availableList.setFilterText(e.currentTarget.value);
    setIsPopoverOpen('from-search-value-change');
  }

  function renderEmptyState() {
    if (customRenderEmptyState) {
      return customRenderEmptyState(availableList.filterText);
    }

    return availableList.filterText ? `no value for ${availableList.filterText}` : 'no items';
  }

  const filter = useCallback(
    (item: T, filterText: string) => {
      return !selectedItems.find(x => getKey(x) === getKey(item)) && contains(getSearchValue(item), filterText);
    },
    [contains, getSearchValue, selectedItems, getKey]
  );

  const availableList = useListData({ getKey, filter, initialItems: items });

  useLayoutEffect(() => {
    if (isPopoverOpen === 'open') {
      listBoxRef?.current?.focus();
    }
  }, [isPopoverOpen]);

  return (
    <>
      <div ref={triggerRef}>
        <Label id={labelId}>{label}</Label>
        <div className='flex border'>
          <TagGroup onRemove={removeKeysInSelected} aria-labelledby={labelId}>
            <TagList items={selectedItems}>
              {item => (
                <Tag textValue={getTagTextValue(item)} className='bg-blue-400 rounded-lg inline-flex'>
                  {tagRender?.(item) ?? getTagTextValue(item)}
                  <Button slot='remove'>X</Button>
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
              value={availableList.filterText}
            />
            <Button onPress={() => setIsPopoverOpen('open')}>▼</Button>
            <Popover
              placement='bottom start'
              triggerRef={triggerRef}
              isOpen={isPopoverOpen !== 'no'}
              onOpenChange={e => setIsPopoverOpen(e ? 'open' : 'no')}
            >
              <ListBox
                renderEmptyState={renderEmptyState}
                aria-labelledby={labelId}
                ref={listBoxRef}
                selectionMode='single'
                items={[...selectedItems, ...availableList.items]}
                onSelectionChange={handleListBoxSelectionChange}
              >
                {item => (
                  <ListBoxItem key={getKey(item)} id={getKey(item)} textValue={getTagTextValue(item)}>
                    <div {...pressProps}>{itemRender(item, selectedItems.includes(item))}</div>
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
