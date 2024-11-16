import { useTranslation } from 'react-i18next';
import { CategoryType } from '../../../gql/graphql';

type Props = {
  categoryType: CategoryType;
};

export function CategoryTypeName({ categoryType }: Props) {
  const { t } = useTranslation('components', { keyPrefix: 'layout.category-type-name' });

  switch (categoryType) {
    case CategoryType.Income:
      return t('income');
    case CategoryType.Expanse:
      return t('expanse');
    case CategoryType.Transfer:
      return t('transfer');
  }
}
