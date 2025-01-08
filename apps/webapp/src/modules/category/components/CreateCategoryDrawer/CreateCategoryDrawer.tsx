import { IconType } from '@common/enums/icon';
import { Heading } from '@components/ui/Heading/Heading';
import { Text } from '@components/ui/Text/Text';
import { Button } from '@components/ui/buttons/Button/Button';
import { IconButton } from '@components/ui/buttons/IconButton/IconButton';
import { CommonDialog } from '@components/ui/dialogs/CommonDialog/CommonDialog';
import { Drawer } from '@components/ui/dialogs/Drawer/Drawer';
import { Form } from '@components/ui/form/Form/Form';
import { ColorPicker } from '@components/ui/input/ColorPicker/ColorPicker';
import { FieldError } from '@components/ui/input/FieldError/FieldError';
import { TextInput } from '@components/ui/input/TextInput/TextInput';
import { CategoryIcon as CategoryIconEnum, type CategoryListElementFragment, CategoryType } from '@gql/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCategoryMutation } from '@modules/category/operations/create-category-mutation';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useContext, useEffect, useState } from 'react';
import { DialogTrigger, Label, OverlayTriggerStateContext, RadioGroup, TextField } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CategoryTypeRadio } from './sub-components/CategoryTypeRadio';
import { ColorSquareRadioInput } from './sub-components/ColorSquareRadioInput';
import { EmojiSquareRadioInput } from './sub-components/EmojiSquareRadioInput';
import { InputSection } from './sub-components/InputSection';

type Props = {
  onSuccess: () => void;
  incomeRootCategories: CategoryListElementFragment[];
  expanseRootCategories: CategoryListElementFragment[];
};

