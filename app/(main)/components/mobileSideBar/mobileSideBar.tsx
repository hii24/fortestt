'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';

import styles from './styles.module.css';

const MobileSideBar = ({
  links = [
    { href: '/profile', label: 'Statistics' },
    { href: '/profile/integrate', label: 'Integrate' },
    { href: '/profile/settings', label: 'Settings' },
    { href: '/profile/payouts', label: 'Payouts' },
    // { href: '/profile/terms-of-use', label: 'Terms' },
  ],
}) => {
  const pathname = usePathname();

  const [currentSlide, setCurrentSlide] = useState(0);
  const maxSlide = Math.max(0, links.length - 4);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
    },
    onSwipedRight: () => {
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    },
    trackMouse: true,
  });

  const itemWidthPercent = 100 / 4;

  return (
    <div className={styles.mobileSideBar} {...handlers}>
      <div
        className={styles.slideContainer}
        style={{
          display: 'flex',
          transform: `translateX(-${currentSlide * itemWidthPercent}%)`,
          transition: 'transform 0.3s ease',
        }}>
        {links.map((item) => (
          <div key={item.href} className={styles.slideItem}>
            <Link href={item.href}>
              <button
                className={pathname === item.href ? styles.active : ''}
                onClick={(e) => e.stopPropagation()}>
                {item.label}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSideBar;
