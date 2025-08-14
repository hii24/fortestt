import { useTranslations } from 'next-intl';
// import SocialBlock from "@/components/layout/footer/components/social-block.tsx";
// import UnderlineAnim from "@/components/ui/animation/underline-anim.tsx";
// import { motion } from "framer-motion";
import DefaultAppear from '@/app/components/animation/default-appear';
import TrustPilot from '@/app/(main)/components/footer/trust-pilot/trust-pilot';

const CopyRightBlock = () => {
  const t = useTranslations('footer');

  return (
    <div className="flex flex-row items-center justify-center md:justify-between gap-4 w-full py-0 md:py-[10px]">
      <DefaultAppear delay={0.5} position={'left'} classNameParent={'!w-fit'}>
        <p
          className={
            'text-center md:text-left text-[#7D7878] text-[12px]  md:text-[14px] font-[400] leading-[133%] md:leading-[142%]'
          }>
          {t('rights')}
        </p>
      </DefaultAppear>

      <DefaultAppear
        delay={0.5}
        position={'right'}
        classNameChild={'flex flex-wrap gap-3'}
        classNameParent={'!w-fit hidden md:block'}>
        <TrustPilot color={'#3460FD'} variant={'secondary'} />
      </DefaultAppear>
    </div>
  );
};

export default CopyRightBlock;
