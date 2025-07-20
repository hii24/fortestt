'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BackgroundSetter() {
  const pathname = usePathname();

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('bg-home', 'bg-default');

    const segments = pathname.split('/').filter(Boolean);

    if (segments.length === 0 || (segments.length === 1 && (segments[0] === 'en' || segments[0] === 'ru'))) {
      htmlElement.classList.add('bg-home');
    } else {
      htmlElement.classList.add('bg-default');
    }
  }, [pathname]);

  return null;
}
