import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DefaultAppear from '@/app/components/animation/default-appear';
import { useTranslation } from 'react-i18next';
import { getTranslatedFooterContent } from '@/app/(main)/components/footer/lang';
import { inputTranslation } from '@/app/(main)/components/footer/footer';
import TrustPilot from '@/app/(main)/components/footer/trust-pilot/trust-pilot';

const LogoBlock = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { i18n } = useTranslation();

  // Get translations based on current language
  const t = getTranslatedFooterContent(i18n.language as keyof typeof inputTranslation);

  return (
    <div ref={ref} className="flex flex-col items-start gap-5 relative">
      <div className={'flex items-center w-full'}>
        <DefaultAppear
          inView={isInView}
          delay={0.2}
          position={'left'}
          classNameChild={'!w-fit'}
          classNameParent={'!w-fit'}>
          <Link href="/" className={'max-w-[75px] md:max-w-[93px]'}>
            <Image src="/icons/logo.svg" fill alt="logo" className={'object-contain !relative'} />
          </Link>
        </DefaultAppear>

        <DefaultAppear
          inView={isInView}
          delay={0.2}
          position={'right'}
          classNameChild={'flex justify-end !w-full'}
          classNameParent={'!w-full block md:hidden'}>
          <TrustPilot color={'#3460FD'} variant={'secondary'} />
        </DefaultAppear>
      </div>

      <DefaultAppear inView={isInView} delay={0.1}>
        <p
          className={
            'max-w-[350px] md:max-w-[387px] w-full text-[#1B1B1B] text-[14px] font-[500] leading-normal'
          }>
          {t.items.description}
        </p>
      </DefaultAppear>
    </div>
  );
};

export default LogoBlock;
