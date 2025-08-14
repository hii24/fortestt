'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import Cookies from 'js-cookie';
import styles from './styles.module.css';

const LangSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLanguageSelect = (lang: string) => {
    const basePath = (pathname || '/').replace(/^\/(en|ru|uk)(?=\/|$)/, '') || '/';
    const qs = searchParams?.toString();
    const href = `/${lang}${basePath}${qs ? `?${qs}` : ''}`;
    Cookies.set('NEXT_LOCALE', lang, { path: '/' });
    router.push(href);
    setIsOpen(false);
  };

  return (
    <div className={styles.langMenu} ref={menuRef}>
      <div className={styles.selectedLang} onClick={toggleMenu}>
        <Image
          src={currentLocale === 'ru' ? '/icons/ru.svg' : currentLocale === 'en' ? '/icons/en.svg' : '/icons/globe.svg'}
          alt={`flag-${currentLocale}`}
          width={22}
          height={22}
        />
        <p className={styles.selected}>{currentLocale.toUpperCase()}</p>
        <Image src="/icons/down.svg" alt="arrow-down" width={15} height={15} />
      </div>

      {isOpen && (
        <ul className={styles.langOpenMenu}>
          <li>
            <button
              className="flex gap-2.5"
              onClick={() => {
                handleLanguageSelect('en');
              }}>
              <Image src="/icons/en.svg" alt="flag-en" width={22} height={22} />
              <p>English (US)</p>
            </button>
          </li>
          <li>
            <button
              className={styles.ru}
              onClick={() => {
                handleLanguageSelect('ru');
              }}>
              <Image src="/icons/ru.svg" alt="flag-ru" width={22} height={22} />
              <p>Русский</p>
            </button>
          </li>
          <li>
            <button
              className="flex gap-2.5"
              onClick={() => {
                handleLanguageSelect('uk');
              }}>
              <Image src="/icons/globe.svg" alt="flag-uk" width={22} height={22} />
              <p>Українська</p>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LangSwitcher;
