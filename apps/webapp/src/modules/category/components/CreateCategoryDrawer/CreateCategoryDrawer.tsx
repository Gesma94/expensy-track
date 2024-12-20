import { Heading } from '@components/ui/Heading/Heading';
import { Text } from '@components/ui/Text/Text';
import { Button } from '@components/ui/buttons/Button/Button';
import { Drawer } from '@components/ui/dialogs/Drawer/Drawer';
import { Form } from '@components/ui/form/Form/Form';
import { CategoryIcon as CategoryIconEnum, CategoryType } from '@gql/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCategoryMutation } from '@modules/category/operations/create-category-mutation';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { Label, OverlayTriggerStateContext, RadioGroup, TextField } from 'react-aria-components';
import { Input } from 'react-aria-components';
import { Button as AriaButton } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { HiMiniXMark, HiOutlineWallet } from 'react-icons/hi2';
import { z } from 'zod';
import { CategoryTypeRadio } from './components/CategoryTypeRadio';
import { ColorRadio } from './components/ColorRadio';
import { EmojiRadio } from './components/EmojiRadio';
import { InputSection } from './components/InputSection';

const formSchema = z.object({
  color: z.string().min(1, 'must select color'),
  type: z
    .nativeEnum(CategoryType)
    .or(z.literal(''))
    .refine(value => value !== '' && Object.values(CategoryType).includes(value), 'must select type'),
  icon: z
    .nativeEnum(CategoryIconEnum)
    .or(z.literal(''))
    .refine(value => value !== '' && Object.values(CategoryIconEnum).includes(value), 'must select icon'),
  displayName: z.string().min(1, 'must have length 1').default('test def')
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  onSuccess: () => void;
};

export function CreateCategoryDrawer({ onSuccess }: Props) {
  const { successToast } = useToast();

  const { close: closeDrawer } = useContext(OverlayTriggerStateContext)!;
  const { mutate } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: createCategoryMutation,
    onSuccess: onMutationSuccess,
    onError: onMutationError
  });

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { displayName: '', color: '', icon: '', type: '' }
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

  return (
    <Drawer dialogClassName='flex flex-col min-h-full p-drawer'>
      {({ close }) => (
        <>
          <section className='flex items-center justify-between'>
            <Heading level={1} className='text-eerie-black text-2xl'>
              Create a new category
            </Heading>
            <AriaButton onPress={close}>
              <HiMiniXMark className='size-8 fill-eerie-black' />
            </AriaButton>
          </section>
          <Form className='grid grow grid-rows-[auto_auto_1fr_auto]' onSubmit={handleSubmit(onValid)}>
            <div className='mt-12'>
              <InputSection title='What kind of category are you creating?'>
                <Controller
                  control={control}
                  name='type'
                  render={({ field: { disabled, ...fieldProps }, fieldState: { invalid } }) => (
                    <RadioGroup
                      isDisabled={disabled}
                      isInvalid={invalid}
                      {...fieldProps}
                      className='flex gap-4'
                      aria-label='What kind of category are you creating?'
                    >
                      {({ state }) => (
                        <>
                          <CategoryTypeRadio
                            selectedValue={state.selectedValue}
                            value={CategoryType.Expanse}
                            description='Money leaving your account'
                            icon={HiOutlineWallet}
                            title='Spending'
                          />
                          <CategoryTypeRadio
                            selectedValue={state.selectedValue}
                            value={CategoryType.Income}
                            description='Money coming into your account'
                            icon={HiOutlineWallet}
                            title='Income'
                          />
                        </>
                      )}
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
                      render={({ field: { disabled, ref, ...fieldProps }, fieldState: { invalid } }) => (
                        <TextField
                          isDisabled={disabled}
                          isInvalid={invalid}
                          {...fieldProps}
                          className='flex flex-col gap-2'
                        >
                          <Label className='font-medium text-lg'>Give it a name</Label>
                          <Input
                            type='text'
                            className='h-input border border-american-silver rounded-lg p-5 text-independence text-base font-medium'
                            ref={ref}
                          />
                        </TextField>
                      )}
                    />
                    <Text className='text-independence font-medium text-sm'>Maximum 25 characters</Text>
                  </div>

                  <Controller
                    control={control}
                    name='icon'
                    render={({ field: { disabled, ...fieldProps }, fieldState: { invalid } }) => (
                      <RadioGroup
                        isDisabled={disabled}
                        isInvalid={invalid}
                        {...fieldProps}
                        className='flex flex-col gap-2'
                      >
                        <Label className='font-medium text-lg'>Choose an emoji</Label>
                        <div className='flex gap-2'>
                          <EmojiRadio categoryIcon={CategoryIconEnum.Pizza} />
                          <EmojiRadio categoryIcon={CategoryIconEnum.Confetti} />
                          <EmojiRadio categoryIcon={CategoryIconEnum.Car} />
                          <EmojiRadio categoryIcon={CategoryIconEnum.Home} />
                          <EmojiRadio categoryIcon={CategoryIconEnum.SoccerBall} />
                          <EmojiRadio categoryIcon={CategoryIconEnum.Popcorn} />
                        </div>
                      </RadioGroup>
                    )}
                  />

                  <Controller
                    control={control}
                    name='color'
                    render={({ field: { disabled, ...fieldProps }, fieldState: { invalid } }) => (
                      <RadioGroup
                        isDisabled={disabled}
                        isInvalid={invalid}
                        {...fieldProps}
                        className='flex flex-col gap-2'
                      >
                        <Label className='font-medium text-lg'>Choose a colour</Label>
                        <div className='flex gap-2'>
                          <ColorRadio value='#FF9A3C' />
                          <ColorRadio value='#FFDB3C' />
                          <ColorRadio value='#A4DA71' />
                          <ColorRadio value='#54C1CB' />
                          <ColorRadio value='#6E85CB' />
                          <ColorRadio value='#AF73C6' />
                        </div>
                      </RadioGroup>
                    )}
                  />
                </div>
              </InputSection>
            </div>
            <Button
              fullWidth={true}
              variant='primary'
              size='large'
              type='submit'
              className='row-start-4 mt-12 shrink-0'
            >
              Create category
            </Button>
          </Form>
        </>
      )}
    </Drawer>
  );
}
