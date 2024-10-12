import type { MyWalletFragment } from '../../../../gql/graphql';

type Props = {
  wallet: MyWalletFragment;
};

export function WalletCard({ wallet }: Props) {
  return <div className='border-black p-4'>{wallet.displayName}</div>;
}
