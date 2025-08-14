'use client';

import styles from './styles.module.css';
import { FC } from 'react';
import '@ant-design/v5-patch-for-react-19';
import { CustomAniSwitcher } from '../CustomAniSwitcher/CustomAniSwitcher';
import { useTranslations } from 'next-intl';

interface SwitcherWIconProps {
  checked: boolean;
  setChecked?: (ckecked: boolean) => void;
}

export const SwitcherWIcon: FC<SwitcherWIconProps> = ({ checked = true, setChecked }) => {
  const t = useTranslations('exchange.rate');
  return (
    <div className="flex items-center gap-2">
      <CustomAniSwitcher isChecked={checked} setIsChecked={setChecked} />
      <p className={styles.floatingRateText}>
        <span className={!checked ? 'text-[#3460fd]' : ''}>{t('floating')}</span> {t('or')}{' '}
        <span className={checked ? 'text-[#3460fd]' : ''}>{t('fixed')}</span>
      </p>
    </div>
  );
};
