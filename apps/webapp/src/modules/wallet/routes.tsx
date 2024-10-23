import type { RouteObject } from 'react-router-dom';
import { ROUTES } from '../../common/consts/routes';
import { PrivateRoute } from '../auth/components/PrivateRoute/PrivateRoute';
import { Wallet } from './pages/Wallet/Wallet';
import { Wallets } from './pages/Wallets/Wallets';

export const walletRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <PrivateRoute>
        <Wallets />
      </PrivateRoute>
    )
  },
  {
    path: ROUTES.WALLETS.PATHS.ID,
    element: (
      <PrivateRoute>
        <Wallet />
      </PrivateRoute>
    )
  }
];
