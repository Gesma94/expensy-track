import { ROUTES } from '@common/consts/routes';
import { Heading } from '@components/ui/Heading/Heading';
import { Link } from '@components/ui/Link/Link';
import { NewWalletCard } from '@modules/wallet/components/NewWalletCard/NewWalletCard';
import { WalletCard } from '@modules/wallet/components/WalletCard/WalletCard';
import { getWalletsQuery } from '@modules/wallet/operations/get-wallets';
import { useQuery } from '@tanstack/react-query';
import { useFragment } from '../../../../gql';
import { MyWalletFragmentDoc } from '../../../../gql/graphql';

export function Wallets() {
  const { data, error, isFetching, refetch } = useQuery({ queryKey: ['user-wallets'], queryFn: getWalletsQuery });
  const walletFragments = useFragment(MyWalletFragmentDoc, data?.wallets?.result);

  function handleCreateWalletSuccess() {
    refetch();
  }

  return (
    <>
      <div>
        {isFetching && <p>Loading</p>}
        {error && <p>error while loading</p>}
        {!isFetching && (
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
                <NewWalletCard onCreateSuccess={handleCreateWalletSuccess} />
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
}
