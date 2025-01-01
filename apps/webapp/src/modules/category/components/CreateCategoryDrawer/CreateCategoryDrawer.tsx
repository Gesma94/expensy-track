import { IconType } from '@common/enums/icon';
import { Heading } from '@components/ui/Heading/Heading';
import { Button } from '@components/ui/buttons/Button/Button';
import { IconButton } from '@components/ui/buttons/IconButton/IconButton';
import { Drawer } from '@components/ui/dialogs/Drawer/Drawer';
import { Form } from '@components/ui/form/Form/Form';
import { FieldError } from '@components/ui/input/FieldError/FieldError';
import { CategoryIcon as CategoryIconEnum, type CategoryListElementFragment, CategoryType } from '@gql/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCategoryMutation } from '@modules/category/operations/create-category-mutation';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useContext, useEffect } from 'react';
import { Label, OverlayTriggerStateContext, RadioGroup, TextField } from 'react-aria-components';
import { Input } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { HiOutlineWallet } from 'react-icons/hi2';
import { z } from 'zod';
import { CategoryTypeRadio } from './sub-components/CategoryTypeRadio';
import { ColorRadio } from './sub-components/ColorRadio';
import { EmojiRadio } from './sub-components/EmojiRadio';
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
    reset,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getFormInitialValues()
  });

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
                      <Input
                        type='text'
                        className='h-input border border-edge-light-default rounded-lg p-5 text-sm'
                        ref={ref}
                      />
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
                    <div className='flex gap-2'>
                      <EmojiRadio categoryIcon={CategoryIconEnum.Pizza} />
                      <EmojiRadio categoryIcon={CategoryIconEnum.Confetti} />
                      <EmojiRadio categoryIcon={CategoryIconEnum.Car} />
                      <EmojiRadio categoryIcon={CategoryIconEnum.Home} />
                      <EmojiRadio categoryIcon={CategoryIconEnum.SoccerBall} />
                      <EmojiRadio categoryIcon={CategoryIconEnum.Popcorn} />
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
                    <div className='flex gap-2'>
                      <ColorRadio value='#FF9A3C' />
                      <ColorRadio value='#FFDB3C' />
                      <ColorRadio value='#A4DA71' />
                      <ColorRadio value='#54C1CB' />
                      <ColorRadio value='#6E85CB' />
                      <ColorRadio value='#AF73C6' />
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
