'use client';
import React, { useState } from 'react';
import SideBar from '@/app/(main)/components/sideBar/sideBar';
import styles from './styles.module.css';
import Breadcrumbs from '@/app/(main)/components/breadcrumbs/breadcrumbs';
import MobileSideBar from '@/app/(main)/components/mobileSideBar/mobileSideBar';
import Image from 'next/image';

const Page = () => {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className={styles.container}>
      {!isMobile && <SideBar />}
      <div className={styles.subContainer}>
        {isMobile && <Breadcrumbs />}
        {isMobile && (
          <div className="headText">
            <p className="headerP">Terms of use</p>
            <Image src={'/icons/calendar.svg'} alt={'calendar search'} width={24} height={24}></Image>
          </div>
        )}
        {!isMobile && (
          <div className="headText">
            <p className="headerP">Terms of use</p>
          </div>
        )}
        {isMobile && <MobileSideBar />}
        {!isMobile && <Breadcrumbs />}
        <div className={styles.document}>
          <div className={styles.text}>
            <h1 className={styles.lDFP}>Legal Documentation for Partners</h1>
            <h3 className={styles.lDFPDescription}>
              Welcome to our Legal Documentation section. Here, you can access all the essential legal
              documents <br />
              required for partnership agreements. These documents ensure compliance, clarify the terms of
              <br />
              cooperation, and protect the interests of both parties.
            </h3>
          </div>

          <h1 className={styles.lDFPTwo}>Legal documentation for partners</h1>
          <h3>
            <div className={styles.subText}>
              In this section, you can find all the legal agreements that are part of <br />
              our partnership process. These documents are designed to make our <br />
              collaboration transparent and legally sound.
            </div>
          </h3>
          <div className={styles.legalList}>
            <ol className={styles.numberedList}>
              <li>
                <p className={styles.listTitle}>Partner Agreement</p>
                <p className={styles.listBody}>
                  This document outlines the core partnership terms, including duties, responsibilities, and
                  benefits for both sides.
                </p>
              </li>
              <li>
                <p className={styles.listTitle}>Data Protection Policy</p>
                <p className={styles.listBody}>
                  A detailed policy describing how your data is collected, stored, and used in compliance with
                  privacy regulations.
                </p>
              </li>
              <li>
                <p className={styles.listTitle}>General Terms of Service</p>
                <p className={styles.listBody}>
                  The rules and conditions under which you can access and use our platform, as well as the
                  services provided.
                </p>
              </li>
              <li>
                <p className={styles.listTitle}>Commission Structure and Payouts</p>
                <p className={styles.listBody}>
                  This document explains the commission rates, payout schedule, and other payment-related
                  details.
                </p>
              </li>
              <li>
                <p className={styles.listTitle}>Non-Disclosure Agreement (NDA)</p>
                <p className={styles.listBody}>
                  Ensures that sensitive information shared between us remains confidential throughout the
                  partnership.
                </p>
              </li>
            </ol>
          </div>
          <div className={styles.rewiew}>
            Please review and sign these documents to finalize your partnership. Your <br />
            compliance with these terms is essential for a successful collaboration.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
