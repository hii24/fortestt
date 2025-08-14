import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import IntlProvider from '@/app/providers/IntlProvider';
import ClientIntlProvider from '@/app/providers/ClientIntlProvider';
import {cookies} from 'next/headers';
import {defaultLocale, isSupportedLocale} from '@/i18n/config';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Lizex — Crypto Exchange Platform',
    template: '%s | Lizex',
  },
  description:
    'Exchange Bitcoin, Ethereum, and 2000+ other tokens quickly and securely on Lizex.io. User-friendly interface, low fees, and instant swaps with no registration required. Start swapping today!',
  keywords: [
    'Lizex',
    'crypto exchange',
    'Bitcoin',
    'Ethereum',
    'cryptocurrency',
    'swap tokens',
    'BTC',
    'ETH',
    'crypto trading',
  ],
  authors: [{ name: 'Lizex Team' }],
  creator: 'Lizex',
  publisher: 'Lizex',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lizex.io',
    title: 'Lizex — Crypto Exchange Platform',
    description:
      'Exchange Bitcoin, Ethereum, and 2000+ other tokens quickly and securely on Lizex.io. User-friendly interface, low fees, and instant swaps with no registration required.',
    siteName: 'Lizex',
    images: [
      {
        url: 'https://lizex.io/favicon.ico', // Додайте це зображення
        width: 109,
        height: 128,
        alt: 'Lizex Crypto Exchange',
      },
    ],
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Lizex — Crypto Exchange Platform',
  //   description: 'Exchange Bitcoin, Ethereum, and 2000+ other tokens quickly and securely on Lizex.io.',
  //   images: ['https://lizex.io/og-image.jpg'],
  //   creator: '@lizex_io', // Якщо є Twitter
  // },
  // verification: {
  //   google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Додайте після верифікації в Search Console
  // },
  alternates: {
    canonical: 'https://lizex.io',
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value || cookieStore.get('locale')?.value;
  const activeLang = isSupportedLocale(localeCookie) ? localeCookie : defaultLocale;
  return (
    <html lang={activeLang} suppressHydrationWarning className={inter.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://lizex.io" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Lizex',
              alternateName: 'Lizex.io',
              url: 'https://lizex.io',
              logo: 'https://lizex.io/favicon.ico',
              description: 'Crypto exchange platform for Bitcoin, Ethereum, and 2000+ other tokens',
              // "sameAs": [
              //   "https://twitter.com/lizex_io",
              //   "https://t.me/lizex_official"
              // ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: 'English',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <IntlProvider>
          <ClientIntlProvider>{children}</ClientIntlProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
