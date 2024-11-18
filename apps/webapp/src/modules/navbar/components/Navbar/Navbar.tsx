import { ROUTES } from '@common/consts/routes';
import { Link } from '@components/ui/Link/Link';

export function Navbar() {
  return (
    <nav className='w-full h-full bg-white text-gray-900 flex flex-col gap-2'>
      <Link href={ROUTES.HOME}>Home</Link>
      <Link href={ROUTES.WALLETS.ROOT}>Wallets</Link>
      <Link href={ROUTES.CATEGORIES.ROOT}>Categories</Link>
      <Link href={ROUTES.LABELS.ROOT}>Labels</Link>
      <Link href={ROUTES.BUDGETS.ROOT}>Budgets</Link>
    </nav>
  );
}
