import { ErrorCode } from '@expensy-track/common/enums';
import type { RestError, UserPayload } from '@expensy-track/common/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { ROUTES } from '../../../../common/consts/routes';
import { kyInstance } from '../../../fetch/utils/kyInstance';
import { useAuth } from '../../hooks/useAuth';

const schema = z.object({
  email: z.string().email('email format missing'),
  password: z.string().min(6, 'password too short')
});

type Schema = z.infer<typeof schema>;

async function mutationFn(json: Schema): Promise<UserPayload> {
  try {
    return await kyInstance.post<UserPayload>('login', { json }).json();
  } catch (error) {
    if (error instanceof HTTPError) {
      throw await error.response.json<RestError>();
    }

    throw error;
  }
}

export function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation('modules', { keyPrefix: 'auth.pages.login' });
  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(schema)
  });
  const { mutate, error } = useMutation<UserPayload, RestError, Schema>({
    onSuccess,
    mutationFn
  });

  function onSuccess(userPayload: UserPayload) {
    auth.setUser(userPayload);
    navigate(ROUTES.WALLETS.ROOT);
  }

  function onSubmit(data: Schema, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    mutate(data);
  }

  function getErrorMessage() {
    if (error?.code === ErrorCode.ET_InvalidCredentials) {
      return t('errors.invalid-credentials');
    }

    return t('errors.cannot-login');
  }

  return (
    <>
      <h1>Login</h1>

      {error && getErrorMessage()}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='email-input'>email</label>
        <input id='email-input' {...register('email')} defaultValue={''} placeholder='your email' />
        {formState.errors.email && <span>{formState.errors.email.message}</span>}

        <label htmlFor='password-input'>password</label>
        <input
          id='password-input'
          {...register('password')}
          type='password'
          defaultValue={''}
          placeholder='your password'
        />
        {formState.errors.password && <span>{formState.errors.password.message}</span>}

        <button type='submit'>Login</button>
      </form>

      <Link to={ROUTES.SIGNUP}>Register</Link>
    </>
  );
}
