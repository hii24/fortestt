// Define the structure of the footer sections
import { getTranslatedFooterContent } from '@/app/(main)/components/footer/lang';
import { inputTranslation } from '@/app/(main)/components/footer/footer';

export const getFooterSections = (language: keyof typeof inputTranslation) => {
  const translations = getTranslatedFooterContent(language);

  // Define sections with their translations
  const popularPairsSection = {
    title: translations.sections.popularPairs || 'Popular pairs',
    links: [
      {
        text: translations.items['BTC to USDT'] || 'BTC to USDT',
        href: '/',
      },
      {
        text: translations.items['ETH to USDT'] || 'ETH to USDT',
        href: '/',
      },
      {
        text: translations.items['SUI to USDT'] || 'SUI to USDT',
        href: '/',
      },
      {
        text: translations.items['BTC to XRP'] || 'BTC to XRP',
        href: '/',
      },
      {
        text: translations.items['USDT to LTC'] || 'USDT to LTC',
        href: '/',
      },
      {
        text: translations.items['DOGE to TRX'] || 'DOGE to TRX',
        href: '/',
      },
      {
        text: translations.items['XMR to USDT'] || 'XMR to USDT',
        href: '/',
      },
      {
        text: translations.items['DOGE to USDT'] || 'DOGE to USDT',
        href: '/',
      },
    ],
  };

  const forPartnersSection = {
    title: translations.sections.forPartners || 'For partners',
    links: [
      {
        text: translations.items['API for partners'] || 'API for partners',
        href: '/',
      },
      {
        text: translations.items['Affiliate program'] || 'Affiliate program',
        href: '/',
      },
    ],
  };

  const companySection = {
    title: translations.sections.company || 'Company',
    links: [
      {
        text: translations.items['F.A.Q.'] || 'F.A.Q.',
        href: '/faq',
      },
      {
        text: translations.items['How it works'] || 'How it works',
        href: '#how-it-works',
      },
      {
        text: translations.items['About us'] || 'About us',
        href: '/about-us',
      },
    ],
  };

  const legalSection = {
    title: translations.sections.legal || 'Legal',
    links: [
      {
        text: translations.items['Terms of Service'] || 'Terms of Service',
        href: '/temp-of-use',
      },
      {
        text: translations.items['Privacy Policy'] || 'Privacy Policy',
        href: '/privacy-policy',
      },
      {
        text: translations.items['AML/KYC'] || 'AML/KYC',
        href: '/policy',
      },
    ],
  };

  return {
    popularPairsSection,
    forPartnersSection,
    companySection,
    legalSection,
    description: translations.items.description,
    community: translations.items.community,
    rights: translations.items.rights,
  };
};
