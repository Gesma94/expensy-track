import { useQuery } from '@apollo/client';
import { Button } from '@components/Button/Button';
import { CreateTransactionForm } from '@modules/wallet/components/CreateTransactionForm/CreateTransactionForm';
import { GET_MY_WALLET } from '@modules/wallet/graphql/queries';
import { endOfMonth, getMonth, startOfMonth } from 'date-fns';
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

  const { loading, data, refetch, error } = useQuery(GET_MY_WALLET, {
    variables: {
      input: { id: id },
      transactionDateTimeRange: {
        startTime: startOfMonth(new Date()),
        endTime: endOfMonth(new Date())
      }
    }
  });
  const walletFragments = useFragment(MyWalletWithTransactionsFragmentDoc, data?.wallet?.result);
  const labelsFragment = useFragment(MyLabelFragmentDoc, data?.labels?.result);
  const categoriesFragment = useFragment(MyCategoryFragmentDoc, data?.categories?.result);

  async function onTransactionCreated() {
    await refetch();
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
          onCompleted={onTransactionCreated}
          walletId={id}
          labels={labelsFragment ?? []}
          categories={categoriesFragment ?? []}
        />
      </DialogTrigger>
    </>
  );
}
