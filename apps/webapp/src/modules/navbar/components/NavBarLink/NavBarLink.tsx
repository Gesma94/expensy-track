import { Link } from '@components/ui/Link/Link';
import type { IconType } from 'react-icons/lib';
import { useLocation } from 'react-router-dom';
import { tv } from 'tailwind-variants';

const navbarLinkStyle = tv({
  slots: {
    link: 'flex items-center gap-3 px-4 py-3  outline-none font-sora font-semibold text-base text-independence',
    linkIcon: 'size-5 relative -top-[1px] fill-rhythm'
  },
  variants: {
    isActive: {
      true: {
        link: 'bg-alice-blue text-eerie-black',
        linkIcon: 'fill-celtic-blue'
      },
      false: {
        link: ''
      }
    }
  }
});

type Props = {
  href: string;
  iconBefore: IconType;
  label: string;
};

export function NavBarLink({ href, iconBefore, label }: Props) {
  const location = useLocation();
  const style = navbarLinkStyle({ isActive: href === location.pathname });

  return (
    <Link href={href} className={style.link()}>
      {iconBefore({ className: style.linkIcon() })}
      {label}
    </Link>
  );
}
