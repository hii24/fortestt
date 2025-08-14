'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import LangSwitcher from '@/app/(main)/components/langSwitcher/langSwitcher';
import { NAV_LINKS } from '@/config/navigation.config';
import { useTranslations } from 'next-intl';
import { Logo } from '../Logo/Logo';
import { useEffect, useState } from 'react';
import ava from '@/public/_home/_reviews/ava.svg';

interface MobileMenuProps {
  isAdmin?: boolean;
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  name?: string;
  username: string;
}

export default function MobileMenu({ isOpen, onClose, isAuthenticated, isAdmin, username }: MobileMenuProps) {
  const t = useTranslations();
  const [shouldRenderInner, setShouldRenderInner] = useState(false);

  useEffect(() => {
    const scrollContainer = document.documentElement;
    if (isOpen) {
      setShouldRenderInner(true);
      scrollContainer.style.overflow = 'hidden';
    } else {
      const timeout = setTimeout(() => setShouldRenderInner(false), 500);
      scrollContainer.style.overflow = '';

      return () => {
        scrollContainer.style.overflow = '';
        clearTimeout(timeout);
      };
    }
  }, [isOpen]);

  return (
    <div
      className={`
        ${styles.modalMenu}
        fixed inset-0 z-50 transition-opacity duration-600 overflow-hidden
        ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
      `}>
      <div
        className={`
          ${styles.modalContent}
          transition-transform duration-500
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
        <div className={`${styles.modalHeader} container mx-auto`}>
          <Logo />
          <div className={styles.modalRight}>
            <LangSwitcher />
            <button className={styles.closeButton} onClick={onClose}>
              <Image src="/icons/close.svg" width={24} height={24} alt="close" />
            </button>
          </div>
        </div>

        {shouldRenderInner && (
          <>
            {isAuthenticated ? (
              <div className={`${styles.authButtons} container mx-auto`}>
                <Link href="/auth" className={styles.login}>
                  {t('auth.login')}
                </Link>
                <Link href="/auth?register" className={styles.signup}>
                  {t('auth.signup')}
                </Link>
              </div>
            ) : (
              <Link
                href={!isAdmin ? '/profile' : '/admin'}
                onClick={() => {
                  console.log('clicked');
                  onClose();
                }}>
                <li className={`${styles.userInfo} container mx-auto`}>
                  <Image src={ava} width={40} height={40} alt="avatar" />
                  <div className={styles.info}>
                    <p className={styles.subName}>{username}</p>
                  </div>
                </li>
              </Link>
            )}

            <ul className={`${styles.navLinks} container mx-auto`}>
              {NAV_LINKS.map(({ labelKey, href }) => (
                <li key={labelKey}>
                  <Link href={href} onClick={onClose}>
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
