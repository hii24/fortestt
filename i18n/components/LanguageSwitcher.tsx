'use client';

import React from 'react';
import {useLocale} from 'next-intl';
import {Link, usePathname, useSearchParams} from '@/i18n/navigation';
import {locales} from '@/i18n/config';

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({className}: LanguageSwitcherProps) {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  // Ensure we strip any existing locale prefix and build URLs with the target locale
  const basePath = (pathname || '/').replace(/^\/(en|ru|uk)(?=\/|$)/, '') || '/';
  const hrefWithQuery = (targetLocale: string) => `/${targetLocale}${basePath}${queryString ? `?${queryString}` : ''}`;

  return (
    <div className={className}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={hrefWithQuery(locale)}
          className={locale === currentLocale ? 'font-semibold underline' : ''}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}


