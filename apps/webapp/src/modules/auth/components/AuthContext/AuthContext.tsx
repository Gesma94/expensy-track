import { LoadingModal } from '@components/LoadingModal/LoadingModal';
import { type ReplyAuthenticate, type UserPayload, UserPayloadSchema } from '@expensy-track/common/schemas';
import { isSchema } from '@expensy-track/common/utils';
import { useQuery } from '@tanstack/react-query';
import { type ContextType, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { kyInstance } from '../../../fetch/utils/kyInstance';
import { AuthContext } from '../../utils/authContext';

async function fetchData(): Promise<ReplyAuthenticate> {
  return kyInstance.get('authenticate').json();
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [user, setUser] = useState<UserPayload | undefined>(undefined);

  const { t } = useTranslation('modules', { keyPrefix: 'auth.components.auth-context' });
  const { isPending, data, isError } = useQuery({
    retry: false,
    queryFn: fetchData,
    queryKey: ['authenticate'],
    refetchOnWindowFocus: false
  });

  const authContextValueMemoized = useMemo<ContextType<typeof AuthContext>>(() => {
    return {
      user,
      setUser,
      isAuthenticated: user !== undefined
    };
  }, [user]);

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (!isError && isSchema(UserPayloadSchema, data)) {
      setUser(data);
    }

    setIsInitialized(true);
  }, [data, isError, isPending]);

  return (
    <AuthContext.Provider value={authContextValueMemoized}>
      {!isInitialized && <LoadingModal isTransparent message={t('loading-message')} />}
      {isInitialized && children}
    </AuthContext.Provider>
  );
}
