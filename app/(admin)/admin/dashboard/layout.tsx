'use client';
import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/app/(admin)/components/admin-sidebar/AdminSidebar';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import styles from './styles.module.css';

const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return !!Cookies.get('access');
  }
  return false;
};

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
