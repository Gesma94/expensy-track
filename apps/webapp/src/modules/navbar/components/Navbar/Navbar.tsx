import { ROUTES } from '@common/consts/routes';
import { Heading } from '@components/ui/Heading/Heading';
import { HiMiniCurrencyEuro, HiMiniHome, HiMiniSquares2X2, HiMiniTag, HiMiniWallet } from 'react-icons/hi2';
import { NavBarLink } from '../NavBarLink/NavBarLink';

export function Navbar() {
  return (
    <div className='w-full h-full px-3 py-11 bg-white text-gray-900 flex flex-col'>
      <Heading className='text-center text-celtic-blue text-4xl px-3 tracking-tighter'>
        <span className='font-light'>expensy</span>
        <span className='font-semibold'>track</span>
      </Heading>
      <nav className='mt-3 py-3 flex flex-col gap-3'>
        <NavBarLink href={ROUTES.HOME} iconBefore={HiMiniHome} label='Dashboard' />
        <NavBarLink href={ROUTES.WALLETS.ROOT} iconBefore={HiMiniWallet} label='Wallets' />
        <NavBarLink href={ROUTES.CATEGORIES.ROOT} iconBefore={HiMiniSquares2X2} label='Categories' />
        <NavBarLink href={ROUTES.LABELS.ROOT} iconBefore={HiMiniTag} label='Labels' />
        <NavBarLink href={ROUTES.BUDGETS.ROOT} iconBefore={HiMiniCurrencyEuro} label='Budgets' />
      </nav>
    </div>
  );
}
