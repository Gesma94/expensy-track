import { useTranslation } from 'react-i18next';
import { CategoryIcon } from '../../../gql/graphql';

type Props = {
  icon: CategoryIcon;
};

export function CategoryIconName({ icon }: Props) {
  const { t } = useTranslation('components', { keyPrefix: 'layout.category-icon-name' });

  switch (icon) {
    case CategoryIcon.Activity:
      return t('activity');
    default:
      return icon.toString();
  }
}
