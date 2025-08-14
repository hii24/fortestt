import { motion, useInView, Variants } from 'framer-motion';
import { AnimatedSection } from '../footer';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
// import UnderlineAnim from "@/components/ui/animation/underline-anim.tsx";
import clsx from 'clsx';
import UnderlineAnim from '@/app/components/animation/underline-anim';
// import { getFooterSections } from '@/app/(main)/components/footer/constants';
import SocialBlock from '@/app/(main)/components/footer/components/social-block';
import LogoBlock from '@/app/(main)/components/footer/components/logo-block';

// Type for section links
type SectionLink = {
  text: string;
  href: string;
  icon?: string; // Optional for social media icons
};

// Type for each section
type Section = {
  title: string;
  links: SectionLink[];
};

// Footer section component to reuse for each column
const FooterSection = ({
  section,
  delay,
  animDelay,
  index,
}: {
  section: Section;
  delay: number;
  animDelay: number;
  index: number;
}) => {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: custom,
      },
    }),
  };

  // Link animation variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: 'easeOut',
      },
    },
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={clsx('w-fit', index === 0 ? 'col-span-3' : 'col-span-1')}>
      <AnimatedSection delay={delay}>
        <div className={clsx('flex flex-col gap-[15px]')}>
          <h3 className="text-[#1B1B1B] font-[500] text-[14px] leading-normal">{section.title}</h3>
          <motion.div
            className={clsx(
              'flex-col gap-[10px] md:gap-[15px]',
              index === 0 ? 'grid grid-cols-3 md:grid-cols-2' : 'flex'
            )}
            variants={containerVariants}
            initial="hidden"
            custom={animDelay}
            animate={isInView ? 'visible' : 'hidden'}>
            {section.links.map((link, linkIndex) => {
              return (
                <UnderlineAnim
                  key={linkIndex}
                  color={'#3460FD'}
                  textColor={'#7D7878'}
                  href={link.href}
                  // target="_blank"
                  className={'w-fit'}>
                  <motion.p
                    className={clsx('w-fit text-[14px] font-[400]', 'leading-[130%]')}
                    variants={itemVariants}>
                    {link.text}
                  </motion.p>
                </UnderlineAnim>
              );
            })}
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
};

const LinksBlock = () => {
  const t = useTranslations('footer');

  const sections = {
    popularPairsSection: {
      title: t('sections.popularPairs'),
      links: [
        { text: t('links.btcToUsdt'), href: '/' },
        { text: t('links.ethToUsdt'), href: '/' },
        { text: t('links.suiToUsdt'), href: '/' },
        { text: t('links.btcToXrp'), href: '/' },
        { text: t('links.usdtToLtc'), href: '/' },
        { text: t('links.dogeToTrx'), href: '/' },
        { text: t('links.xmrToUsdt'), href: '/' },
        { text: t('links.dogeToUsdt'), href: '/' },
      ],
    },
    forPartnersSection: {
      title: t('sections.forPartners'),
      links: [
        { text: t('links.apiForPartners'), href: '/' },
        { text: t('links.affiliateProgram'), href: '/' },
      ],
    },
    companySection: {
      title: t('sections.company'),
      links: [
        { text: t('links.faq'), href: '/faq' },
        { text: t('links.howItWorks'), href: '#how-it-works' },
        { text: t('links.aboutUs'), href: '/about-us' },
      ],
    },
    legalSection: {
      title: t('sections.legal'),
      links: [
        { text: t('links.termsOfService'), href: '/temp-of-use' },
        { text: t('links.privacyPolicy'), href: '/privacy-policy' },
        { text: t('links.amlKyc'), href: '/policy' },
      ],
    },
  };

  // Define sections to display with their delays
  const displaySections = [
    { section: sections.popularPairsSection, delay: 0.2, animDelay: 0.25 },
    { section: sections.forPartnersSection, delay: 0.25, animDelay: 0.3 },
    { section: sections.companySection, delay: 0.3, animDelay: 0.35 },
    { section: sections.legalSection, delay: 0.35, animDelay: 0.4 },
  ];
  return (
    <div className="flex flex-col xl:flex-row justify-between gap-[30px] xl:gap-4">
      <div className={'flex flex-col gap-[30px] xl:gap-[50px] max-w-full md:max-w-[387px] w-full'}>
        <LogoBlock />
        <SocialBlock delay={0.65} />
      </div>

      <div className={'grid grid-cols-3 md:flex gap-[30px] xl:gap-[50px] max-w-fit md:max-w-[640px] w-full'}>
        {displaySections.map((sectionData, index) => (
          <FooterSection
            key={index}
            index={index}
            section={sectionData.section}
            delay={sectionData.delay}
            animDelay={sectionData.animDelay}
          />
        ))}
      </div>
    </div>
  );
};

export default LinksBlock;
