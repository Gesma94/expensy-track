import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';

export function WithNavbar() {
  return (
    <div className='min-h-screen w-full bg-slate-100 flex'>
      <div className='shrink-0 w-64'>
        <Navbar />
      </div>

      <main className='grow'>
        <Outlet />
      </main>
    </div>
  );
}
