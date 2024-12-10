import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';

export function PageWithNavbar() {
  return (
    <div className='min-h-screen w-full md:bg-alice-blue flex'>
      <div className='hidden shrink-0 overflow-hidden md:block'>
        <Navbar />
      </div>

      <main className='grow'>
        <Outlet />
      </main>
    </div>
  );
}
