export function getAriaCustomClassName<T>(values: T, className: undefined | string | ((values: T) => string)): string {
  if (!className) {
    return '';
  }

  if (typeof className === 'string') {
    return className;
  }

  return className(values);
}
