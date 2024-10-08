import type { RouteObject } from 'react-router-dom';
import { ROUTES } from '../../common/consts/routes';
import { PrivateRoute } from '../auth/components/PrivateRoute/PrivateRoute';
import { Wallet } from './pages/Wallet';

export const walletRoutes: RouteObject[] = [
  {
    index: true,
    path: ROUTES.WALLETS.PATHS.NAME,
    element: (
      <PrivateRoute>
        <Wallet />
      </PrivateRoute>
    )
  }
];
