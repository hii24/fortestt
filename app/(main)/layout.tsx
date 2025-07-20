import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import BackgroundSetter from '@/app/(main)/components/BackgroundSetter';
import RouteSetter from './components/RouteSetter';
import '@/app/globals.css';
import { ConfigProvider } from 'antd';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lizex  — Crypto Exchange Platform',
  description:
    'Exchange Bitcoin, Ethereum, and 2000+ other tokens quickly and securely on Lizex.io. User-friendly interface, low fees, and instant swaps with no registration required. Start swapping today!',
};

type RootLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  console.log(locale);

  return (
    <div className={`${roboto.className} flex justify-center items-center z-2 w-full`}>
      <div
        className={`${roboto.className} flex flex-col justify-center items-center w-full min-h-screen`}
        style={{ zIndex: 2 }}>
        <BackgroundSetter />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#3460FD',
              blue: '#3460FD',
              controlInteractiveSize: 24,
            },
            components: {
              Button: {
                colorTextDisabled: '#fff',
                colorBgContainerDisabled: '#1347FE80',
              },
              Input: {
                fontSize: 11,
                fontSizeLG: 12,
                colorBgContainer: '#F0F1F5',
                colorTextPlaceholder: '#7D7878',
                paddingBlockLG: 16,
                colorBorder: 'red',
              },
              Switch: {
                handleBg: '#3460FD',
              },
              /*             Select: {

              }, */
            },
          }}>
          <RouteSetter>{children}</RouteSetter>
        </ConfigProvider>
      </div>
    </div>
  );
}
