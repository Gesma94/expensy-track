import { ROUTES } from '@common/consts/routes';
import { Link } from '@components/Link/Link';
import { RouterProvider as AriaRouterProvider } from 'react-aria-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAbsoluteHref } from '../hooks/useAbsoluteHref';

export function RouterRoot() {
  const navigate = useNavigate();

  return (
    <AriaRouterProvider navigate={navigate} useHref={useAbsoluteHref}>
      <div className='flex flex-col'>
        <nav className='bg-gray-800 text-white flex gap-2'>
          <Link href={ROUTES.HOME}>Home</Link>
          <Link href={ROUTES.WALLETS.ROOT}>Wallets</Link>
          <Link href={ROUTES.CATEGORIES.ROOT}>Categories</Link>
          <Link href={ROUTES.LABELS.ROOT}>Labels</Link>
          <Link href={ROUTES.BUDGETS.ROOT}>Budgets</Link>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </AriaRouterProvider>
  );
}
