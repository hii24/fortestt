import styles from './styles.module.css';
import PartnersCarousel from '@/app/(main)/components/partners/PartnersCarousel';
import Accordion from '@/app/(main)/components/accordion/Accordion';
import Image from 'next/image';
import Link from 'next/link';
import ReviewsSlider from '@/app/components/pages/home-page/reviews/ReviewsSlider';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';

const Page = async () => {
  const t = await getTranslations('aboutPage');
  return (
    <div className={'max-w-[1372px] w-full mx-auto'}>
      <div className={clsx('px-4 md:px-6 lg:px-0', styles.aboutUsTop)}>
        <div className="circle circle-1 !z-[-1]"></div>
        <div className="circle circle-2 !z-[-1]"></div>
        <div className="circle circle-3 !z-[-1]"></div>
        <div className={`${styles.aboutUsTopLeft} sm:z-10`}>
          <h1>{t('top.title')}</h1>
          <p>{t('top.p1')}</p>
          <p>{t('top.p2')}</p>
          <p className={styles.grey}>{t('top.p3')}</p>
          <Link href={'/transfer'}>
            <button className={styles.exchange}>{t('top.exchangeButton')}</button>
          </Link>
          <Image
            src={'/images/coins/coin2.png'}
            alt={'coin'}
            width={100}
            height={100}
            className={`${styles.coinsImage} ${styles.coinsImage1}`}></Image>
        </div>
        <div className={`${styles.aboutUsTopRight} z-[1] sm:z-10`}>
          <Image
            src={'/images/coins/coin3.png'}
            alt={'coin'}
            width={100}
            height={100}
            className={`${styles.coinsImage} ${styles.coinsImage3}`}></Image>

          <Image
            src={'/images/coins/coin1.png'}
            alt={'coin'}
            width={100}
            height={100}
            className={`${styles.coinsImage} ${styles.coinsImage2}`}></Image>
          <div className={styles.aboutUsTopRight_support}>
            <span className={styles.blockTitle}>{t('right.support')} </span>
          </div>
          <div className={styles.aboutUsTopRight_others}>
            <div className={styles.aboutUsTopRight_noLimits}>
              <span className={styles.blockTitle}>{t('right.noLimits')}</span>
            </div>
            <div className={styles.aboutUsTopRight_transparency}>
              <span className={styles.blockTitle}>{t('right.transparency')}</span>
            </div>
            <div className={styles.aboutUsTopRight_speed}>
              <span className={styles.blockTitle}>{t('right.speed')}</span>
            </div>
            <div className={styles.aboutUsTopRight_noregistration}>
              <span className={styles.blockTitle}>{t('right.noRegistration')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx('px-4 md:px-6 lg:px-8', styles.pageTitle)}>{t('why.title')}</div>
      <div className={clsx('px-4 md:px-6 lg:px-0', styles.why)}>
        <div className={`${styles.why_block} ${styles.why_nolimits}`}>
          <div className={styles.whyTitle}>{t('why.support.title')}</div>
          <p>{t('why.support.desc')}</p>
        </div>
        <div className={styles.why_flex}>
          <div className={`${styles.why_block}`}>
            <div className={styles.why_bg1}></div>
            <div className={styles.whyTitle}>{t('why.noLimits.title')}</div>
            <p>{t('why.noLimits.desc')}</p>
          </div>
          <div className={styles.why_block}>
            <div className={styles.whyTitle}>{t('why.transparency.title')}</div>
            <p>{t('why.transparency.desc')}</p>
          </div>
          <div className={styles.why_block}>
            <div className={styles.whyTitle}>{t('why.speed.title')}</div>
            <p>{t('why.speed.desc')}</p>
          </div>
          <div className={`${styles.why_block} ${styles.why_bg2}`}>
            <div className={styles.whyTitle}>{t('why.noRegistration.title')}</div>
            <p>{t('why.noRegistration.desc')}</p>
          </div>
        </div>
      </div>
      <div className={styles.partners}>
        <PartnersCarousel />
      </div>
      <div className={clsx('px-4 md:px-6 lg:px-8', styles.pageTitle)}>{t('reviews.title')}</div>
      <div id="reviews" className={clsx('', styles.reviewsBlock)}>
        <ReviewsSlider />
      </div>

      <div className={`${styles.pageTitle} ${styles.pageTitleFAQ} px-4 md:px-6 lg:px-8`}>{t('faq.title')}</div>
      <div id="faq" className={`${styles.faq} px-4 md:px-6 lg:px-8`}>
        <Accordion />
      </div>
    </div>
  );
};

export default Page;
