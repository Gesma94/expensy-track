import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../common/consts/routes";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ErrorSchema, type Error, type UserPayload } from "@expensy-track/common/schemas";
import { kyInstance } from "../../../fetch/utils/kyInstance";
import { z } from "zod";
import { HTTPError } from "ky";
import { useAuth } from "../../hooks/useAuth";
import { isSchema } from "@expensy-track/common/utils";

const formSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  email: z.string().email("email format missing"),
  password: z.string().min(6, "password too short"),
});

type FormSchema = z.infer<typeof formSchema>;

async function mutationFn(json: FormSchema): Promise<UserPayload> {
  try {
    return await kyInstance.post("sign-up", { json }).json();
  } catch (error) {
    if (error instanceof HTTPError) {
      throw await error.response.json<Error>();
    }

    throw error;
  }
}

export function SignUp() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormSchema>();
  const { mutate, error } = useMutation<UserPayload, Error, FormSchema>({
    onSuccess,
    mutationFn,
  });

  function onSuccess(userPayload: UserPayload) {
    auth.setUser(userPayload);
    navigate(ROUTES.WALLET.NAME("test"));
  }

  function onSubmit(data: FormSchema, event?: React.BaseSyntheticEvent) {
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
      <h1>Sign Up</h1>

      {error && getErrorMessage()}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>email</label>
        <input {...register("email")} defaultValue={""} placeholder='your email' />

        <label>password</label>
        <input {...register("password")} defaultValue={""} placeholder='your password' />

        <label>first name</label>
        <input {...register("firstName")} defaultValue={""} placeholder='first name' />

        <label>last name</label>
        <input {...register("lastName")} defaultValue={""} placeholder='last name' />

        <button type='submit'>Signup</button>
      </form>

      <Link to={ROUTES.SIGNUP}>Register</Link>
    </>
  );
}
