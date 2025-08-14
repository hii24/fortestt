'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.css';
import { useTranslations } from 'next-intl';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations('profile');
  if (!pathname) return null;

  let segments = pathname.replace(/^\/|\/$/g, '').split('/');
  const profileIndex = segments.indexOf('profile');
  if (profileIndex === -1) return null;
  segments = segments.slice(profileIndex);

  if (segments.length === 1) {
    segments.push('statistics');
  }

  const crumbs = segments.map((segment, idx) => {
    let label = idx === 0 ? 'Profile' : segment;
    /*     if (label.toLowerCase() === 'statistics') {
      label = 'History';
    } */
    if (label.toLowerCase() === 'terms-of-use') {
      label = 'Terms of use';
    }
    if (label.toLowerCase() === 'profile') label = 'Profile';
    if (label.toLowerCase() === 'statistics') label = t('main.header');
    if (label.toLowerCase() === 'integrate') label = t('integrate.header');
    if (label.toLowerCase() === 'settings') label = t('settings.header');
    if (label.toLowerCase() === 'payouts') label = t('payouts.header');
    const href = '/' + segments.slice(0, idx + 1).join('/');
    return { label, href };
  });

  return (
    <nav aria-label="breadcrumbs" className={styles.breadcrumbs}>
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1;
        return (
          <React.Fragment key={crumb.href}>
            {!isLast ? (
              <>
                <Link href={crumb.href}>{crumb.label}</Link>
                {' / '}
              </>
            ) : (
              <span className={styles.lastAdress}>{crumb.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
