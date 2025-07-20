import styles from './styles.module.css';
import PartnersCarousel from '@/app/(main)/components/partners/PartnersCarousel';
import Accordion from '@/app/(main)/components/accordion/Accordion';
import Image from 'next/image';
import Link from 'next/link';
import ReviewsSlider from '@/app/components/pages/home-page/reviews/ReviewsSlider';
import clsx from 'clsx';

const Page = () => {
  return (
    <div className={'max-w-[1372px] w-full mx-auto'}>
      <div className={clsx('px-4 md:px-6 lg:px-0', styles.aboutUsTop)}>
        <div className="circle circle-1 !z-[-1]"></div>
        <div className="circle circle-2 !z-[-1]"></div>
        <div className="circle circle-3 !z-[-1]"></div>
        <div className={`${styles.aboutUsTopLeft} sm:z-10`}>
          <h1>About Lizex</h1>
          <p>
            We’ve built a platform designed entirely around user convenience: nothing unnecessary — just
            speed, security, and a straightforward process. No extra steps, no complicated forms, and no
            drawn-out procedures — just you, your crypto, and a clear, transparent exchange flow.
          </p>
          <p>
            Thanks to that, we’ve created a product that not only works — it helps people every day. We
            believe in the freedom of digital assets and in the idea that everyone should be able to manage
            them on their own terms - easily, anonymously, and securely.
          </p>
          <p className={styles.grey}>
            Lizex is a service where exchanging cryptocurrency is as simple as a single click.
          </p>
          <Link href={'/transfer'}>
            <button className={styles.exchange}>Exchange now</button>
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
            <span className={styles.blockTitle}>24/7 support </span>
          </div>
          <div className={styles.aboutUsTopRight_others}>
            <div className={styles.aboutUsTopRight_noLimits}>
              <span className={styles.blockTitle}>No Limits</span>
            </div>
            <div className={styles.aboutUsTopRight_transparency}>
              <span className={styles.blockTitle}>Transparency</span>
            </div>
            <div className={styles.aboutUsTopRight_speed}>
              <span className={styles.blockTitle}>Speed</span>
            </div>
            <div className={styles.aboutUsTopRight_noregistration}>
              <span className={styles.blockTitle}>No Registration</span>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx('px-4 md:px-6 lg:px-8', styles.pageTitle)}>Why Lizex</div>
      <div className={clsx('px-4 md:px-6 lg:px-0', styles.why)}>
        <div className={`${styles.why_block} ${styles.why_nolimits}`}>
          <div className={styles.whyTitle}>24/7 Support</div>
          <p>
            Our support team works around the clock, every day of the week. No matter the time, you can count
            on prompt assistance — whether it’s a question about your current exchange, clarification of
            conditions, or tech support.
          </p>
        </div>
        <div className={styles.why_flex}>
          <div className={`${styles.why_block}`}>
            <div className={styles.why_bg1}></div>
            <div className={styles.whyTitle}>No Limits</div>
            <p>
              We don’t impose upper limits on exchange amounts. This is especially important for both
              individuals and large-scale investors or traders who need flexibility in their operations.
            </p>
          </div>
          <div className={styles.why_block}>
            <div className={styles.whyTitle}>Transparency</div>
            <p>
              The exchange process is simple and straightforward. You can always track the status of your
              transactions in real time.
            </p>
          </div>
          <div className={styles.why_block}>
            <div className={styles.whyTitle}>Speed</div>
            <p>Transactions are processed quickly and reliably, usually taking between 5 and 30 minutes.</p>
          </div>
          <div className={`${styles.why_block} ${styles.why_bg2}`}>
            <div className={styles.whyTitle}>No Registration</div>
            <p>
              Exchange cryptocurrency without creating an account. Your privacy is fully protected, ensuring
              complete anonymity.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.partners}>
        <PartnersCarousel />
      </div>
      <div className={clsx('px-4 md:px-6 lg:px-8', styles.pageTitle)}>Reviews</div>
      <div id="reviews" className={clsx('', styles.reviewsBlock)}>
        <ReviewsSlider />
      </div>

      <div className={`${styles.pageTitle} ${styles.pageTitleFAQ} px-4 md:px-6 lg:px-8`}>FAQ</div>
      <div id="faq" className={`${styles.faq} px-4 md:px-6 lg:px-8`}>
        <Accordion />
      </div>
    </div>
  );
};

export default Page;
