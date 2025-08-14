import {cookies} from 'next/headers';
import {NextIntlClientProvider} from 'next-intl';
import {defaultLocale, isSupportedLocale, Locale} from '@/i18n/config';

type IntlProviderProps = {
  children: React.ReactNode;
};

async function loadMessages(locale: Locale) {
  const messages = await import(`@/i18n/locales/${locale}/common.json`).then((m) => m.default);
  return messages;
}

export default async function IntlProvider({children}: IntlProviderProps) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value || cookieStore.get('locale')?.value;
  const activeLocale: Locale = isSupportedLocale(cookieLocale) ? (cookieLocale as Locale) : defaultLocale;

  const messages = await loadMessages(activeLocale);

  return (
    <NextIntlClientProvider locale={activeLocale} messages={messages} timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}


