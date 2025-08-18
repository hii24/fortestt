export type NavLink = {
  labelKey: string;
  href: string;
  subLinks?: NavLink[];
};

export const NAV_LINKS: NavLink[] = [
  { labelKey: 'nav.howItWorks', href: '/how-it-works' },
  { labelKey: 'nav.aboutUs', href: '/about-us' },
  { labelKey: 'nav.contactUs', href: '/contact-us' },
  {
    labelKey: 'nav.forBusiness',
    href: '#partners',
    subLinks: [
      { labelKey: 'nav.affiliateProgram', href: '/auth?register' },
      { labelKey: 'nav.apiDocumentation', href: `https://lizexswap.postman.co/workspace/Lizexswap's-Workspace~660b406d-225e-4fe9-857c-c591ba8bcbce/collection/46909352-94eb9e1a-1543-456a-a264-016eefb90d8f?action=share&source=copy-link&creator=46909352` },
    ],
  },
  { labelKey: 'nav.faq', href: '/faq' },
];
