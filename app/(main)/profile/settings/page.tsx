'use client';
import { FormEvent, useEffect, useState } from 'react';
import styles from './styles.module.css';
import Breadcrumbs from '@/app/(main)/components/breadcrumbs/breadcrumbs';
import MobileSideBar from '@/app/(main)/components/mobileSideBar/mobileSideBar';
// import Image from 'next/image';
import ButtonLogout from '@/app/components/buttonLogout/buttonLogout';
import { UserService } from '@/services/user/user.service';
import { Modal } from 'antd';
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations('profile.settings');
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean | null>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword === confirmPassword) {
      try {
        const res = await UserService.changePassword({
          old_password: currentPassword,
          new_password: newPassword,
        });
        if (res) {
          console.log(res);
          setIsLoading(null);
          (e.target as HTMLFormElement).reset();
          setIsVisible(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
      }
    } else {
      console.error('New passwords do not match');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className={styles.subContainer}>
        {isMobile && <Breadcrumbs />}
        {!isMobile && (
          <div className="headText">
            <p className="headerP">{t('header')}</p>
          </div>
        )}
        {isMobile && (
          <>
            <div className="headText">
              <p className="headerP">{t('header')}</p>
            </div>
          </>
        )}
        {isMobile && <MobileSideBar></MobileSideBar>}
        {!isMobile && <Breadcrumbs />}
        <div className={styles.password}>
          <div className="inputDescription">
            <h1 className={styles.textMainPassword}>{t('password.title')}</h1>
            <h2 className={styles.textDescriptionPassword}>{t('password.desc')}</h2>
          </div>
          <input type="password" value="****************" className={styles.passwordInput} readOnly={true} />
          <button onClick={() => setIsVisible(true)} className={styles.btnPassword}>
            {t('password.edit')}
          </button>
        </div>
        {isMobile && <ButtonLogout />}
      </div>
      {isVisible && (
        <Modal
          open={isVisible}
          onCancel={() => setIsVisible(false)}
          footer={null}
          width={340}
          centered
          maskClosable={true}>
          <form
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={styles.changePasswordForm}
            onSubmit={onSubmit}>
            <h2 className={styles.changePasswordFormTitle}>{t('password.changeTitle')}</h2>

            <div>
              <label htmlFor="current-password">{t('password.current.label')}</label>
              <input
                id="current-password"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={styles.inputField}
                placeholder={t('password.current.placeholder')}
              />
            </div>

            <div>
              <label htmlFor="new-password">{t('password.new.label')}</label>
              <input
                id="new-password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.inputField}
                placeholder={t('password.new.placeholder')}
              />
            </div>

            <div>
              <label htmlFor="confirm-password">{t('password.confirm.label')}</label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.inputField}
                placeholder={t('password.confirm.placeholder')}
              />
            </div>

            <button type="submit" disabled={!!isLoading} className={styles.submitBtn}>
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : null}
              {isLoading ? t('password.submit.loading') : t('password.submit.label')}
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Page;
