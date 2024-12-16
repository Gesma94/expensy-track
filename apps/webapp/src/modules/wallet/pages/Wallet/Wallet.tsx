import { Button } from '@components/ui/buttons/Button/Button';
import { CreateTransactionForm } from '@modules/wallet/components/CreateTransactionForm/CreateTransactionForm';
import { getWalletQuery } from '@modules/wallet/operations/get-wallet';
import { useQuery } from '@tanstack/react-query';
import { endOfMonth, startOfMonth } from 'date-fns';
import { DialogTrigger } from 'react-aria-components';
import { PiPlus } from 'react-icons/pi';
import { useParams } from 'react-router-dom';
import invariant from 'tiny-invariant';
import { useFragment } from '../../../../gql';
import {
  MyCategoryFragmentDoc,
  MyLabelFragmentDoc,
  MyWalletWithTransactionsFragmentDoc
} from '../../../../gql/graphql';

export function Wallet() {
  const { id } = useParams();
  invariant(id, 'wallet id must be provided');
  const { data, refetch } = useQuery({
    queryKey: ['user-wallet', id],
    queryFn: () =>
      getWalletQuery({
        input: { id },
        transactionDateTimeRange: {
          startTime: startOfMonth(new Date()),
          endTime: endOfMonth(new Date())
        }
      })
  });

  const walletFragments = useFragment(MyWalletWithTransactionsFragmentDoc, data?.wallet?.result);
  const labelsFragment = useFragment(MyLabelFragmentDoc, data?.labels?.result);
  const categoriesFragment = useFragment(MyCategoryFragmentDoc, data?.categories?.result);

  async function onTransactionCreationSuccess() {
    refetch();
  }

  return (
    <>
      <h1>Expensy Track - Wallet {walletFragments?.displayName}</h1>

      <ul>
        {walletFragments?.transactions?.map(transaction => (
          <li key={transaction?.id}>{transaction?.amount}</li>
        ))}
      </ul>

      <DialogTrigger>
        <Button>
          <div className='relative p-4'>
            <div className='absolute inset-0 opacity-20'>
              <PiPlus size={'100%'} />
            </div>
            Add new transaction
          </div>
        </Button>
        <CreateTransactionForm
          onSuccess={onTransactionCreationSuccess}
          walletId={id}
          labels={labelsFragment ?? []}
          categories={categoriesFragment ?? []}
        />
      </DialogTrigger>
    </>
  );
}
