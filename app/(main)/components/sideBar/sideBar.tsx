'use client';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getLocalStoreItem } from '@/utils/local.storage';
import { useTranslations } from 'next-intl';

const SideBar: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const t = useTranslations('profile');

  const menuItems = [
    {
      href: '/profile',
      label: t('main.header'),
      icon: '/icons/calendar.svg',
    },
    {
      href: '/profile/integrate',
      label: t('integrate.header'),
      icon: '/icons/settings.svg',
    },
    {
      href: '/profile/settings',
      label: t('settings.header'),
      icon: '/icons/settingst.svg',
    },
    {
      href: '/profile/payouts',
      label: t('payouts.header'),
      icon: '/icons/element.svg',
    },
    /*     {
      href: '/profile/terms-of-use',
      label: 'Terms of use',
      icon: '/icons/document.svg',
    }, */
  ];

  const [savedUser, setSavedUser] = useState({
    username: 'No saved name',
    is_admin: false,
  });

  useEffect(() => {
    const currSavedUser = getLocalStoreItem('user')?.user;

    setSavedUser((prev) => currSavedUser ?? prev);
  }, []);

  return (
    <div className={`${styles.sideBar} `}>
      <div className={`${styles.userInfo} px-2`}>
        {/* <p className={styles.name}>{savedUser?.is_admin ? 'Admin' : 'User'}</p> */}
        <p className={styles.name}>{savedUser.username}</p>
      </div>

      <div className={styles.buttonsSideBar}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link href={item.href} key={item.href}>
              <button className={isActive ? styles.active : ''}>
                <Image
                  src={item.icon}
                  width={24}
                  height={24}
                  alt={item.label.toLowerCase()}
                  className={isActive ? 'dark:invert' : ''}
                />
                <p>{item.label}</p>
              </button>
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default SideBar;
