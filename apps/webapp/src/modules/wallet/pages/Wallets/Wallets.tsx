import { useQuery } from '@apollo/client';
import { Heading } from '@components/Heading/Heading';
import { NewWalletCard } from '@modules/wallet/components/NewWalletCard/NewWalletCard';
import { WalletCard } from '@modules/wallet/components/WalletCard/WalletCard';
import { GET_MY_WALLETS } from '@modules/wallet/graphql/queries';
import { useFragment } from '../../../../gql';
import { MyWalletFragmentDoc } from '../../../../gql/graphql';

export function Wallets() {
  const { loading, data, error } = useQuery(GET_MY_WALLETS);
  const labelsFragment = useFragment(MyWalletFragmentDoc, data?.wallets?.result);

  return (
    <>
      <div>
        {loading && <p>Loading</p>}
        {error && <p>error while loading</p>}
        {!loading && (
          <>
            <Heading level={1}>Wallets</Heading>
            <ul>
              {labelsFragment?.map(wallet => (
                <li key={wallet.id}>
                  <WalletCard wallet={wallet} />
                </li>
              ))}
              <li>
                <NewWalletCard />
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
}
