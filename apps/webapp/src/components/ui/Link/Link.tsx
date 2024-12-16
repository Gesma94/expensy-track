import type { ComponentProps } from 'react';
import { Link as AriaLink } from 'react-aria-components';

export function Link(props: ComponentProps<typeof AriaLink>) {
  return <AriaLink {...props} />;
}
