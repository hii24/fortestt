'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import styles from './styles.module.css';

const LangSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

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
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'ru')) {
      segments[0] = lang;
      router.push(`/${segments.join('/')}`);
    } else {
      router.push(`/${lang}${pathname}`);
    }
    setIsOpen(false);
  };

  return (
    <div className={styles.langMenu} ref={menuRef}>
      <div className={styles.selectedLang} onClick={toggleMenu}>
        <Image src="/icons/en.svg" alt="flag-en" width={22} height={22} />
        <p className={styles.selected}>EN</p>
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
        </ul>
      )}
    </div>
  );
};

export default LangSwitcher;
