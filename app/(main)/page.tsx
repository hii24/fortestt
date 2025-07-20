import styles from '@/app/(main)/styles.module.css';
import Image from 'next/image';
import React from 'react';
import Accordion from '@/app/(main)/components/accordion/Accordion';
import { getIsMobile } from '@/app/(main)/components/DeviceDetector';
import StatisticsSlider from '@/app/(main)/components/StatisticsSlider/StatisticsSlider';
import RevealAnimation from '@/app/(main)/components/animations/RevealAnimation';
// import PartnersCarousel from '@/app/(main)/components/partners/PartnersCarousel';
import { SwapTrackerID } from './components/SwapTrackerID/SwapTrackerID';
import ReferralCodeReader from './components/exchange/ReferralCodeReader';
import { CurrencyView } from './components/exchange/CurrencyView/CurrencyView';
import { PopularExchangeBtn } from './components/exchange/PopularExchange';
import ExchangeForm from '../components/pages/home-page/exchange-form/exchange-form';
import Banner from '@/app/components/pages/home-page/banner/banner';
import ReviewsSlider from '@/app/components/pages/home-page/reviews/ReviewsSlider';
import PartnersCarousel from '@/app/(main)/components/partners/PartnersCarousel';

const popularExchangesData = [
  {
    id: 1,
    token1_id: 65,
    token2_id: 305,
    token1: 'BTC',
    token1_title: 'Bitcoin',
    network1: 'BTC',
    token2: 'USDT',
    token2_title: 'TetherUS',
    network2: 'TRC20',
  },
  {
    id: 2,
    token1_id: 117,
    token2_id: 305,
    token1: 'ETH',
    token1_title: 'Ethereum',
    network1: 'ETH',
    token2: 'USDT',
    token2_title: 'TetherUS',
    network2: 'TRC20',
  },
  {
    id: 3,
    token1_id: 272,
    token2_id: 305,
    token1: 'SUI',
    token1_title: 'Sui',
    network1: 'SUI',
    token2: 'USDT',
    token2_title: 'TetherUS',
    network2: 'TRC20',
  },
  {
    id: 4,
    token1_id: 65,
    token2_id: 331,
    token1: 'BTC',
    token1_title: 'Bitcoin',
    network1: 'BTC',
    token2: 'XRP',
    token2_title: 'Xrp',
    network2: 'XRP',
  },
  {
    id: 5,
    token1_id: 117,
    token2_id: 305,
    token1: 'USDT',
    token1_title: 'TetherUS',
    network1: 'EOS',
    token2: 'LTC',
    token2_title: 'Litecoin',
    network2: 'LTC',
  },
  {
    id: 6,
    token1_id: 117,
    token2_id: 305,
    token1: 'DOGE',
    token1_title: 'Dogecoin',
    network1: 'DOGE',
    token2: 'TRX',
    token2_title: 'Tron',
    network2: 'TRC20',
  },
  {
    id: 7,
    token1_id: 117,
    token2_id: 305,
    token1: 'XMR',
    token1_title: 'Monero',
    network1: 'XMR',
    token2: 'USDT',
    token2_title: 'TetherUS',
    network2: 'TRC20',
  },
  {
    id: 8,
    token1_id: 117,
    token2_id: 305,
    token1: 'XMR',
    token1_title: 'Monero',
    network1: 'XMR',
    token2: 'USDT',
    token2_title: 'TetherUS',
    network2: 'TRC20',
  },
  {
    id: 9,
    token1_id: 117,
    token2_id: 305,
    token1: 'DOGE',
    token1_title: 'Dogecoin',
    network1: 'DOGE',
    token2: 'USDT',
    token2_title: 'TetherUS',
    network2: 'TRC20',
  },
];

