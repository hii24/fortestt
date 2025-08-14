"use client";
import LanguageSwitcher from '@/i18n/components/LanguageSwitcher';
import {useTranslations, useLocale} from 'next-intl';

export default function TestLocalizationPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div style={{padding: 24}}>
      <LanguageSwitcher />
      <h1 style={{marginTop: 16}}>{t('common.welcome')}</h1>
      <p style={{marginTop: 8}}>{t('test.description')}</p>
      <p style={{marginTop: 8}}>Current locale: {locale}</p>
    </div>
  );
}


