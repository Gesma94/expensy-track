import type { RouteObject } from 'react-router-dom';
import { ROUTES } from '../../common/consts/routes';
import { PrivateRoute } from '../auth/components/PrivateRoute/PrivateRoute';
import { Budgets } from './pages/Budgets/Budgets';
import { CreateBudget } from './pages/CreateBudget/CreateBudget';

export const budgetRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <PrivateRoute>
        <Budgets />
      </PrivateRoute>
    )
  },
  {
    path: ROUTES.BUDGETS.CREATE(),
    element: (
      <PrivateRoute>
        <CreateBudget />
      </PrivateRoute>
    )
  }
];
