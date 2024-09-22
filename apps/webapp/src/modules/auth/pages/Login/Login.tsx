import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../common/consts/routes";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ErrorSchema, type ResponseError, type UserPayload } from "@expensy-track/common/schemas";
import { kyInstance } from "../../../fetch/utils/kyInstance";
import { HTTPError } from "ky";
import { isSchema } from "@expensy-track/common/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";

const schema = z.object({
  email: z.string().email("email format missing"),
  password: z.string().min(6, "password too short"),
});

type Schema = z.infer<typeof schema>;

async function mutationFn(json: Schema): Promise<UserPayload> {
  try {
    return await kyInstance.post<UserPayload>("login", { json }).json();
  } catch (error) {
    if (error instanceof HTTPError) {
      throw await error.response.json<ResponseError>();
    }

    throw error;
  }
}

export function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<Schema>({ resolver: zodResolver(schema) });
  const { mutate, error } = useMutation<UserPayload, ResponseError, Schema>({
    onSuccess,
    mutationFn,
  });

  function onSuccess(userPayload: UserPayload) {
    auth.setUser(userPayload);
    navigate(ROUTES.WALLET.NAME("test"));
  }

  function onSubmit(data: Schema, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    mutate(data);
  }

  function getErrorMessage() {
    if (isSchema(ErrorSchema, error)) {
      return error.message;
    }

    return "unknown error";
  }

  return (
    <>
      <h1>Login</h1>

      {error && getErrorMessage()}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>email</label>
        <input {...register("email")} defaultValue={""} placeholder='your email' />
        {formState.errors.email && <span>{formState.errors.email.message}</span>}

        <label>password</label>
        <input {...register("password")} defaultValue={""} placeholder='your password' />
        {formState.errors.password && <span>{formState.errors.password.message}</span>}

        <button type='submit'>Login</button>
      </form>

      <Link to={ROUTES.SIGNUP}>Register</Link>
    </>
  );
}
