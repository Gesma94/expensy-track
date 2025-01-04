import { Button } from '@components/ui/buttons/Button/Button';
import { useKeyboard } from '@react-aria/interactions';
import React, { useLayoutEffect, useState, type ComponentProps, type KeyboardEvent, type Ref } from 'react';
import {
  Collection as AriaCollection,
  Header as AriaHeader,
  Input as AriaInput,
  type Key as AriaKey,
  Label as AriaLabel,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  type ListBoxItemProps as AriaListBoxItemProps,
  ListBoxSection as AriaListBoxSection,
  Popover as AriaPopover,
  type Selection as AriaSelection,
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  TagList as AriaTagList,
  TextField as AriaTextField
} from 'react-aria-components';

type GroupedItem<T extends object> = {
  [key: string]: {
    selectedItems: T[];
    notSelectedItems: T[];
  };
};

type Props<T extends object> = {
  label: string;
  items: T[];
  getId: (item: T) => AriaKey;
  getTextValue: (item: T) => string;
  getTagTextValue: (item: T) => string;
  getSection?: (item: T) => string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  selectedItems?: T[];
  children?: ComponentProps<typeof AriaListBox<T>>['children'];
  onChange?: (newSelectionList: T[]) => void;
  validationBehavior?: ComponentProps<typeof AriaTextField>['validationBehavior'];
  ref?: Ref<HTMLInputElement>;
};

