import { type BaseMutationOptions, useMutation } from '@apollo/client';
import { Button } from '@components/Button/Button';
import { Heading } from '@components/Heading/Heading';
import { Dialog } from '@components/dialogs/Dialog/Dialog';
import { Form } from '@components/form/Form/Form';
import { FormCheckbox } from '@components/form/FormCheckbox/FormCheckbox';
import { FormNumberInput } from '@components/form/FormNumberInput/FormNumberInput';
import { FormSelect } from '@components/form/FormSelect/FormSelect';
import { FormTextInput } from '@components/form/FormTextInput/FormTextInput';
import { CategoryIcon } from '@components/icon/CategoryIcon/CategoryIcon';
import { MultiSelect } from '@components/input/MultiSelect/MultiSelect';
import { Option } from '@components/input/Select/Select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@modules/toast/hooks/useToast';
import { CREATE_TRANSACTION } from '@modules/wallet/graphql/mutations';
import { GET_MY_WALLET } from '@modules/wallet/graphql/queries';
import { type ListData, useListData } from '@react-stately/data';
import { useContext } from 'react';
import { Label, OverlayTriggerStateContext, SelectValue, Tag } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  CategoryIcon as CategoryIconEnum,
  type CreateTransactionMutation,
  GetMyWalletDocument,
  type MyCategoryFragment,
  type MyLabelFragment,
  MyLabelFragmentDoc
} from '../../../../gql/graphql';
const formSchema = z.object({
  category: z.custom<MyCategoryFragment>().nullable(),
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
  onCompleted: (data: CreateTransactionMutation, clientOptions?: BaseMutationOptions) => Promise<void>;
};
export function CreateTransactionForm({ walletId, labels, categories, onCompleted: parentOnCompleted }: Props) {
  const { successToast } = useToast();
  const dialogState = useContext(OverlayTriggerStateContext);
  const [createTransactionMutation, { error }] = useMutation(CREATE_TRANSACTION, {
    awaitRefetchQueries: true,
    onCompleted,
    refetchQueries: [GET_MY_WALLET]
  });
  const selectedList = useListData<MyLabelFragment>({
    initialItems: [],
    getKey: label => label.id
  });
  const { handleSubmit, control } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      category: null,
      date: new Date(Date.now()),
      note: '',
      labels: [],
      isParent: false
    }
  });

  function onSubmit(data: FormSchema, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    createTransactionMutation({
      variables: {
        input: {
          amount: data.amount,
          categoryId: data.category?.id,
          date: data.date,
          isParent: data.isParent,
          walletId,
          labelsIds: data.labels.map(label => label.id),
          note: data.note
        }
      }
    });
  }
  async function onCompleted(data: CreateTransactionMutation, clientOptions?: BaseMutationOptions) {
    await parentOnCompleted(data, clientOptions);
    successToast('OK', 'wallet created');
    dialogState.close();
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
              name='category'
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

            <Controller
              control={control}
              name='labels'
              render={({
                field: { disabled, onChange, value, ...fieldProps },
                fieldState: { invalid, error: _error }
              }) => (
                <MultiSelect
                  items={labels}
                  selectedItems={value}
                  getKey={x => x.id}
                  getSearchValue={x => x.displayName}
                  onChange={onChange}
                  label='labels'
                  getTagTextValue={x => x.displayName}
                  itemRender={(item, isSelected) => (
                    <>
                      {isSelected && <Button slot='remove'>X</Button>} {item.displayName}
                    </>
                  )}
                />
              )}
            />

            <Button type='submit'>Create</Button>
          </Form>
        </>
      )}
    </Dialog>
  );
}
