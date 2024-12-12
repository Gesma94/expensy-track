import { Button } from '@components/ui/Button/Button';
import { Heading } from '@components/ui/Heading/Heading';
import { Text } from '@components/ui/Text/Text';
import { Drawer } from '@components/ui/dialogs/Drawer/Drawer';
import { CategoryIcon as CategoryIconEnum, CategoryType } from '@gql/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label, TextField } from 'react-aria-components';
import { Input } from 'react-aria-components';
import { Button as AriaButton } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { HiMiniXMark } from 'react-icons/hi2';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { InputSection } from './components/InputSection';
const formSchema = z.object({
  color: z.string(),
  type: z.nativeEnum(CategoryType),
  icon: z.nativeEnum(CategoryIconEnum),
  displayName: z.string().min(1, 'must have length 1').default('test def')
});

type FormSchema = z.infer<typeof formSchema>;

export function CreateCategoryDrawer() {
  const { handleSubmit, control } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { displayName: '' }
  });

  return (
    <Drawer dialogClassName='flex flex-col h-full'>
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
          <form className='h-full flex flex-col'>
            <div className='mt-12'>
              <InputSection title='What kind of category are you creating?' />
            </div>

            <div className='mt-12'>
              <InputSection title='Customise your category...'>
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
              </InputSection>
            </div>
            <Button fullWidth={true} variant='primary' size='large' className='mt-auto'>
              Create category
            </Button>
          </form>
        </>
      )}
    </Drawer>
  );
}
