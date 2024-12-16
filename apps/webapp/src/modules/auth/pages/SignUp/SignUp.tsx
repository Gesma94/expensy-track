import type { RestError, UserPayload } from '@expensy-track/common/schemas';
import { isRestErrorSchema } from '@expensy-track/common/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { ROUTES } from '../../../../common/consts/routes';
import { kyInstance } from '../../../fetch/utils/kyInstance';
import { useAuth } from '../../hooks/useAuth';

const formSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  email: z.string().email('email format missing'),
  password: z.string().min(6, 'password too short')
});

type FormSchema = z.infer<typeof formSchema>;

async function mutationFn(json: FormSchema): Promise<UserPayload> {
  try {
    return await kyInstance.post('sign-up', { json }).json();
  } catch (error) {
    if (error instanceof HTTPError) {
      throw await error.response.json<RestError>();
    }

    throw error;
  }
}

export function SignUp() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });
  const { mutate, error } = useMutation<UserPayload, RestError, FormSchema>({
    onSuccess,
    mutationFn
  });

  function onSuccess(userPayload: UserPayload) {
    auth.setUser(userPayload);
    navigate(ROUTES.WALLETS.ROOT);
  }

  function onSubmit(data: FormSchema, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    mutate(data);
  }

  function getErrorMessage() {
    if (isRestErrorSchema(error)) {
      return error.message;
    }

    return 'unknown error';
  }

  return (
    <>
      <h1>Sign Up</h1>

      {error && getErrorMessage()}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='email-input'>email</label>
        <input id='email-input' {...register('email')} defaultValue={''} placeholder='your email' />

        <label htmlFor='password-input'>password</label>
        <input
          id='password-input'
          {...register('password')}
          type='password'
          defaultValue={''}
          placeholder='your password'
        />

        <label htmlFor='first-name-input'>first name</label>
        <input id='first-name-input' {...register('firstName')} defaultValue={''} placeholder='first name' />

        <label htmlFor='last-name-input'>last name</label>
        <input id='last-name-input' {...register('lastName')} defaultValue={''} placeholder='last name' />

        <button type='submit'>Signup</button>
      </form>

      <Link to={ROUTES.SIGNUP}>Register</Link>
    </>
  );
}
