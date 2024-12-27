import type { IconType } from '@common/enums/icon';
import { getIconComponent } from '@common/utils/get-icon-component';
import type { HTMLProps } from 'react';

type Props = HTMLProps<SVGSVGElement> & {
  icon: IconType;
};

export function Icon({ icon, ...svgProps }: Props) {
  const Icon = getIconComponent(icon);

  return <Icon {...svgProps} />;
}