export function CreateCategoryDrawer({ onSuccess }: Props) {
  const { successToast } = useToast();

  const { close: closeDrawer, isOpen } = useContext(OverlayTriggerStateContext)!;
  const { mutate } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: createCategoryMutation,
    onSuccess: onMutationSuccess,
    onError: onMutationError
  });

  const getFormInitialValues = useCallback<() => FormSchema>(() => {
    return { displayName: '', color: '', icon: '', type: '' };
  }, []);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getFormInitialValues()
  });
  const [temporaryColor, setTemporaryColor] = useState<string>('#FFFFFF');

  function onValid(data: FormSchema) {
    const { icon, type } = { ...data };
    if (icon === '' || type === '') {
      return;
    }

    mutate({
      input: {
        color: data.color,
        displayName: data.displayName,
        icon,
        type
      }
    });
  }

  function onMutationSuccess() {
    successToast('category craeted!');
    closeDrawer();
    onSuccess();
  }

  function onMutationError() {
    console.error(errors);
  }

  function handleSaveColorPress(close) {
    setValue('color', temporaryColor);
    close();
  }

  useEffect(() => {
    if (isOpen) {
      reset(getFormInitialValues());
    }
  }, [reset, getFormInitialValues, isOpen]);

  return (
    <Drawer dialogClassName='flex flex-col min-h-full p-drawer'>
      <section className='flex items-center justify-between'>
        <Heading level={1} className='text-2xl'>
          Create a new category
        </Heading>
        <IconButton variant='ghost' icon={IconType.Close} onPress={closeDrawer} />
      </section>
      <Form className='grid grow grid-rows-[auto_auto_1fr_auto]' onSubmit={handleSubmit(onValid)}>
        <div className='mt-12'>
          <InputSection title='What kind of category are you creating?'>
            <Controller
              name='type'
              control={control}
              render={({ field: { disabled, ref, ...fieldProps }, fieldState: { invalid, error } }) => (
                <RadioGroup
                  {...fieldProps}
                  isInvalid={invalid}
                  isDisabled={disabled}
                  orientation='horizontal'
                  className='flex flex-col gap-2'
                  aria-label='What kind of category are you creating?'
                >
                  <div className='flex gap-4'>
                    <CategoryTypeRadio
                      ref={ref}
                      value={CategoryType.Expanse}
                      description='Money leaving your account'
                      icon={IconType.Export}
                      title='Spending'
                    />
                    <CategoryTypeRadio
                      value={CategoryType.Income}
                      description='Money coming into your account'
                      icon={IconType.Import}
                      title='Income'
                    />
                  </div>
                  <FieldError>{error?.message}</FieldError>
                </RadioGroup>
              )}
            />
          </InputSection>
        </div>

        <div className='mt-12'>
          <InputSection title='Customise your category...'>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-2'>
                <Controller
                  control={control}
                  name='displayName'
                  render={({ field: { disabled, ref, ...fieldProps }, fieldState: { invalid, error } }) => (
                    <TextField
                      isDisabled={disabled}
                      isInvalid={invalid}
                      {...fieldProps}
                      className='flex flex-col gap-2'
                    >
                      <Label className='font-medium'>Give it a name</Label>
                      <TextInput type='text' ref={ref} />
                      <FieldError>{error?.message}</FieldError>
                    </TextField>
                  )}
                />
              </div>

              <Controller
                control={control}
                name='icon'
                render={({ field: { disabled, ...fieldProps }, fieldState: { invalid, error } }) => (
                  <RadioGroup
                    orientation='horizontal'
                    isInvalid={invalid}
                    {...fieldProps}
                    className='flex flex-col gap-2'
                  >
                    <Label className='font-medium'>Choose an emoji</Label>
                    <div className='flex gap-2 items-center justify-between'>
                      <EmojiSquareRadioInput categoryIcon={CategoryIconEnum.Pizza} />
                      <EmojiSquareRadioInput categoryIcon={CategoryIconEnum.Confetti} />
                      <EmojiSquareRadioInput categoryIcon={CategoryIconEnum.Car} />
                      <EmojiSquareRadioInput categoryIcon={CategoryIconEnum.Home} />
                      <EmojiSquareRadioInput categoryIcon={CategoryIconEnum.SoccerBall} />
                      <EmojiSquareRadioInput categoryIcon={CategoryIconEnum.Popcorn} />
                      <Button variant='ghost'>More</Button>
                    </div>
                    <FieldError>{error?.message}</FieldError>
                  </RadioGroup>
                )}
              />

              <Controller
                control={control}
                name='color'
                render={({ field: { disabled, ...fieldProps }, fieldState: { invalid, error } }) => (
                  <RadioGroup isDisabled={disabled} isInvalid={invalid} {...fieldProps} className='flex flex-col gap-2'>
                    <Label className='font-medium'>Choose a colour</Label>
                    <div className='flex gap-2 justify-between'>
                      <ColorSquareRadioInput value='#FF9A3C' />
                      <ColorSquareRadioInput value='#FFDB3C' />
                      <ColorSquareRadioInput value='#A4DA71' />
                      <ColorSquareRadioInput value='#54C1CB' />
                      <ColorSquareRadioInput value='#6E85CB' />
                      <ColorSquareRadioInput value='#AF73C6' />

                      <DialogTrigger>
                        <Button variant='ghost'>More</Button>
                        <CommonDialog heading='Merge categories' className='min-w-[36rem] max-w-xl'>
                          {dialogRenderProps => (
                            <>
                              <p className='text-dialog-text'>Pick the color you prefer for your category</p>
                              <ColorPicker
                                colorFormat='hex'
                                className='mt-8 mx-auto'
                                value={temporaryColor}
                                onChange={a => setTemporaryColor(a.toString('hex'))}
                              />
                              <div className='mt-10 justify-self-end flex gap-2'>
                                <Button size='small' className='w-32' variant='ghost' onPress={dialogRenderProps.close}>
                                  Cancel
                                </Button>
                                <Button
                                  size='small'
                                  className='w-32'
                                  variant='primary'
                                  onPress={() => handleSaveColorPress(dialogRenderProps.close)}
                                >
                                  OK
                                </Button>
                              </div>
                            </>
                          )}
                        </CommonDialog>
                      </DialogTrigger>
                    </div>
                    <FieldError>{error?.message}</FieldError>
                  </RadioGroup>
                )}
              />
            </div>
          </InputSection>
        </div>
        <Button fullWidth={true} variant='primary' size='large' type='submit' className='row-start-4 mt-12 shrink-0'>
          Create category
        </Button>
      </Form>
    </Drawer>
  );
}

const formSchema = z.object({
  color: z.string().min(1, 'Please select a color'),
  type: z
    .nativeEnum(CategoryType)
    .or(z.literal(''))
    .refine(value => value !== '' && Object.values(CategoryType).includes(value), 'Please select the type of category'),
  icon: z
    .nativeEnum(CategoryIconEnum)
    .or(z.literal(''))
    .refine(value => value !== '' && Object.values(CategoryIconEnum).includes(value), 'Please select an icon'),
  displayName: z.string().min(1, 'Please add a name')
});

type FormSchema = z.infer<typeof formSchema>;
