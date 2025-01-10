import { Heading } from '@components/ui/Heading/Heading';
import { Button } from '@components/ui/buttons/Button/Button';
import { Dialog } from '@components/ui/dialogs/Dialog/Dialog';
import { Option } from '@components/ui/field-inputs/FieldSelect/FieldSelect';
import { Form } from '@components/ui/form/Form/Form';
import { FormCheckbox } from '@components/ui/form/FormCheckbox/FormCheckbox';
import { FormMultiSelect } from '@components/ui/form/FormMultiSelect/FormMultiSelect';
import { FormNumberInput } from '@components/ui/form/FormNumberInput/FormNumberInput';
import { FormSelect } from '@components/ui/form/FormSelect/FormSelect';
import { FormTextInput } from '@components/ui/form/FormTextInput/FormTextInput';
import { CategoryIcon } from '@components/ui/icon/CategoryIcon/CategoryIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@modules/toast/hooks/useToast';
import { createTransactionMutation } from '@modules/wallet/operations/create-transaction';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { OverlayTriggerStateContext } from 'react-aria-components';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { MyCategoryFragment, MyLabelFragment } from '../../../../gql/graphql';

const formSchema = z.object({
  categoryId: z.string().optional(),
  date: z.date(),
  amount: z.number(),
  note: z.string().optional(),
  labels: z.custom<MyLabelFragment[]>(),
  isParent: z.boolean()
});
type FormSchema = z.infer<typeof formSchema>;
type Props = {
  walletId: string;
  labels: MyLabelFragment[];
  categories: MyCategoryFragment[];
  onSuccess: () => void;
};
export function CreateTransactionForm({ walletId, labels, categories, onSuccess: parentOnSuccess }: Props) {
  const { successToast, errorToast } = useToast();
  const dialogState = useContext(OverlayTriggerStateContext);

  const { mutate, error } = useMutation({
    mutationKey: ['create-label'],
    mutationFn: createTransactionMutation,
    onSuccess,
    onError
  });

  const { handleSubmit, control } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      categoryId: '',
      date: new Date(Date.now()),
      note: '',
      labels: [],
      isParent: false
    }
  });

  function onSubmit(data: FormSchema, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    mutate({
      input: {
        amount: data.amount,
        categoryId: data.categoryId,
        date: data.date,
        isParent: data.isParent,
        walletId,
        labelsIds: data.labels.map(label => label.id),
        note: data.note
      }
    });
  }

  function onSuccess() {
    successToast('wallet created');
    dialogState?.close();
    parentOnSuccess();
  }

  function onError() {
    console.error(error);
    errorToast('Category could not be created');
  }

  return (
    <Dialog>
      {({ close }) => (
        <>
          <Heading slot='title'>Create Wallet Dialog</Heading>
          <Button onPress={close}>Close</Button>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormCheckbox control={control} name='isParent'>
              Is Parent
            </FormCheckbox>
            <FormSelect
              control={control}
              name='categoryId'
              label='Category'
              selectValueTemplate={a => (a.isPlaceholder ? 'Select Category' : a.defaultChildren)}
            >
              {Object.values(categories).map(category => (
                <Option id={category.id} key={category.id} textValue={category.displayName} className='bg-white'>
                  <CategoryIcon icon={category.icon} /> {category.displayName}
                </Option>
              ))}
            </FormSelect>
            <FormNumberInput control={control} name='amount' label='Amount' />
            <FormTextInput control={control} name='note' label='Note' />

            <FormMultiSelect
              name='labels'
              control={control}
              label='labels'
              items={labels}
              getId={x => x.id}
              getTextValue={x => x.displayName}
              getTagTextValue={x => x.displayName}
            />

            <Button type='submit'>Create</Button>
          </Form>
        </>
      )}
    </Dialog>
  );
}
