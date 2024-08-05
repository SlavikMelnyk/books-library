import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
interface LayoutProps {
    children: ReactNode;
  }
  const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen h-[100%] overflow-scroll flex flex-col">
      <header className="bg-bgList border-slate-800 border-b-2 py-4">
      
   <div className="flex justify-center gap-10  p-2">
    <div className="bg-buttonColor text-white hover:bg-indigo-600 rounded p-2">
   <Link to='/authors'>Authors List</Link>

    </div>
    <div className="bg-buttonColor text-white hover:bg-indigo-600 rounded p-2">

    <Link to='/'>Books List</Link>
    </div>
   </div>

       
      </header>
      <main className="flex-grow bg-bgGray border-red-500">
        <div className="container flex justify-center my-0  mx-auto max-w-[1400px] px-4 py-8">
          {children}
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto max-w-7xl px-4">
          <p className="text-center"></p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
