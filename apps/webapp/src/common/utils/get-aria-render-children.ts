import type { ReactNode } from 'react';

export function getAriaRenderChildren<T>(
  values: T & { defaultChildren: ReactNode | undefined },
  children: ReactNode | ((values: T & { defaultChildren: ReactNode | undefined }) => ReactNode)
): ReactNode {
  if (!children) {
    return null;
  }

  if (typeof children === 'function') {
    return children(values);
  }

  return children;
}
