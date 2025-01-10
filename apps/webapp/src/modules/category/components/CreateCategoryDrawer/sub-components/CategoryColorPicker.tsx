import { CachedArray } from '@common/utils/cached-array';
import { ActionButton } from '@components/ui/buttons/ActionButton/ActionButton';
import { Button } from '@components/ui/buttons/Button/Button';
import { CommonDialog } from '@components/ui/dialogs/CommonDialog/CommonDialog';
import { ColorPicker } from '@components/ui/input/ColorPicker/ColorPicker';
import { FieldError } from '@components/ui/input/FieldError/FieldError';
import type { CreateCategoryDrawerSchema } from '@modules/category/schemas/create-category-drawer-schema';
import { useEffect, useState } from 'react';
import { type Color, DialogTrigger, Label, RadioGroup, parseColor } from 'react-aria-components';
import { type Control, Controller } from 'react-hook-form';
import { ColorSquareRadioInput } from './ColorSquareRadioInput';

type Props = {
  control: Control<CreateCategoryDrawerSchema>;
};

export function CategoryColorPicker({ control }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [availableColors, setAvailableColors] = useState(getDefaultAvailableColors());
  const [temporaryColor, setTemporaryColor] = useState<Color>(getDefaultTemporaryColor());

  function handleSavePress() {
    const hexTemporaryColor = temporaryColor.toString('hex');
    CachedArray.unshift(CACHE_KEY, hexTemporaryColor, 6);

    setAvailableColors(colors => {
      const newClors = [...colors];
      newClors.pop();
      newClors.unshift(hexTemporaryColor);
      return newClors;
    });

    setIsDialogOpen(false);
  }

  function getDefaultAvailableColors() {
    const result: string[] = [...DEFAULT_COLORS];
    const cachedValue = CachedArray.get<string>(CACHE_KEY, []);

    for (const cachedItem of cachedValue) {
      result.pop();
      result.unshift(cachedItem);
    }

    return result;
  }

  function handleMorePress() {
    setIsDialogOpen(true);
  }

  function handleCancelPress() {
    setIsDialogOpen(false);
  }

  function handleDialogOpenChange(isOpen: boolean) {
    setIsDialogOpen(isOpen);
  }

  useEffect(() => {
    if (isDialogOpen) {
      setTemporaryColor(getDefaultTemporaryColor());
    }
  }, [isDialogOpen]);

  return (
    <Controller
      control={control}
      name='color'
      render={({ field: { disabled, ...fieldProps }, fieldState: { invalid, error } }) => (
        <RadioGroup isDisabled={disabled} isInvalid={invalid} {...fieldProps} className='flex flex-col gap-2'>
          <Label className='font-medium'>Choose a colour</Label>
          <div className='flex gap-2 items-center justify-between'>
            {availableColors.map(color => (
              <ColorSquareRadioInput key={color} value={color} />
            ))}

            <DialogTrigger isOpen={isDialogOpen} onOpenChange={handleDialogOpenChange}>
              <ActionButton action='More' onPress={handleMorePress} />
              <CommonDialog heading='Merge categories' className='min-w-[30rem] max-w-xl'>
                <p className='text-dialog-text'>Pick the color you prefer for your category</p>
                <ColorPicker
                  colorAreaClassName='max-h-44'
                  className='mt-4 mx-auto'
                  value={temporaryColor}
                  onChange={setTemporaryColor}
                />
                <div className='mt-10 justify-self-end flex gap-2'>
                  <Button size='small' className='w-32' variant='ghost' onPress={handleCancelPress}>
                    Cancel
                  </Button>
                  <Button size='small' className='w-32' variant='primary' onPress={handleSavePress}>
                    OK
                  </Button>
                </div>
              </CommonDialog>
            </DialogTrigger>
          </div>
          <FieldError>{error?.message}</FieldError>
        </RadioGroup>
      )}
    />
  );
}

function getDefaultTemporaryColor() {
  return parseColor(DEFAULT_COLOR);
}

const DEFAULT_COLOR = '#000000';
const CACHE_KEY = '__EXPENSY-TRACK_LAST_CATEGORY_COLOR__';
const DEFAULT_COLORS = ['#FF9A3C', '#FFDB3C', '#A4DA71', '#54C1CB', '#6E85CB', '#AF73C6'];
