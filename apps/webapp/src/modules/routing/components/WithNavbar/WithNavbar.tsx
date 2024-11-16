import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';

export function WithNavbar() {
  return (
    <div className='min-h-screen w-full md:bg-slate-100 flex'>
      <div className='hidden shrink-0 overflow-hidden md:block md:w-20 lg:w-64'>
        <Navbar />
      </div>

      <main className='grow'>
        <Outlet />
      </main>
    </div>
  );
}
