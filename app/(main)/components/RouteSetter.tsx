'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/app/(main)/components/header/Header';
import Footer from '@/app/(main)/components/footer/footer';

export default function RouteSetter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isProfileRoute = pathname.startsWith('/profile');

  return (
    <>
      {!isProfileRoute && <Header />}
      <div className="flex flex-col container flex-1">{children}</div>
      <Footer />
    </>
  );
}
