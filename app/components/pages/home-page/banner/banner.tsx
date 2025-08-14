'use client';
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import TrustPilot from '@/app/(main)/components/footer/trust-pilot/trust-pilot';
import { useTranslations } from 'next-intl';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from,
  to,
  duration = 1.6,
  delay = 0.3,
  suffix = '',
}) => {
  const count = useMotionValue(from);
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const timer = setTimeout(() => {
      const controls = animate(count, to, {
        duration,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        },
      });

      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [count, to, duration, delay]);

  return (
    <motion.span>
      {displayValue.toLocaleString()}
      {suffix}
    </motion.span>
  );
};

interface BannerProps {
  coinCountDelay?: number;
}

const Banner: React.FC<BannerProps> = ({ coinCountDelay = 0 }) => {
  const t = useTranslations('banner');
  return (
    <>
      <p
        className={
          'text-center text-[#1B1B1B] text-[25px] md:text-[35px] lg:text-[50px] font-[600] leading-[120%]'
        }>
        {t('prefix')}{' '}
        <span className={'text-[#3460FD]'}>
          <AnimatedCounter from={0} to={2000} delay={coinCountDelay} suffix="+" />
        </span>{' '}
        {t('middle')} <br /> {t('suffix')}
      </p>

      <div className={'flex justify-center mt-[10px]'}>
        <TrustPilot color={'#1B1B1B'} variant={'primary'} />
      </div>
    </>
  );
};

export default Banner;
