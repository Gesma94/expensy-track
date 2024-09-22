import { Link } from "react-router-dom";
import { ROUTES } from "../../../../common/consts/routes";

export function Login() {
  return (
    <>
      <h1>Login</h1>

      <Link to={ROUTES.SIGNUP}>Register</Link>
    </>
  );
}
