import { Button as AriaButton, type ButtonProps } from 'react-aria-components';

export function Button(props: ButtonProps) {
  return <AriaButton {...props} className='border border-black' />;
}
