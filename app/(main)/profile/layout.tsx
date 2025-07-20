'use client';
import { usePathname, useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from './layout.module.css';
import SideBar from '../components/sideBar/sideBar';
import ButtonLogout from '../../components/buttonLogout/buttonLogout';

const ProfileLayout: FC<PropsWithChildren> = ({ children }) => {
  const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      return !!Cookies.get('access');
    }
    return false;
  };

  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pathname?.includes('/auth') && !isAuthenticated()) {
      router.push(`/auth?redirect=${encodeURIComponent(pathname)}`);
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading && !pathname?.includes('/auth')) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {!isMobile && (
        <SideBar>
          <div className="flex flex-col h-full justify-end">
            <ButtonLogout style={{ padding: '2px 0', margin: '0 2px' }} />
          </div>
        </SideBar>
      )}
      {children}
    </div>
  );
};
export default ProfileLayout;
