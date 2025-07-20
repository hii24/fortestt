'use client';
import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

const Page = () => {
  const contacts = [
    {
      id: 1,
      title: 'Write to us in Telegram',
      desc: 'go to our chat in Telegram. We are always in touch and ready to help',
      href: 'https://t.me/Lizex_support',
      icon: '/_contact-us/telegram.svg',
    },
    {
      id: 2,
      title: 'Write now in our online chat',
      desc: 'go to our chat in Telegram. We are always in touch and ready to help',
      href: '#',
      icon: '/_contact-us/chat.svg',
    },
    {
      id: 3,
      title: 'Contact us by email',
      desc: 'Send us an email and we will get back to you as soon as possible',
      href: 'mailto:support@lizex.com',
      icon: '/_contact-us/mail.svg',
    },
  ];

  return (
    <div className={'flex flex-col'}>
      <div className={'max-w-[1440px] w-full flex justify-center items-center flex-col px-4 md:px-8'}>
        <div className={styles.howContactUs}>
          <h1 className={styles.howContactUsMainText}>How to contact us</h1>
          <h3 className={styles.howContactUsDescriptionText}>
            Write an email, call or fill out the form to find out how <br /> Lizex can solve your messaging
            problem.
          </h3>
        </div>
        <div className={'flex flex-col gap-[10px] mt-[100px] w-full'}>
          <h1 className={styles.anyQuesMainText}>Any questions?</h1>
          <h3
            className={clsx(
              'text-[#7D7878] text-[14px] md:text-[16px] font-[300] leading-normal max-w-[716px]'
            )}>
            We are always available to help you with your cryptocurrency exchange and answer all your
            questions! Whether you&#39;re looking for help with technical issues or want more information
            about our services, our team is on call 24/7.
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
