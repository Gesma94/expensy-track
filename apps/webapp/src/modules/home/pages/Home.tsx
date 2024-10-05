import { Link } from '@components/Link/Link';
import { useAuth } from '@modules/auth/hooks/useAuth';

export function Home() {
  const { isAuthenticated, user, logout } = useAuth();

  function handleLogoutButton() {
    logout();
  }

  return (
    <>
      <h1>Expensy Track</h1>

      {isAuthenticated && (
        <div>
          <p>Welcome back, {user?.firstName}</p>
          <br />
          <button type='button' onClick={handleLogoutButton}>
            Logout
          </button>
        </div>
      )}
      {!isAuthenticated && <Link href='/login'>Login</Link>}
    </>
  );
}
