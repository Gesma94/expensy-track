import { useQuery } from '@apollo/client';
import { GET_MY_WALLET } from '@modules/wallet/graphql/queries';
import { useParams } from 'react-router-dom';
import invariant from 'tiny-invariant';
import { useFragment } from '../../../../gql';
import { MyWalletWithTransactionsFragmentDoc } from '../../../../gql/graphql';

export function Wallet() {
  const { id } = useParams();

  invariant(id, 'wallet id must be provided');

  const { loading, data, error } = useQuery(GET_MY_WALLET, {
    variables: {
      input: { id: id },
      transactionDateTimeRange: {
        startTime: new Date('2024-10-11T23:37:21.260Z'),
        endTime: new Date('2024-10-16T23:37:21.260Z')
      }
    }
  });
  const walletFragments = useFragment(MyWalletWithTransactionsFragmentDoc, data?.wallet?.result);

  console.log(walletFragments);

  return (
    <>
      <h1>Expensy Track - Wallet {walletFragments?.displayName}</h1>

      <ul>
        {walletFragments?.transactions?.map(transaction => (
          <li key={transaction?.id}>{transaction?.amount}</li>
        ))}
      </ul>
    </>
  );
}
