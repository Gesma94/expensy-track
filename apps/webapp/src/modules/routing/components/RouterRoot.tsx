import { ROUTES } from '@common/consts/routes';
import { Link } from '@components/Link/Link';
import { RouterProvider as AriaRouterProvider } from 'react-aria-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAbsoluteHref } from '../hooks/useAbsoluteHref';
import { Navbar } from './Navbar/Navbar';

export function RouterRoot() {
  const navigate = useNavigate();

  return (
    <AriaRouterProvider navigate={navigate} useHref={useAbsoluteHref}>
      <Outlet />
      {/* <div className='min-h-screen w-full bg-slate-200 flex'>
      <div className='shrink-0 w-64'>
        <Navbar />
        </div>



        <main className='w-screen max-w-7xl mx-auto'>
          <Outlet />
        </main>

      </div>> */}
    </AriaRouterProvider>
  );
}
