import { useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { socialLinks } from '@/app/(main)/components/footer/social-icons';
import DefaultAppear from '@/app/components/animation/default-appear';
import { getTranslatedFooterContent } from '@/app/(main)/components/footer/lang';
import { inputTranslation } from '@/app/(main)/components/footer/footer';

// <CommunitySection delay={1.0} />
// Community Section with icons
const SocialBlock = ({ delay }: { delay: number }) => {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const { i18n } = useTranslation();

  // Get translations based on current language
  const t = getTranslatedFooterContent(i18n.language as keyof typeof inputTranslation);

  // Container animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  // Animation variants for social icons
  const socialVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: delay - 0.1 + i * 0.03,
        duration: 0.3,
        type: 'spring',
        stiffness: 200,
      },
    }),
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-col items-baseline gap-[6px] lg:gap-[10px] w-full">
      <DefaultAppear delay={delay - 0.2} position={'bottom'}>
        <h3 className="text-left text-[#1B1B1B] font-[500] text-[14px] leading-normal">
          {t.items.community}
        </h3>
      </DefaultAppear>
      <motion.div
        className="flex justify-start gap-[16px] md:gap-[10px] max-w-[190px] md:max-w-full w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}>
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            custom={index}
            variants={socialVariants}
            className={'w-fit'}>
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.975 }}
              onMouseEnter={() => setIsHovered(index + 1)}
              onMouseLeave={() => setIsHovered(null)}
              className={'flex justify-center items-center rounded-full'}>
              {<social.icon isHovered={isHovered} index={index + 1} />}
            </motion.div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default SocialBlock;
