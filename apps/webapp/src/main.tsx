import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './modules/auth/components/AuthContext/AuthContext';
import { ReactQueryProvider } from './modules/fetch/components/ReactQueryProvider/ReactQueryProvider';
import { router } from './router';
import './i18n/config';
import { ReactApolloProvider } from './modules/fetch/components/ReactApolloProvider/ReactApolloProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactApolloProvider>
      <ReactQueryProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ReactQueryProvider>
    </ReactApolloProvider>
  </StrictMode>
);
