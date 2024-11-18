import { RouterProvider as AriaRouterProvider } from 'react-aria-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAbsoluteHref } from '../../hooks/useAbsoluteHref';

export function RouterRoot() {
  const navigate = useNavigate();

  return (
    <AriaRouterProvider navigate={navigate} useHref={useAbsoluteHref}>
      <Outlet />
    </AriaRouterProvider>
  );
}
