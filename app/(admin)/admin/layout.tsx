'use client';
import '@/app/globals.css';
import '@ant-design/v5-patch-for-react-19';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import Cookies from 'js-cookie';
import { ConfigProvider } from 'antd';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return !!Cookies.get('access');
  }
  return false;
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pathname?.includes('/auth') && !isAuthenticated()) {
      router.push('/auth?redirect=admin');
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  if (loading && !pathname?.includes('/auth')) {
    return <div>Loading...</div>;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3460FD',
          blue: '#3460FD',
        },
        components: {
          Input: {
            fontSizeLG: 14,
            colorBgContainer: '#FFFAFA',
            colorText: '#1B1B1B',
            colorPrimary: '#1B1B1B',
            colorTextPlaceholder: '#7D7878',
            paddingBlockLG: 12,
          },
          Select: {
            fontSizeLG: 12,
            colorBgContainer: '#F0F1F5',
            colorText: '#1B1B1B',
            colorTextPlaceholder: '#7D7878',
            fontSize: 14,
            fontSizeSM: 14,
            controlOutline: 'rgba(52, 96, 253, 0.1)',
            colorBorder: 'transparent',
            optionFontSize: 14,
            borderRadius: 10,
            controlHeight: 40,
            controlHeightLG: 40,
          },
          DatePicker: {
            borderRadius: 10,
            colorBorder: 'transparent',
            colorBgContainer: '#FFFAFA',
            colorTextPlaceholder: '#1B1B1B',
          },
          Button: {
            dangerColor: '#FD3437',
          },
        },
      }}>
      <div className={`${inter.className}`}>{children}</div>
    </ConfigProvider>
  );
}
