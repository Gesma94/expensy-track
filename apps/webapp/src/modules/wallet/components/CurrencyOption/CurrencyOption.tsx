import type { CurrencyCode } from '../../../../gql/graphql';
import { useCurrency } from '../../../../hooks/useCurrency/useCurrency';

type Props = {
  code: CurrencyCode;
};

export function CurrencyOption({ code: codeEnumValue }: Props) {
  const { code, currency } = useCurrency(codeEnumValue);

  return (
    <p>
      {code} ({currency})
    </p>
  );
}
