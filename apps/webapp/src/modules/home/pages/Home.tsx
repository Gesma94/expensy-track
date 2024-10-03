import { Link } from '@components/Link/Link';
import { useAuth } from '@modules/auth/hooks/useAuth';

export function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <h1>Expensy Track</h1>
      <Link href='/login'>Login</Link>
      <Link href='https://google.com'>outside</Link>
      {isAuthenticated && <p>Welcome back, {user?.firstName}</p>}
      {!isAuthenticated && <Link href='/login'>Login</Link>}
    </>
  );
}
