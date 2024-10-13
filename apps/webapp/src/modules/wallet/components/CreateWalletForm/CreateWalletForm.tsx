import { useMutation } from '@apollo/client';
import { Button } from '@components/Button/Button';
import { Heading } from '@components/Heading/Heading';
import { Dialog } from '@components/dialogs/Dialog/Dialog';
import { Form } from '@components/form/Form/Form';
import { FormNumberInput } from '@components/form/FormNumberInput/FormNumberInput';
import { FormSelect } from '@components/form/FormSelect/FormSelect';
import { FormTextInput } from '@components/form/FormTextInput/FormTextInput';
import { WalletIcon } from '@components/icon/WalletIcon/WalletIcon';
import { Option } from '@components/input/Select/Select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@modules/toast/hooks/useToast';
import { CREATE_WALLET } from '@modules/wallet/graphql/mutations';
import { useContext } from 'react';
import { OverlayTriggerStateContext } from 'react-aria-components';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CurrencyCode, GetMyWalletsDocument, WalletIcon as WalletIconEnum } from '../../../../gql/graphql';
import { CurrencyOption } from '../CurrencyOption/CurrencyOption';

const formSchema = z.object({
  initialBalance: z.number(),
  icon: z.nativeEnum(WalletIconEnum),
  currencyCode: z.nativeEnum(CurrencyCode),
  displayName: z.string().min(1, 'must have length 1')
});

type FormSchema = z.infer<typeof formSchema>;

export function CreateWalletForm() {
  const { successToast } = useToast();

  const dialogState = useContext(OverlayTriggerStateContext);
  const { handleSubmit, control } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { displayName: 'we', currencyCode: CurrencyCode.Eur, initialBalance: 10, icon: WalletIconEnum.Bank }
  });
  const [createCategoryMutation, { error }] = useMutation(CREATE_WALLET, {
    awaitRefetchQueries: true,
    onCompleted,
    refetchQueries: [{ query: GetMyWalletsDocument }]
  });

  function onSubmit(data: FormSchema, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    createCategoryMutation({ variables: { input: data } });
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
            <FormSelect control={control} name='icon' label='Icon'>
              {Object.values(WalletIconEnum).map(walletIcon => (
                <Option id={walletIcon} key={walletIcon}>
                  <WalletIcon icon={walletIcon} />
                </Option>
              ))}
            </FormSelect>
            <FormTextInput control={control} name='displayName' label='Display name' />
            <FormNumberInput control={control} name='initialBalance' label='initial Balance' />
            <FormSelect control={control} name='currencyCode' label='Currency'>
              {Object.values(CurrencyCode).map(currencyCode => (
                <Option id={currencyCode} key={currencyCode}>
                  <CurrencyOption code={currencyCode} />
                </Option>
              ))}
            </FormSelect>

            <Button type='submit'>Create</Button>
          </Form>
        </>
      )}
    </Dialog>
  );
}
