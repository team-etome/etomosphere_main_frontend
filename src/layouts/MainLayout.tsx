import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="w-full">
        <TopBar />
        <Navbar />
      </header>

      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};