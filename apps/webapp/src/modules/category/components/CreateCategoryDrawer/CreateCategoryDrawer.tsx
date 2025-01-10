import { IconType } from '@common/enums/icon';
import { Heading } from '@components/ui/Heading/Heading';
import { ActionButton } from '@components/ui/buttons/ActionButton/ActionButton';
import { Button } from '@components/ui/buttons/Button/Button';
import { IconButton } from '@components/ui/buttons/IconButton/IconButton';
import { Drawer } from '@components/ui/dialogs/Drawer/Drawer';
import { Form } from '@components/ui/form/Form/Form';
import { FieldError } from '@components/ui/input/FieldError/FieldError';
import { TextInput } from '@components/ui/input/TextInput/TextInput';
import { CategoryIcon as CategoryIconEnum, type CategoryListElementFragment, CategoryType } from '@gql/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCategoryMutation } from '@modules/category/operations/create-category-mutation';
import {
  type CreateCategoryDrawerSchema,
  createCategoryDrawerSchema
} from '@modules/category/schemas/create-category-drawer-schema';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useContext, useEffect } from 'react';
import { Label, OverlayTriggerStateContext, RadioGroup, TextField } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { CategoryColorPicker } from './sub-components/CategoryColorPicker';
import { CategoryTypeRadio } from './sub-components/CategoryTypeRadio';
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

  const getFormInitialValues = useCallback<() => CreateCategoryDrawerSchema>(() => {
    return { displayName: '', color: '', icon: '', type: '' };
  }, []);

  const formHook = useForm<CreateCategoryDrawerSchema>({
    resolver: zodResolver(createCategoryDrawerSchema),
    defaultValues: getFormInitialValues()
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = { ...formHook };

  function onValid(data: CreateCategoryDrawerSchema) {
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
                      <ActionButton action='More' isDisabled />
                    </div>
                    <FieldError>{error?.message}</FieldError>
                  </RadioGroup>
                )}
              />

              <CategoryColorPicker control={control} />
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