export default async function Home() {
  const isMobile = await getIsMobile();

  return (
    <div className={`${styles.container} z-1`}>
      {/* Додаємо компонент для ініціалізації анімацій */}
      <RevealAnimation />
      <ReferralCodeReader />

      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>

      <div className={styles.subContainer}>
        <SwapTrackerID />
        <div
          className={`reveal fade-in z-3 flex flex-col justify-center items-center pt-[50px] md:pt-[70px] lg:pt-[100px]`}>
          <Banner />
          {/* )} */}
          <div className={`slide-right delay-300 flex justify-center w-full px-6`}>
            {/* exchange form */}
            <ExchangeForm />
          </div>
        </div>

        <div className={`reveal fade-up delay-200 ${styles.ourStrengths} `}>
          {/* <h1 className={styles.ourStrengthsMainText}>Our strengths</h1> */}
          {/* {!isMobile && ( */}
          <div className={styles.ourStrengthsBlocks + ` ${styles.borderEffect} ${styles.desktopFlex1536}`}>
            <div className={`reveal slide-left delay-300 ${styles.support}`}>
              <div className={styles.supportText}>
                <h2 className={styles.supportMainText}>24/7 support</h2>
                <h3 className={styles.supportDescriptionText}>
                  Our support team is available 24/7 to resolve any issues and provide you with the assistance
                  you need.
                </h3>
              </div>
              {/* <Image src={'/images/landing/support.png'} alt={'puzzle'} width={300} height={300}></Image> */}
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-row gap-5">
                <div className={`reveal fade-up delay-400 ${styles.noLimits}`}>
                  <div className={styles.noLimitsText}>
                    <h2 className={styles.noLimitsMainText}>No Limits</h2>
                    <h3 className={styles.noLimitsDescriptionText}>
                      Exchange any amount of cryptocurrency without upper limits, offering flexibility for
                      both small and large transactions.
                    </h3>
                  </div>
                </div>
                <div className={`reveal fade-up delay-500 ${styles.transparency}`}>
                  <div className={styles.transparencyText}>
                    <h2 className={styles.transparencyMainText}>Transparency</h2>
                    <h3 className={styles.transparencyDescriptionText}>
                      The exchange process is simple and straightforward. You can always track the status of
                      your transactions in real time.
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <div className={`reveal fade-up delay-600 ${styles.speed}`}>
                  <div className={styles.speedText}>
                    <h2 className={styles.speedMainText}>Speed</h2>
                    <h3 className={styles.speedDescriptionText}>
                      Transactions are processed quickly and reliably, usually taking between 5 and 30
                      minutes.
                    </h3>
                  </div>
                </div>
                <div className={`reveal fade-up delay-700 ${styles.noRegestration}`}>
                  <div className={styles.noRegestrationText}>
                    <h2 className={styles.noRegestrationMainText}>No Registration</h2>
                    <h3 className={styles.noRegestrationDescriptionText}>
                      Exchange cryptocurrency without creating an account. <br />
                      Your privacy is fully protected, ensuring complete anonymity.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* )} */}
          {/* {isMobile && ( */}
          <div className={styles.ourStrengthsBlocks + `  ${styles.mobileFlex1536}`}>
            <div className={styles.support}>
              <div className={styles.supportText}>
                <h1 className={styles.supportMainText}>24/7 support</h1>
                <h3 className={styles.supportDescriptionText}>
                  Our support team is available 24/7to resolve any issues and provide you with the assistance
                  you need.
                </h3>
              </div>
            </div>
            <div className={styles.noLimits}>
              <div className={styles.noLimitsText}>
                <h1 className={styles.noLimitsMainText}>No Limits</h1>
                <h3 className={styles.noLimitsDescriptionText}>
                  Exchange any amount of cryptocurrency without upper limits, offering flexibility for both
                  small and large transactions.
                </h3>
              </div>
            </div>
            <div className={styles.transparency}>
              <div className={styles.transparencyText}>
                <h1 className={styles.transparencyMainText}>Transparency</h1>
                <h3 className={styles.transparencyDescriptionText}>
                  The exchange process is simple and straightforward. You can always track the status of your
                  transactions in real time.
                </h3>
              </div>
            </div>
            <div className={styles.speed}>
              <div className={styles.speedText}>
                <h1 className={styles.speedMainText}>Speed</h1>
                <h3 className={styles.speedDescriptionText}>
                  Transactions are processed quickly and reliably, usually taking between 5 and 30 minutes.
                </h3>
              </div>
            </div>
            <div className={styles.noRegestration}>
              <div className={styles.noRegestrationText}>
                <h1 className={styles.noRegestrationMainText}>No Registration</h1>
                <h3 className={styles.noRegestrationDescriptionText}>
                  Exchange cryptocurrency without creating an account. Your privacy is fully protected,
                  ensuring complete anonymity.
                </h3>
              </div>
            </div>
            {/* <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-5">

                                </div>
                                <div className="flex flex-col gap-5">

                                </div>
                            </div> */}
          </div>
          {/* )} */}
          <div className={`reveal fade-up delay-300 ${styles.toDayStatisctic}`}>
            <p className={styles.toDayStatisticMainText}>Today&#39;s statistics</p>
            {!isMobile && (
              <div className={styles.toDayStatisticsBlocks}>
                <div className={styles.block}>
                  <h1 className={styles.toDayStatisticsBlocksText}>3643+</h1>
                  <h5 className={styles.toDayStatisticsBlocksDescriptionText}>Visits today</h5>
                </div>
                <div className={styles.block}>
                  <h1 className={styles.toDayStatisticsBlocksText}>7min</h1>
                  <h5 className={styles.toDayStatisticsBlocksDescriptionText}>Average processing time</h5>
                </div>
                <div className={styles.block}>
                  <h1 className={styles.toDayStatisticsBlocksText}>864+</h1>
                  <h5 className={styles.toDayStatisticsBlocksDescriptionText}>Transactions carried out</h5>
                </div>
                <div className={styles.block}>
                  <h1 className={styles.toDayStatisticsBlocksText}>615</h1>
                  <h5 className={styles.toDayStatisticsBlocksDescriptionText}>Active Users</h5>
                </div>
              </div>
            )}
          </div>
          {isMobile && <StatisticsSlider />}
        </div>

        <div className={'w-full flex flex-col mt-0 md:mt-[80px] lg:mt-[100px]'}>
          <div id={'how-it-works'} className={'reveal fade-up flex flex-col px-4 md:px-6 lg:px-8'}>
            <p className={styles.howItWorksMainText}>How It Works</p>

            <div className={`reveal fade-up delay-200 ${styles.howItWorksContainers}`}>
              <div className={styles.howItWorksContainersBlocks}>
                <div className={styles.howItWorksContainersBlocksBlock2}>
                  <Image src={'/images/blocks/block1.png'} alt={'block1'} width={272} height={293}></Image>
                  <div className={styles.howItWorksContainersBlocksBlockContentBodyListContainerFooter}>
                    <h1>1. Selection of coins.</h1>
                    <h2>Specify which coin you are sending and which one you are receiving.</h2>
                  </div>
                </div>
                <div className={styles.howItWorksContainersBlocksBlock2}>
                  <Image src={'/images/blocks/block2.png'} alt={'block1'} width={328} height={271}></Image>
                  <div className={styles.howItWorksContainersBlocksBlockContentBodyListContainerFooter}>
                    <h1>2. Making a deposit</h1>
                    <h2>
                      Send the amount to the address on <br />
                      time, including the MEMO if needed.
                    </h2>
                  </div>
                </div>
                <div className={styles.howItWorksContainersBlocksBlock2}>
                  <Image src={'/images/blocks/block3.png'} alt={'block1'} width={288} height={309}></Image>
                  <div className={styles.howItWorksContainersBlocksBlockContentBodyListContainerFooter}>
                    <h1>3. Exchange in progress</h1>
                    <h2>The transaction is processing. Wait for completion.</h2>
                  </div>
                </div>
                <div className={styles.howItWorksContainersBlocksBlock2}>
                  <Image
                    src={'/images/blocks/block4.png'}
                    alt={'block1'}
                    width={328}
                    height={275}
                    className={styles.howItWorksContainersBlocksBlock2Image1}></Image>
                  <Image
                    src={'/images/Group.svg'}
                    alt={'gr'}
                    width={328}
                    height={275}
                    className={styles.howItWorksContainersBlocksBlock2Image2}></Image>
                  <div
                    className={`${styles.howItWorksContainersBlocksBlockContentBodyListContainerFooter} ${styles.howItWorksContainersBlocksBlockContentBodyListContainerFooterFour}`}>
                    <h1 className="z-2">4. The exchange is complete</h1>
                    <h2>
                      Coins have been successfully <br />
                      credited to your address.
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="popular-exchanges"
            className={`reveal fade-up px-4 md:px-6 lg:px-8 ${styles.popularExcanges}`}>
            <p className={styles.popularExcangesMainText}>Popular Exchanges</p>
            <div className={styles.popularExcangesContainer}>
              {popularExchangesData.map((exchange) => (
                <div key={exchange.id} className={`${styles.popularExcangesBlock}`}>
                  <div className={`flex-wrap sm:gap-2 ${styles.popularExcangesCoinsContainer}`}>
                    <CurrencyView
                      symbolFirst
                      marginLeft=""
                      currency={{
                        name: isMobile ? `${exchange.token1_title?.slice(0, 5)}..` : exchange.token1_title,
                        symbol: exchange.token1,
                        network: exchange.network1,
                      }}
                    />
                    <Image
                      className={`${styles.popularExcangesCoinsContainerSwap}`}
                      src="/icons/swap.svg"
                      alt={'coin'}
                      height={25}
                      width={25}
                    />
                    <CurrencyView
                      symbolFirst
                      marginLeft=""
                      currency={{
                        name: isMobile ? `${exchange.token2_title?.slice(0, 9)}..` : exchange.token2_title,
                        symbol: exchange.token2,
                        network: exchange.network2,
                      }}
                    />
                  </div>

                  {/*             {!isMobile && (
                      <div className={styles.popularExcangesCoinsContainerTextContainer}>
                        <p className={styles.popularExcangesCoinsContainerTextDefault}>{exchange.pair}</p>
                        <b className={styles.popularExcangesCoinsContainerRedText}>{exchange.change}</b>
                      </div>
                    )}
                    {isMobile && (
                      <>
                        <div className={styles.popularExcangesCoinsContainerTextContainer}>
                          <p className={styles.popularExcangesCoinsContainerTextDefault}>{exchange.pair}</p>
                        </div>
                        <div className={styles.popularExcangesCoinsContainerTextContainer}>
                          <b className={styles.popularExcangesCoinsContainerRedText}>{exchange.change}</b>
                        </div>
                      </>
                    )} */}

                  <PopularExchangeBtn
                    className={`max-sm:!px-2 max-sm:!w-fit ${styles.popularExcangesCoinsContainerButton}`}
                    fromCurrency={{
                      token: exchange.token1,
                      title: exchange.token1_title,
                      network: { id: exchange.token1_id, title: exchange.network1 },
                      is_memo: false,
                    }}
                    toCurrency={{
                      token: exchange.token2,
                      title: exchange.token2_title,
                      network: { id: exchange.token2_id, title: exchange.network2 },
                      is_memo: false,
                    }}>
                    <p className="max-sm:!text-xs">{'Exchange'}</p>
                  </PopularExchangeBtn>
                </div>
              ))}
            </div>
          </div>
          <div id="reviews" className="reveal fade-up delay-200">
            <ReviewsSlider />
          </div>

          <div
            id="partners"
            className={`reveal fade-up delay-300 !mt-[100px] px-4 md:px-6 lg:px-8 ${styles.partners}`}>
            <span>List of our partners</span>
            <PartnersCarousel />
            {/*<div className={styles.partnersBlocks}>*/}
            {/*  <div className={styles.partnersBlock}>*/}
            {/*    <Image src={'/icons/exodus.svg'} alt={''} width={200} height={200}></Image>*/}
            {/*  </div>*/}
            {/*  <div className={styles.partnersBlock}>*/}
            {/*    <Image src={'/icons/edge.svg'} alt={''} width={200} height={200}></Image>*/}
            {/*  </div>*/}
            {/*  <div className={styles.partnersBlock}>*/}
            {/*    <Image src={'/icons/adex.svg'} alt={''} width={200} height={200}></Image>*/}
            {/*  </div>*/}
            {/*  <div className={styles.partnersBlock}>*/}
            {/*    <Image src={'/icons/monero.svg'} alt={''} width={200} height={200}></Image>*/}
            {/*  </div>*/}
            {/*  <div className={styles.partnersBlock}>*/}
            {/*    <Image src={'/icons/ledger.svg'} alt={''} width={200} height={200}></Image>*/}
            {/*  </div>*/}
            {/*  <div className={styles.partnersBlock}>*/}
            {/*    <Image src={'/icons/swapzone.svg'} alt={''} width={200} height={200}></Image>*/}
            {/*  </div>*/}
            {/*  <div className={styles.partnersBlock}>*/}
            {/*    <Image src={'/icons/coin-market.svg'} alt={''} width={200} height={200}></Image>*/}
            {/*  </div>*/}
            {/*  <div className={styles.partnersBlock}>*/}
            {/*    <Image src={'/icons/coin-market.svg'} alt={''} width={200} height={200}></Image>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>

          <div
            id="faq"
            className={`reveal fade-up delay-400 mb-[50px] px-4 md:px-6 lg:px-8 ${styles.accordion}`}>
            <p className={styles.FaqMainText}>Faq</p>
            <Accordion />
          </div>
        </div>
      </div>
    </div>
  );
}
