'use client';

import React from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {usePathname} from 'next/navigation';
import Cookies from 'js-cookie';
import {defaultLocale, isSupportedLocale, Locale} from '@/i18n/config';

type ClientIntlProviderProps = {
  children: React.ReactNode;
};

export default function ClientIntlProvider({children}: ClientIntlProviderProps) {
  const pathname = usePathname();
  const [activeLocale, setActiveLocale] = React.useState<Locale>(defaultLocale);
  const [messages, setMessages] = React.useState<Record<string, unknown> | null>(null);

  // Derive locale from pathname (/en/...)
  React.useEffect(() => {
    const match = pathname?.match(/^\/(en|ru|uk)(?:\/|$)/);
    const nextLocaleFromPath = match?.[1] ?? null;
    const nextLocale: Locale = isSupportedLocale(nextLocaleFromPath)
      ? (nextLocaleFromPath as Locale)
      : (Cookies.get('NEXT_LOCALE') as Locale) || defaultLocale;

    let isMounted = true;
    import(`@/i18n/locales/${nextLocale}/common.json`).then((mod) => {
      if (!isMounted) return;
      setMessages(mod.default as Record<string, unknown>);
      setActiveLocale(nextLocale);
      Cookies.set('NEXT_LOCALE', nextLocale, {path: '/'});
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('lang', nextLocale);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  if (!messages) return null;

  return (
    <NextIntlClientProvider locale={activeLocale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}


