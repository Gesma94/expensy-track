import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './common/consts/routes';
import { PrivateRoute } from './modules/auth/components/PrivateRoute/PrivateRoute';
import { authRoutes } from './modules/auth/routes';
import { Categories } from './modules/category/pages/Categories/Categories';
import { Home } from './modules/home/pages/Home';
import { walletRoutes } from './modules/wallet/routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />
  },
  ...authRoutes,
  {
    path: ROUTES.WALLET.ROOT,
    children: walletRoutes
  },
  {
    path: 'categories',
    element: (
      <PrivateRoute>
        <Categories />
      </PrivateRoute>
    )
  }
]);
