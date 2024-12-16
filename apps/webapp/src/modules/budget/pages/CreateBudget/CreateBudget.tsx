import { Button } from '@components/ui/buttons/Button/Button';
import { Form } from '@components/ui/form/Form/Form';
import { FormMultiSelect } from '@components/ui/form/FormMultiSelect/FormMultiSelect';
import { FormNumberInput } from '@components/ui/form/FormNumberInput/FormNumberInput';
import { FormSelect } from '@components/ui/form/FormSelect/FormSelect';
import { FormTextInput } from '@components/ui/form/FormTextInput/FormTextInput';
import { Option } from '@components/ui/input/Select/Select';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBudgetMutation } from '@modules/budget/operations/create-budget';
import { GetCreateBudgetDeps } from '@modules/budget/operations/get-create-budget-deps';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFragment } from '../../../../gql';
import {
  BudgetSpan,
  type MyCategoryFragment,
  MyCategoryFragmentDoc,
  type WalletKeyValueFragmentFragment,
  WalletKeyValueFragmentFragmentDoc
} from '../../../../gql/graphql';

const formSchema = z.object({
  displayName: z.string().min(1, 'must have length 1'),
  span: z.nativeEnum(BudgetSpan),
  amount: z.number(),
  categoriesIds: z.custom<MyCategoryFragment[]>(),
  walletsIds: z.custom<WalletKeyValueFragmentFragment[]>()
});

type FormSchema = z.infer<typeof formSchema>;

export function CreateBudget() {
  const { successToast, errorToast } = useToast();
  const { data, isLoading } = useQuery({
    queryKey: ['create-budget-deps'],
    queryFn: () => GetCreateBudgetDeps()
  });

  const { mutate, error } = useMutation({
    mutationKey: ['create-budget'],
    mutationFn: createBudgetMutation,
    onSuccess,
    onError
  });

  const walletFragments = useFragment(WalletKeyValueFragmentFragmentDoc, data?.wallets?.result);
  const categoriesFragment = useFragment(MyCategoryFragmentDoc, data?.categories?.result);

  const { handleSubmit, control } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { displayName: '', amount: 0, categoriesIds: [], span: BudgetSpan.Monthly, walletsIds: [] }
  });

  function onSubmit(data: FormSchema, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    mutate({
      input: {
        amount: data.amount,
        categoryIds: data.categoriesIds.map(category => category.id),
        displayName: data.displayName,
        span: data.span,
        walletIds: data.walletsIds.map(wallet => wallet.id)
      }
    });
  }

  function onSuccess() {
    successToast('budget created');
  }

  function onError() {
    console.error(error);
    errorToast('Category could not be created');
  }

  return isLoading ? (
    'loading'
  ) : (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput control={control} name='displayName' label='display name' />
        <FormNumberInput control={control} name='amount' label='initial Balance' />
        <FormSelect control={control} name='span' label='Span'>
          {Object.values(BudgetSpan).map(budgetSpan => (
            <Option id={budgetSpan} key={budgetSpan}>
              {budgetSpan}
            </Option>
          ))}
        </FormSelect>
        <FormMultiSelect
          control={control}
          name='categoriesIds'
          label='Categories'
          items={categoriesFragment ?? []}
          getId={x => x.id}
          getSection={x => x.type}
          getTagTextValue={x => x.displayName}
          getTextValue={x => x.displayName}
        />

        <FormMultiSelect
          control={control}
          name='walletsIds'
          label='wallets'
          items={walletFragments ?? []}
          getId={x => x.id}
          getTagTextValue={x => x.displayName}
          getTextValue={x => x.displayName}
        />

        <Button type='submit'>Create</Button>
      </Form>
    </div>
  );
}
