import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, isSupportedLocale, Locale} from './config';

export default getRequestConfig(async () => {
  // Determine locale: prefer header from middleware, then cookie, then default
  const {cookies, headers} = await import('next/headers');
  const cookieStore = await cookies();
  const hdrs = await headers();
  const headerLocale = hdrs.get('x-active-locale');
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value || cookieStore.get('locale')?.value;
  const candidateLocale = headerLocale || cookieLocale;
  const activeLocale: Locale = isSupportedLocale(candidateLocale) ? (candidateLocale as Locale) : defaultLocale;

  const messages = (await import(`./locales/${activeLocale}/common.json`)).default;
  return {locale: activeLocale, messages};
});


