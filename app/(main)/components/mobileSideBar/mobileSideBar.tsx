'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';

import styles from './styles.module.css';
import { useTranslations } from 'next-intl';

type LinkItem = { href: string; label: string };

const MobileSideBar = ({ links }: { links?: LinkItem[] }) => {
  const pathname = usePathname();
  const t = useTranslations('profile');

  const computedLinks: LinkItem[] =
    links ?? [
      { href: '/profile', label: t('main.header') },
      { href: '/profile/integrate', label: t('integrate.header') },
      { href: '/profile/settings', label: t('settings.header') },
      { href: '/profile/payouts', label: t('payouts.header') },
      // { href: '/profile/terms-of-use', label: t('breadcrumbs.terms') },
    ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const maxSlide = Math.max(0, computedLinks.length - 4);

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

  const normalizedPathname = (pathname || '').replace(/^\/(en|ru)(?=\/|$)/, '') || pathname;

  return (
    <div className={styles.mobileSideBar} {...handlers}>
      <div
        className={styles.slideContainer}
        style={{
          display: 'flex',
          transform: `translateX(-${currentSlide * itemWidthPercent}%)`,
          transition: 'transform 0.3s ease',
        }}>
        {computedLinks.map((item) => (
          <div key={item.href} className={styles.slideItem}>
            <Link href={item.href}>
              <button
                className={normalizedPathname === item.href ? styles.active : ''}
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
