import { useTranslation } from 'react-i18next';
import type { CurrencyCode } from '../../gql/graphql';

type ReturnType = {
  currency: string;
  code: string;
};

export function useCurrency(code: CurrencyCode): ReturnType {
  const { t } = useTranslation('hooks', { keyPrefix: 'useCurrency' });

  return {
    code: t(`${code}.code`),
    currency: t(`${code}.currency`)
  };
}
