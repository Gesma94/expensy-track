import { useQuery } from '@apollo/client';
import { ROUTES } from '@common/consts/routes';
import { Heading } from '@components/Heading/Heading';
import { Link } from '@components/Link/Link';
import { NewWalletCard } from '@modules/wallet/components/NewWalletCard/NewWalletCard';
import { WalletCard } from '@modules/wallet/components/WalletCard/WalletCard';
import { GET_MY_WALLETS } from '@modules/wallet/graphql/queries';
import { useFragment } from '../../../../gql';
import { MyWalletFragmentDoc } from '../../../../gql/graphql';

export function Wallets() {
  const { loading, data, error } = useQuery(GET_MY_WALLETS);
  const walletFragments = useFragment(MyWalletFragmentDoc, data?.wallets?.result);

  return (
    <>
      <div>
        {loading && <p>Loading</p>}
        {error && <p>error while loading</p>}
        {!loading && (
          <>
            <Heading level={1}>Wallets</Heading>
            <ul>
              {walletFragments?.map(wallet => (
                <li key={wallet.id}>
                  <Link href={ROUTES.WALLETS.ID(wallet.id)}>
                    <WalletCard wallet={wallet} />
                  </Link>
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
