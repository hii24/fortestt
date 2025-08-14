export type FooterLanguage = keyof typeof footerTranslations;

export const getTranslatedFooterContent = (language: FooterLanguage) => {
  return footerTranslations[language] || footerTranslations.en;
};

export const footerTranslations = {
  en: {
    sections: {
      popularPairs: 'Popular pairs',
      forPartners: 'For partners',
      company: 'Company',
      legal: 'Legal',
    },
    items: {
      // POPULAR PAIRS
      'BTC to USDT': 'BTC to USDT',
      'ETH to USDT': 'ETH to USDT',
      'SUI to USDT': 'SUI to USDT',
      'BTC to XRP': 'BTC to XRP',
      'USDT to LTC': 'USDT to LTC',
      'DOGE to TRX': 'DOGE to TRX',
      'XMR to USDT': 'XMR to USDT',
      'DOGE to USDT': 'DOGE to USDT',

      // FOR PARTNERS
      'API for partners': 'API for partners',
      'Affiliate program': 'Affiliate program',

      // COMPANY
      'F.A.Q.': 'F.A.Q.',
      'How it works': 'How it works',
      'About us': 'About us',

      // LEGAL
      'Terms of Service': 'Terms of Service',
      'Privacy Policy': 'Privacy Policy',
      'AML/KYC': 'AML/KYC',

      // MAIN DESCRIPTION
      description: 'Exchange cryptocurrency quickly and conveniently - Lizex pages in bookmarks in a second!',

      // COMMUNITY
      community: 'Community',

      // COPYRIGHT
      rights: '© 2025 Lizex   All Right Reserved',

      // TRUSTPILOT
    },
  },
};
