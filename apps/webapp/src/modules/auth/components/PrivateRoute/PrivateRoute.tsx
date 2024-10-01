import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function PrivateRoute({ children }: React.PropsWithChildren) {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return children;
  }

  return <Navigate to='/login' />;
}
