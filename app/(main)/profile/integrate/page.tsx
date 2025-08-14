'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import Breadcrumbs from '@/app/(main)/components/breadcrumbs/breadcrumbs';
import MobileSideBar from '@/app/(main)/components/mobileSideBar/mobileSideBar';
import ButtonLogout from '@/app/components/buttonLogout/buttonLogout';
import { IntergrateService } from '@/services/intergrate/intergrate.service';
import { CopiedInput } from '@/app/components/CopiedInput/CopiedInput';
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations('profile.integrate');
  const tCommon = useTranslations('profile.common');
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [refLink, setRefLink] = useState('');

  useEffect(() => {
    IntergrateService.getRefferalLink().then((link) => {
      setRefLink(link);
    });
    IntergrateService.getApiToken().then((token) => {
      setApiKey(token);
    });
  }, []);

  const toggleApiKeyVisibility = () => {
    setApiKeyVisible((prev) => !prev);
  };

  return (
    <>
      <div className={styles.subContainer}>
        {isMobile && <Breadcrumbs></Breadcrumbs>}
        {isMobile && (
          <div className="headText">
            <p className="headerP">{t('header')}</p>
          </div>
        )}
        {isMobile && <MobileSideBar></MobileSideBar>}
        {!isMobile && (
          <>
            <input type="search" className={styles.search} placeholder={tCommon('search')} />
            <Breadcrumbs />
          </>
        )}
        <div className={styles.twoInputs}>
          <div className={styles.inputGroup}>
            <p className={styles.label}>{t('apiKey.label')}:</p>
            <div className={styles.inputContainer}>
              <CopiedInput
                readOnly
                type={apiKeyVisible ? 'text' : 'password'}
                value={apiKey}
                className={`w-full  hover:bg-[#fffafa] ${styles.input}`}
                copyTooltipAlt={t('apiKey.tooltip')}
                copyTooltipTitle={t('apiKey.tooltip')}
                suffix={
                  <button type="button" onClick={toggleApiKeyVisibility} className={styles.iconButton}>
                    <Image src="/icons/eye.svg" alt="eye-icon" width={24} height={24} />
                  </button>
                }
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <p className={styles.label}>{t('referral.label')}:</p>
            <div className={styles.inputContainer}>
              <CopiedInput
                readOnly
                value={refLink}
                className={`w-full hover:bg-[#fffafa] ${styles.input}`}
                copyTooltipAlt={t('referral.tooltip')}
                copyTooltipTitle={t('referral.tooltip')}
              />
            </div>
          </div>
          {isMobile && <ButtonLogout />}
        </div>
      </div>
    </>
  );
};

export default Page;
