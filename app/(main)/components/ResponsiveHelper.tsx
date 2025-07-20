'use client';

import { useEffect, useState } from 'react';

type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>('lg');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('xs');
      } else if (width < 768) {
        setScreenSize('sm');
      } else if (width < 1024) {
        setScreenSize('md');
      } else if (width < 1280) {
        setScreenSize('lg');
      } else if (width < 1600) {
        setScreenSize('xl');
      } else {
        setScreenSize('2xl');
      }
    };

    // Инициализация при монтировании
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}

export function useIsMobile(): boolean {
  const screenSize = useScreenSize();
  return screenSize === 'xs' || screenSize === 'sm';
}

export default function ResponsiveHelper() {
  return null;
}
