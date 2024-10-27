import { useMutation } from '@apollo/client';
import { Button } from '@components/Button/Button';
import { Heading } from '@components/Heading/Heading';
import { Dialog } from '@components/dialogs/Dialog/Dialog';
import { Form } from '@components/form/Form/Form';
import { FormCheckbox } from '@components/form/FormCheckbox/FormCheckbox';
import { FormNumberInput } from '@components/form/FormNumberInput/FormNumberInput';
import { FormSelect } from '@components/form/FormSelect/FormSelect';
import { FormTextInput } from '@components/form/FormTextInput/FormTextInput';
import { CategoryIcon } from '@components/icon/CategoryIcon/CategoryIcon';
import { Option } from '@components/input/Select/Select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@modules/toast/hooks/useToast';
import { useListData } from '@react-stately/data';
import { useContext } from 'react';
import { Label, OverlayTriggerStateContext, SelectValue, Tag } from 'react-aria-components';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CategoryIcon as CategoryIconEnum, type MyLabelFragment } from '../../../../gql/graphql';
const formSchema = z.object({
  category: z.nativeEnum(CategoryIconEnum).nullable(),
  date: z.date(),
  amount: z.number(),
  note: z.string().optional(),
  labels: z.array(z.string()),
  isParent: z.boolean()
});
type FormSchema = z.infer<typeof formSchema>;
type Props = {
  labels: MyLabelFragment[];
};
export function CreateTransactionForm({ labels }: Props) {
  const { successToast } = useToast();
  const dialogState = useContext(OverlayTriggerStateContext);
  const { handleSubmit, control, getValues } = useForm<FormSchema>({
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
  const selectedList = useListData<MyLabelFragment>({
    initialItems: []
  });
  function onSubmit(data: FormSchema, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    // createCategoryMutation({ variables: { input: data } });
  }
  function onCompleted() {
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
              // selectValueTemplate={a => (a.isPlaceholder ? 'test1' : a.defaultChildren)}
            >
              {Object.values(CategoryIconEnum).map(categoryIcon => (
                <Option id={categoryIcon} key={categoryIcon}>
                  <CategoryIcon icon={categoryIcon} />
                </Option>
              ))}
            </FormSelect>
            <FormNumberInput control={control} name='amount' label='Amount' />
            <FormTextInput control={control} name='note' label='Note' />
            {/* <FormTextInput control={control} name='displayName' label='Display name' />
            <FormNumberInput control={control} name='initialBalance' label='initial Balance' />
            <FormSelect control={control} name='currencyCode' label='Currency'>
              {Object.values(CurrencyCode).map(currencyCode => (
                <Option id={currencyCode} key={currencyCode}>
                  <CurrencyOption code={currencyCode} />
                </Option>
              ))}
            </FormSelect> */}
            <Button type='submit'>Create</Button>
          </Form>
        </>
      )}
    </Dialog>
  );
}
