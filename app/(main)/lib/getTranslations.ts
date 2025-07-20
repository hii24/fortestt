export async function getTranslations(locale: string) {
  const translations = await import(`../../locales/${locale}.json`);
  return translations.default;
}
