import { useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

import { BorderAnimate } from '@/app/components/animation/border';
import LinksBlock from '@/app/(main)/components/footer/components/LinksBlock';
import CopyRightBlock from '@/app/(main)/components/footer/components/copy-right-block';
import clsx from 'clsx';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

// Memoized animated section component to prevent re-renders
// eslint-disable-next-line react/display-name
export const AnimatedSection = memo(({ children, delay = 0, position }: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Define animation initial values based on position prop
  const getInitialAnimation = () => {
    switch (position) {
      case 'left':
        return { opacity: 0, x: -100, filter: 'blur(20px)' };
      case 'right':
        return { opacity: 0, x: 100, filter: 'blur(20px)' };
      case 'top':
        return { opacity: 0, y: -50, filter: 'blur(20px)' };
      case 'bottom':
        return { opacity: 0, y: 50, filter: 'blur(20px)' };
      default:
        return { opacity: 0, y: 50, filter: 'blur(20px)' };
    }
  };

  // Define animation values when in view
  const getInViewAnimation = () => {
    return { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' };
  };

  return (
    <div ref={ref}>
      <motion.div
        initial={getInitialAnimation()}
        animate={isInView ? getInViewAnimation() : getInitialAnimation()}
        transition={{ duration: 0.35, delay }}>
        {children}
      </motion.div>
    </div>
  );
});

export const inputTranslation = {
  en: {
    name: 'English',
    select: 'Select language',
    search: 'Search',
  },
};

const Footer = () => {
  // const { t } = useTranslation();
  const upperRef = useRef(null);
  // const middleRef = useRef(null);
  const lowerRef = useRef(null);
  // const isInViewUpper = useInView(upperRef, { once: true });
  // const isInViewMiddle = useInView(middleRef, { once: true });
  const isInViewLower = useInView(lowerRef, { once: true });

  return (
    <footer
      ref={upperRef}
      className={clsx(
        'w-full relative text-white bg-[#FFFAFA] overflow-hidden',
        'mt-3 md:mt-24 px-4 md:px-8 py-[20px]'
      )}>
      {/* Main Navigation Section */}

      <div className="max-w-[1372px] w-full mx-auto flex flex-col gap-[30px] md:gap-0">
        {/* Social Icons - Mobile and Desktop */}
        {/*<AnimatedSection delay={0}>*/}
        {/*  <LogoBlock />*/}

        {/*</AnimatedSection>*/}

        {/* Mobile Accordion View */}
        {/*<LinksBlockMobile />*/}

        {/* Desktop Grid View - Restructured to match design */}
        <LinksBlock />

        <div ref={lowerRef} className={'hidden md:block relative w-full py-[20px]'}>
          <BorderAnimate useInView={isInViewLower} color={'#F0F1F5'} duration={0.6} />
        </div>
        {/* Copyright Bar */}
        {/*<CopyRightBlock />*/}
        <CopyRightBlock />
      </div>
    </footer>
  );
};

export default Footer;