export function MultiSelect<T extends object>({
  label,
  getId,
  getTextValue,
  items,
  ref,
  isDisabled,
  getTagTextValue,
  validationBehavior,
  onChange,
  getSection,
  selectedItems: statelessSelectedItems
}: Props<T>) {
  const labelId = React.useId();
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const listBoxRef = React.useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState('');
  const [statefulSelectedItems, setStatefulSelectedItems] = useState<T[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState<'no' | 'from-search-value-change' | 'open'>('no');

  const { keyboardProps } = useKeyboard({ onKeyDown: onInputKeyDown });

  const isStateless = statelessSelectedItems;
  const selectedItems = isStateless ? statelessSelectedItems : statefulSelectedItems;

  function onInputKeyDown(e: KeyboardEvent): void {
    if (e.code === 'ArrowDown' || e.code === 'Enter') {
      setIsPopoverOpen('open');
    }
  }

  function updateSelectedItems(newSelectedItems: T[]) {
    if (isStateless) {
      if (!onChange) {
        console.warn('MultiSelect is a controlled input without an onChange handler provided');
      } else {
        onChange(newSelectedItems);
      }
    } else {
      setStatefulSelectedItems(newSelectedItems);
    }
  }

  function removeSelectedItemFromTagGroup(keys: AriaKey[] | Set<AriaKey>) {
    const newSelectedItems = [...selectedItems];

    keys.forEach(key => {
      const index = newSelectedItems.findIndex(x => getId(x) === key);

      if (index !== -1) {
        newSelectedItems.splice(index, 1);
      }
    });

    updateSelectedItems(newSelectedItems);
  }

  function handleListBoxSelectionChange(keys: AriaSelection) {
    let newSelectedItems: T[] = [];

    if (keys === 'all') {
      newSelectedItems = [...items];
    } else {
      const selectedKeys = Array.from(keys.keys());

      items.forEach(item => {
        if (selectedKeys.includes(getId(item))) {
          newSelectedItems.push(item);
        }
      });
    }

    updateSelectedItems(newSelectedItems);
    setSearchValue('');
  }

  function handleBlurInput() {
    if (isPopoverOpen === 'from-search-value-change') {
      setIsPopoverOpen('no');
    }
  }

  function handleSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.currentTarget.value);
    setIsPopoverOpen('from-search-value-change');
  }

  const selectedItemsKey = new Map(selectedItems.map(item => [getId(item), true]));
  const notSelectedItems = items.filter(item => !selectedItemsKey.has(getId(item)));

  const groupedItems = groupBySection(getSection, items, selectedItems, notSelectedItems);

  useLayoutEffect(() => {
    if (isPopoverOpen === 'open') {
      listBoxRef?.current?.focus();
    }
  }, [isPopoverOpen]);

  return (
    <AriaTextField validationBehavior={validationBehavior} isDisabled={isDisabled} ref={triggerRef}>
      <AriaLabel id={labelId}>{label}</AriaLabel>
      <div className='flex border'>
        {selectedItems?.length > 0 && (
          <AriaTagGroup onRemove={removeSelectedItemFromTagGroup} aria-labelledby={labelId}>
            <AriaTagList items={selectedItems}>
              {item => (
                <AriaTag textValue={getTagTextValue(item)} className='bg-blue-400 rounded-lg inline-flex'>
                  {getTagTextValue(item)}
                  <Button slot='remove'>X</Button>
                </AriaTag>
              )}
            </AriaTagList>
          </AriaTagGroup>
        )}
        <div>
          <AriaInput
            aria-labelledby={labelId}
            onBlur={handleBlurInput}
            ref={ref}
            {...keyboardProps}
            onChange={handleSearchValueChange}
            value={searchValue}
          />
          <Button excludeFromTabOrder={true} onPress={() => setIsPopoverOpen('open')}>
            ▼
          </Button>
          <AriaPopover
            placement='bottom start'
            triggerRef={triggerRef}
            isOpen={isPopoverOpen !== 'no'}
            className='bg-white'
            onOpenChange={e => setIsPopoverOpen(e ? 'open' : 'no')}
          >
            <AriaListBox
              ref={listBoxRef}
              selectionMode='multiple'
              className='flex flex-col'
              items={items}
              aria-labelledby={labelId}
              selectedKeys={new Set(selectedItemsKey.keys())}
              onSelectionChange={handleListBoxSelectionChange}
            >
              {groupedItems !== null &&
                Object.entries(groupedItems).map(sectionInfo => (
                  <AriaListBoxSection key={sectionInfo[0]} id={sectionInfo[0]}>
                    <AriaHeader>{sectionInfo[0]}</AriaHeader>
                    <AriaCollection items={sectionInfo[1].selectedItems}>
                      {item => (
                        <MultiSelectSelectedOption textValue={getTextValue(item)} id={getId(item)} key={getId(item)} />
                      )}
                    </AriaCollection>
                    <AriaCollection items={sectionInfo[1].notSelectedItems}>
                      {item => <MultiSelectOption textValue={getTextValue(item)} id={getId(item)} key={getId(item)} />}
                    </AriaCollection>
                  </AriaListBoxSection>
                ))}

              {groupedItems === null && (
                <>
                  {selectedItems.map(item => (
                    <MultiSelectSelectedOption textValue={getTextValue(item)} id={getId(item)} key={getId(item)} />
                  ))}
                  {notSelectedItems.map(item => (
                    <MultiSelectOption textValue={getTextValue(item)} id={getId(item)} key={getId(item)} />
                  ))}
                </>
              )}
            </AriaListBox>
          </AriaPopover>
        </div>
      </div>
    </AriaTextField>
  );
}

function MultiSelectSelectedOption<T extends object>(props: AriaListBoxItemProps<T>) {
  return (
    <AriaListBoxItem {...props} className='flex bg-blue-500'>
      {props.textValue} X
    </AriaListBoxItem>
  );
}

function MultiSelectOption<T extends object>(props: AriaListBoxItemProps<T>) {
  return <AriaListBoxItem {...props}>{props.textValue}</AriaListBoxItem>;
}

function groupBySection<T extends object>(
  getSectionTitle: undefined | ((item: T) => string),
  items: T[],
  selectedItems: T[],
  notSelectedItems: T[]
): GroupedItem<T> | null {
  if (!getSectionTitle) {
    return null;
  }

  const groups: GroupedItem<T> = {};

  // this way the order of section is kept
  items.forEach(item => {
    const itemSection = getSectionTitle(item);

    if (!(itemSection in groups)) {
      groups[itemSection] = {
        notSelectedItems: [],
        selectedItems: []
      };
    }
  });

  selectedItems.forEach(item => {
    const itemSection = getSectionTitle(item);

    groups[itemSection]?.selectedItems.push(item);
  });

  notSelectedItems.forEach(item => {
    const itemSection = getSectionTitle(item);

    groups[itemSection]?.notSelectedItems.push(item);
  });

  return groups;
}
