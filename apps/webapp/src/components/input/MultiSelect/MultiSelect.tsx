import { Button } from '@components/Button/Button';
import { useFilter } from '@react-aria/i18n';
import { type ListData, useListData } from '@react-stately/data';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState, type PropsWithChildren } from 'react';
import {
  ComboBox,
  ComboBoxContext,
  ComboBoxStateContext,
  Dialog,
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
import { twMerge } from 'tailwind-merge';
export interface MultiSelectProps<T extends object>
  extends Omit<
    RACComboBoxProps<T>,
    | 'children'
    | 'validate'
    | 'allowsEmptyCollection'
    | 'inputValue'
    | 'selectedKey'
    | 'inputValue'
    | 'className'
    | 'value'
    | 'onSelectionChange'
    | 'onInputChange'
  > {
  items: Array<T>;
  itemKeyPath: (item: T) => Key;
  itemSearchPattern: (item: T) => string;
  selectedList: ListData<T>;
  className?: string;
  onItemAdd?: (key: Key) => void;
  onItemRemove?: (key: Key) => void;
  renderEmptyState: (inputValue: string) => React.ReactNode;
  tag: (item: T) => React.ReactNode;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}
const DescriptionContext = React.createContext<{
  'aria-describedby'?: string;
} | null>(null);
function DescriptionProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const descriptionId: string | null = React.useId();
  const [descriptionRendered, setDescriptionRendered] = React.useState(true);
  React.useLayoutEffect(() => {
    if (!document.getElementById(descriptionId)) {
      setDescriptionRendered(false);
    }
  }, [descriptionId]);
  return (
    <DescriptionContext.Provider
      value={{
        'aria-describedby': descriptionRendered ? descriptionId : undefined
      }}
    >
      {children}
    </DescriptionContext.Provider>
  );
}
export function MultiSelectField({ children, className, ...props }: GroupProps & { children: React.ReactNode }) {
  const labelId = React.useId();
  return (
    <LabelContext.Provider value={{ id: labelId, elementType: 'span' }}>
      <GroupContext.Provider {...props} value={{ 'aria-labelledby': labelId }}>
        <Group>{children}</Group>
      </GroupContext.Provider>
    </LabelContext.Provider>
  );
}

type Props<T extends object> = {
  label: string;
  items: T[];
  getKey: (item: T) => Key;
  getSearchValue: (item: T) => string;
  children: (item: T) => React.ReactNode;
  selectedItems: T[];
  onChange: (newSelectionList: T[]) => void;
  textValue: (item: T) => string;
};

export function MultiSelect<T extends object>({
  label,
  getKey,
  children,
  items,
  textValue,
  getSearchValue,
  onChange,
  selectedItems
}: Props<T>) {
  const labelId = React.useId();
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const listbocRef = React.useRef<HTMLDivElement>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { contains } = useFilter({ sensitivity: 'base' });
  const [searchValue, setSearchValue] = useState('');
  const filter = useCallback(
    (item: T, filterText: string) => {
      return !selectedItems.find(x => getKey(x) === getKey(item)) && contains(getSearchValue(item), searchValue);
    },
    [contains, getSearchValue, selectedItems, getKey, searchValue]
  );
  const availableList = useListData({
    initialItems: items,
    getKey,
    filter
  });

  function handleComboBoxSelectionChange(key: Key | null) {
    if (!key) {
      return;
    }
    const item = availableList.getItem(key);

    const newArray = [...selectedItems];
    newArray.push(item);

    setSearchValue('');
    onChange(newArray);
  }

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

  function handleSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.currentTarget.value);
    setIsPopoverOpen(true);
  }

  useLayoutEffect(() => {
    if (isPopoverOpen) {
      console.log(listbocRef);
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
                <Tag textValue={textValue(item)} className='bg-blue-400 rounded-lg inline-flex'>
                  {textValue(item)}
                  <Button slot='remove'> X</Button>
                </Tag>
              )}
            </TagList>
          </TagGroup>
          <div>
            {/* <ComboBox
            aria-labelledby={labelId}
            onKeyDown={e => console.log(e)}
            onSelectionChange={handleComboBoxSelectionChange}
            > */}

            <Input onChange={handleSearchValueChange} value={searchValue} />
            <Button onPress={() => setIsPopoverOpen(true)}>▼</Button>
            <Popover
              placement='bottom start'
              triggerRef={triggerRef}
              isOpen={isPopoverOpen}
              onOpenChange={setIsPopoverOpen}
            >
              <Dialog>
                <ListBox
                  ref={listbocRef}
                  selectionMode='single'
                  items={availableList.items}
                  onSelectionChange={handleComboBoxSelectionChange2}
                >
                  {children}
                </ListBox>
              </Dialog>
            </Popover>
            {/* </ComboBox> */}
          </div>
        </div>
      </div>
    </>
  );
}

export function MultiSelectItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={composeRenderProps(props.className, (className, { isFocused }) => {
        return twMerge([
          'rounded-lg p-1.5 text-base/6 outline-0 focus-visible:outline-0 sm:text-sm/6',
          isFocused && 'bg-zinc-100 dark:bg-zinc-700',
          className
        ]);
      })}
    >
      {props.children}
    </ListBoxItem>
  );
}
