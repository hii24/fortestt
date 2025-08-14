import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, isSupportedLocale, Locale} from './config';

export default getRequestConfig(async () => {
  // Determine locale primarily from cookie (middleware sets NEXT_LOCALE), fallback to default
  const {cookies} = await import('next/headers');
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value || cookieStore.get('locale')?.value;
  const activeLocale: Locale = isSupportedLocale(cookieLocale) ? (cookieLocale as Locale) : defaultLocale;

  const messages = (await import(`./locales/${activeLocale}/common.json`)).default;
  return {locale: activeLocale, messages};
});


