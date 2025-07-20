'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import LangSwitcher from '@/app/(main)/components/langSwitcher/langSwitcher';
import { useEffect, useState } from 'react';
import MobileMenu from '@/app/(main)/components/mobileMenu/MobileMenu';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { getLocalStoreItem } from '@/utils/local.storage';
import { NAV_LINKS } from '@/config/navigation.config';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import ava from '@/public/_home/_reviews/ava.svg';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [savedUser, setSavedUser] = useState({
    username: 'No saved name',
    is_admin: false,
  });

  useEffect(() => {
    const currSavedUser = getLocalStoreItem('user')?.user;

    setSavedUser((prev) => currSavedUser ?? prev);
    setIsAuthenticated(() => !!Cookies.get('access'));
  }, []);

  // Header animation variants
  const headerVariants: Variants = {
    visible: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 18,
        delay: 0.1,
      },
    },
    hidden: {
      y: -100,
    },
  };

  return (
    <motion.div
      animate={'visible'}
      variants={headerVariants}
      initial="hidden"
      className={`${styles.headerWrapper} !sticky top-0`}>
      <div className={`flex justify-between items-center max-w-[1440px] w-full py-[10px] px-6 md:px-8`}>
        <ul className={styles.logotype}>
          <li className="flex justify-center items-center gap-2.5">
            <Link href="/" className={'max-w-[75px] md:max-w-[93px]'}>
              <Image src="/icons/logo.svg" fill alt="logo" className={'object-contain !relative'} />
            </Link>
          </li>
        </ul>

        <ul className={`${styles.navLinks} px-4  items-center max-sm:hidden`}>
          {NAV_LINKS.map(({ label, href, subLinks }) =>
            subLinks ? (
              <li key={label} className={styles.subMenu}>
                <span className={'text-[#1B1B1B] hover:text-[#3460fd] transition-colors !font-[400]'}>
                  {label}
                </span>
                {/*                 <Image
                  src="/icons/arrow-down.svg"
                  width={18}
                  height={18}
                  alt="dropdown arrow"
                  className={styles.dropdownArrow + ' ml-1'}
                /> */}
                <svg
                  className={styles.dropdownArrow + ' text-[#3460FD] ml-1'}
                  xmlns="http://www.w3.org/2000/svg"
                  width={19}
                  height={18}
                  viewBox="0 0 19 20"
                  fill="none">
                  <path
                    d="M15.4529 6.71246L10.5629 11.6025C9.98538 12.18 9.04038 12.18 8.46288 11.6025L3.57288 6.71246"
                    stroke="currentColor"
                    strokeWidth="1.125"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <ul style={{ boxShadow: '0px 0px 4px 0px #E1DCDC' }} className={clsx('', styles.subMenuList)}>
                  {subLinks.map(({ label: subLabel, href: subHref }) => (
                    <li key={subLabel}>
                      <Link
                        href={subHref}
                        className={'text-[#1B1B1B] hover:text-[#3460fd] transition-colors !font-[400]'}>
                        {subLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={label}>
                <Link
                  href={href}
                  className={clsx(
                    'text-[#1B1B1B] hover:text-[#3460fd] transition-colors !font-[400]',
                    pathname === href ? 'text-[#3460fd]' : ''
                  )}>
                  {label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className={styles.rightSection}>
          <LangSwitcher />

          {!isAuthenticated ? (
            <div className={`${styles.authButtons} gap-2 lg:gap-5`}>
              <Link href="/auth" className={styles.login}>
                Log in
              </Link>
              <Link href="/auth?register" className={styles.signup}>
                Sign up
              </Link>
            </div>
          ) : (
            <Link href={!savedUser?.is_admin ? '/profile' : '/admin'}>
              <li className={styles.userInfo}>
                <Image src={ava} width={40} height={40} alt="avatar" />
                <div className={styles.info}>
                  <p className={`${styles.name} sm:max-lg:w-8 overflow-hidden text-ellipsis`}>
                    {savedUser.username}
                  </p>
                </div>
              </li>
            </Link>
          )}

          <div className={styles.mobileMenuIcon} onClick={toggleMenu}>
            <Image src="/icons/textalign-left.svg" width={24} height={24} alt="menu" />
          </div>
        </div>

        <MobileMenu
          isOpen={isMenuOpen}
          onClose={toggleMenu}
          isAdmin={savedUser.is_admin}
          isAuthenticated={!isAuthenticated}
          // name={savedUser.is_admin ? 'Admin' : 'User'}
          username={savedUser.username}
        />
      </div>
    </motion.div>
  );
}
