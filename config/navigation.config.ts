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
      { labelKey: 'nav.affiliateProgram', href: '/' },
      { labelKey: 'nav.apiDocumentation', href: '/' },
    ],
  },
  { labelKey: 'nav.faq', href: '/faq' },
];
