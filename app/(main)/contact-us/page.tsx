import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';

const Page = async () => {
  const t = await getTranslations('contactPage');
  const contacts = [
    {
      id: 1,
      title: t('cards.telegram.title'),
      desc: t('cards.telegram.desc'),
      href: 'https://t.me/Lizex_support',
      icon: '/_contact-us/telegram.svg',
    },
    {
      id: 2,
      title: t('cards.chat.title'),
      desc: t('cards.chat.desc'),
      href: '#',
      icon: '/_contact-us/chat.svg',
    },
    {
      id: 3,
      title: t('cards.email.title'),
      desc: t('cards.email.desc'),
      href: 'mailto:support@lizex.com',
      icon: '/_contact-us/mail.svg',
    },
  ];

  return (
    <div className={'flex flex-col'}>
      <div className={'max-w-[1440px] w-full flex justify-center items-center flex-col px-4 md:px-8'}>
        <div className={styles.howContactUs}>
          <h1 className={styles.howContactUsMainText}>{t('hero.title')}</h1>
          <h3 className={styles.howContactUsDescriptionText}>{t('hero.desc')}</h3>
        </div>
        <div className={'flex flex-col gap-[10px] mt-[100px] w-full'}>
          <h1 className={styles.anyQuesMainText}>{t('any.title')}</h1>
          <h3
            className={clsx(
              'text-[#7D7878] text-[14px] md:text-[16px] font-[300] leading-normal max-w-[716px]'
            )}>
            {t('any.desc')}
          </h3>
        </div>
        <div className={'grid grid-cols-3 gap-5 mt-[50px]'}>
          {contacts.map((contact) => {
            return (
              <Link
                key={contact.id}
                href={contact.href}
                target="_blank"
                className={clsx(
                  'flex gap-6 max-w-[444px] w-full',
                  'bg-[#FFFAFA] rounded-[15px] p-4 md:p-5',
                  'hover:shadow-[0px_0px_50px_0px_rgba(52,96,253,0.50)] transition-shadow'
                )}>
                <div className={'flex flex-col gap-[10px]'}>
                  <h3
                    className={
                      'text-[#000] text-[18px] md:text-[19px] lg:text-[20px] font-[400] leading-normal'
                    }>
                    {contact.title}
                  </h3>
                  <h4
                    className={
                      'text-[#000] text-[14px] md:text-[15px] lg:text-[16px] font-[300] leading-normal'
                    }>
                    {contact.desc}
                  </h4>
                </div>
                <Image src={contact.icon} width={50} height={50} alt="contact icon" className={'mb-auto'} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
