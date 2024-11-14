import { Button } from '@components/ui/Button/Button';
import { Heading } from '@components/ui/Heading/Heading';
import { Dialog } from '@components/ui/dialogs/Dialog/Dialog';
import { Form } from '@components/ui/form/Form/Form';
import { FormNumberInput } from '@components/ui/form/FormNumberInput/FormNumberInput';
import { FormSelect } from '@components/ui/form/FormSelect/FormSelect';
import { FormTextInput } from '@components/ui/form/FormTextInput/FormTextInput';
import { WalletIcon } from '@components/ui/icon/WalletIcon/WalletIcon';
import { Option } from '@components/ui/input/Select/Select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@modules/toast/hooks/useToast';
import { createWalletMutation } from '@modules/wallet/operations/create-wallet';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CurrencyCode, WalletIcon as WalletIconEnum } from '../../../../gql/graphql';
import { CurrencyOption } from '../CurrencyOption/CurrencyOption';

type Props = {
  onSuccess: () => void;
};

const formSchema = z.object({
  initialBalance: z.number(),
  icon: z.nativeEnum(WalletIconEnum),
  currencyCode: z.nativeEnum(CurrencyCode),
  displayName: z.string().min(1, 'must have length 1')
});

type FormSchema = z.infer<typeof formSchema>;

export function CreateWalletForm({ onSuccess: parentOnSuccess }: Props) {
  const { successToast, errorToast } = useToast();

  const { handleSubmit, control } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { displayName: 'we', currencyCode: CurrencyCode.Eur, initialBalance: 10, icon: WalletIconEnum.Bank }
  });

  const { mutate, error } = useMutation({
    mutationKey: ['create-wallet'],
    mutationFn: createWalletMutation,
    onSuccess,
    onError
  });

  function onSubmit(data: FormSchema, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    mutate({ input: data });
  }

  function onSuccess() {
    successToast('OK', 'wallet created');
    parentOnSuccess();
  }

  function onError() {
    console.error(error);
    errorToast('Error', 'Category could not be created');
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
