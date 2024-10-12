import { useParams } from 'react-router-dom';
import invariant from 'tiny-invariant';

export function Wallet() {
  const { name } = useParams();

  invariant(name, 'wallet name must be provided');

  return (
    <>
      <h1>Expensy Track - Wallet {name}</h1>
    </>
  );
}
