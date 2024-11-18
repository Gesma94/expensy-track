import { ROUTES } from '@common/consts/routes';
import { PrivateRoute } from '@modules/auth/components/PrivateRoute/PrivateRoute';
import { authRoutes } from '@modules/auth/routes';
import { budgetRoutes } from '@modules/budget/routes';
import { Categories } from '@modules/category/pages/Categories/Categories';
import { Home } from '@modules/home/pages/Home';
import { Labels } from '@modules/label/pages/Labels/Labels';
import { RouterRoot } from '@modules/routing/components/RouterRoot/RouterRoot';
import { walletRoutes } from '@modules/wallet/routes';
import { createBrowserRouter } from 'react-router-dom';
import { PageWithNavbar } from '../../navbar/components/PageWithNavbar/PageWithNavbar';

export function getRouter(): ReturnType<typeof createBrowserRouter> {
  return createBrowserRouter([
    {
      path: '',
      element: <RouterRoot />,
      children: [
        ...authRoutes,
        {
          path: '',
          element: <PageWithNavbar />,
          children: [
            {
              path: ROUTES.HOME,
              element: <Home />
            },
            {
              path: ROUTES.WALLETS.ROOT,
              children: walletRoutes
            },
            {
              path: 'categories',
              element: (
                <PrivateRoute>
                  <Categories />
                </PrivateRoute>
              )
            },
            {
              path: 'labels',
              element: (
                <PrivateRoute>
                  <Labels />
                </PrivateRoute>
              )
            },
            {
              path: ROUTES.BUDGETS.ROOT,
              children: budgetRoutes
            }
          ]
        }
      ]
    }
  ]);
}
