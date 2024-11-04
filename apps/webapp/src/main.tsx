import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './modules/auth/components/AuthContext/AuthContext';
import { ReactQueryProvider } from './modules/fetch/components/ReactQueryProvider/ReactQueryProvider';
import './i18n/config';
import './index.css';
import { getRouter } from '@modules/routing/utils/getRouter';
import { ToastProvider } from '@modules/toast/components/ToastProvider/ToastProvider';

const router = getRouter();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <ReactQueryProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ReactQueryProvider>
    </ToastProvider>
  </StrictMode>
);
