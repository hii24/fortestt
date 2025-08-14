import styles from './styles.module.css';
import Accordion from '@/app/(main)/components/accordion/Accordion';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

const Page = async () => {
  const t = await getTranslations('howPage');
  return (
    <div className={styles.container}>
      <div className={`${styles.howItWorkTop} xl:gap-20`}>
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className={`${styles.howItWorkTopLeft} sm:z-10`}>
          <h1 className={`${styles.heroTitle}`}>{t('hero.title')}</h1>
          <p className={`${styles.heroDescription} xl:max-w-[444px]`}>{t('hero.desc')}</p>
          <Link href={'/transfer'}>
            <button className={styles.exchange}>{t('hero.exchangeButton')}</button>
          </Link>
          <Image
            src={'/images/coins/coin2.png'}
            alt={'coin'}
            width={100}
            height={100}
            className={`${styles.coinsImage} ${styles.coinsImage1}`}></Image>
        </div>
        <div className={`${styles.howItWorkTopRight} z-[1] sm:z-10`}>
          {/*           <Image
            src={'/images/coins/coin3.png'}
            alt={'coin'}
            width={100}
            height={100}
            className={`${styles.coinsImage} ${styles.coinsImage3}`}></Image> */}
          <div className={`${styles.heroRightBox} xl:mr-auto xl:max-w-[444px]`}>
            <h5 className={styles.heroRightBoxTitle}>
              <span>~</span>{t('floating.title')}
            </h5>
            <p className={styles.heroRightBoxDescription}>{t('floating.desc')}</p>
          </div>
          <div className={`${styles.heroRightBox} xl:max-w-[444px]`}>
            <h5 className={`${styles.heroRightBoxTitle} flex gap-1`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M4.37988 17.7099V11.8377C4.37988 10.911 5.13105 10.1599 6.05766 10.1599H16.1243C17.0509 10.1599 17.8021 10.911 17.8021 11.8377V17.7099C17.8021 18.6365 17.0509 19.3877 16.1243 19.3877H6.05766C5.13105 19.3877 4.37988 18.6365 4.37988 17.7099Z"
                  stroke="#3460FD"
                  strokeWidth="1.55833"
                  strokeLinecap="round"
                />
                <path
                  d="M6 10V7.60982C6 4.84837 8.23863 2.60978 11.0001 2.60982V2.60982C13.7615 2.60987 16 4.84843 16 7.60982V10"
                  stroke="#3460FD"
                  strokeWidth="1.55833"
                  strokeLinecap="round"
                />
                <path d="M11 13.75L11 15.5833" stroke="#3460FD" strokeWidth="1.55833" strokeLinecap="round" />
              </svg>
              {t('floating.title')}
            </h5>
            <p className={styles.heroRightBoxDescription}>{t('floating.desc')}</p>
          </div>
        </div>
      </div>
      <div className={`${styles.pageTitle} z-[1]`}>{t('stages.title')}</div>

      <div className={styles.howItWorksContainersBlocks}>
        <div className={styles.howItWorksContainersBlock}>
          <div className={styles.howItWorksContainersBlockText}>
            <h2 className={styles.howItWorksContainersBlockTextTitle}>
              <span>01</span>
              <br /> {t('steps.s1.title')}
            </h2>
            <p>{t('steps.s1.desc')}</p>
          </div>
          <div className={styles.howItWorksContainersBlocksBlock}>
            <Image
              className="w-full"
              src={'/images/blocks/block1.png'}
              alt={'block1'}
              width={424}
              height={293}></Image>
          </div>
        </div>
        {/* 2 */}
        <div className={styles.howItWorksContainersBlock}>
          <div className={styles.howItWorksContainersBlockText}>
            <h2 className={styles.howItWorksContainersBlockTextTitle}>
              <span>02</span>
              <br /> {t('steps.s2.title')}
            </h2>
            <p>{t('steps.s2.desc')}</p>
          </div>
          <div className={styles.howItWorksContainersBlocksBlock}>
            <Image
              className="py-4"
              src={'/images/blocks/block2.png'}
              alt={'block1'}
              width={424}
              height={271}></Image>
          </div>
        </div>
        {/* 3 */}
        <div className={styles.howItWorksContainersBlock}>
          <div className={styles.howItWorksContainersBlockText}>
            <h2 className={styles.howItWorksContainersBlockTextTitle}>
              <span>03</span>
              <br /> {t('steps.s3.title')}
            </h2>
            <p>{t('steps.s3.desc')}</p>
          </div>
          <div className={styles.howItWorksContainersBlocksBlock}>
            <Image
              className="w-full p-4"
              src={'/images/blocks/block3.png'}
              alt={'block1'}
              width={404}
              height={309}></Image>
          </div>
        </div>
        {/* 4 */}
        <div className={styles.howItWorksContainersBlock}>
          <div className={styles.howItWorksContainersBlockText}>
            <h2 className={styles.howItWorksContainersBlockTextTitle}>
              <span>04</span>
              <br /> {t('steps.s4.title')}
            </h2>
            <p>{t('steps.s4.desc')}</p>
          </div>
          <div className={styles.howItWorksContainersBlocksBlock}>
            <Image
              className="w-full p-3"
              src={'/images/blocks/block4.png'}
              alt={'block1'}
              width={424}
              height={293}></Image>
          </div>
        </div>
      </div>

      <div className={styles.pageTitle + ' ' + styles.pageTitleFAQ}>{t('faq.title')}</div>
      <div id="faq" className={`${styles.faq}`}>
        <Accordion />
      </div>
    </div>
  );
};

export default Page;

{
  /* <div className={styles.howItWorksContainersBlocksBlock}>
                                    <div className={styles.howItWorksContainersBlocksBlockContent}>
                                        <div className={styles.howItWorksContainersBlocksBlockContentTop}>
                                            <div
                                                className={styles.howItWorksContainersBlocksBlockContentTopActiveBtnLeft}>
                                                <button
                                                    className={styles.howItWorksContainersBlocksBlockContentTopActiveBtn}>Exchange
                                                </button>
                                                <button>Buy</button>
                                                <button>Sell</button>
                                            </div>
                                            <div
                                                className={styles.howItWorksContainersBlocksBlockContentTopActiveBtnRight}>
                                                <Image src={'/icons/info-circle.svg'} alt={'info'} width={24}
                                                       height={24}></Image>
                                                <Image src={'/icons/lock.svg'} alt={'lock'} width={24}
                                                       height={24}></Image>
                                                <span>Floating rate</span>
                                            </div>
                                        </div>
                                        <div className={styles.howItWorksContainersBlocksBlockContentBody}>
                                            <div className={styles.howItWorksContainersBlocksBlockContentBodyTop}>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyTopSearch}>
                                                    <Image src={'/icons/search.svg'} alt={'search'} width={12}
                                                           height={12}></Image><h1
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyTopSearchText}>Search...</h1>
                                                </div>

                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokens}>
                                                    <h1 className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensMainText}>You
                                                        send</h1>
                                                    <div
                                                        className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensDescriptions}>
                                                        <Image src={'/icons/bitcoin.svg'} alt={'search'} width={24}
                                                               height={24}></Image>
                                                        <div
                                                            className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinText}>
                                                            <h1>BTC</h1>
                                                            <h3>Bitcoin <span>BTC</span></h3>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className={styles.howItWorksContainersBlocksBlockContentBodyList}>
                                                <div
                                                    className={`flex flex-col w-full ${styles.howItWorksContainersBlocksBlockContentBodyListContainer}`}>
                                                    <h1 className={styles.howItWorksContainersBlocksBlockContentBodyListMainText}>Популярные</h1>
                                                    <div
                                                        className={`${styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensDescriptions} ${styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensDescriptionsActive}`}>
                                                        <Image src={'/icons/toncoin.svg'} alt={'search'} width={24}
                                                               height={24}
                                                               className="ml-0.5"></Image>
                                                        <div
                                                            className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinText}>
                                                            <h1 className="dark:invert">TON</h1>
                                                            <h3 className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinTextWhite}>Toncoin <span
                                                                className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinTextTon}>TON</span>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`${styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensDescriptions}`}>
                                                        <Image src={'/icons/solanacoin.svg'} alt={'search'} width={24}
                                                               height={24}></Image>
                                                        <div
                                                            className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinText}>
                                                            <h1>SOL</h1>
                                                            <h3>Solana <span
                                                                className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinTextSol}>SOL</span>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensDescriptions}>
                                                        <Image src={'/icons/сardanocoin.svg'} alt={'search'} width={24}
                                                               height={24}></Image>
                                                        <div
                                                            className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinText}>
                                                            <h1>ADA</h1>
                                                            <h3>Cardano <span
                                                                className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinTextAda}>ADA</span>
                                                            </h3>
                                                        </div>

                                                    </div>
                                                    <p className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinTextOpen}>Все</p>
                                                </div>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyListScroll}>
                                                    <div
                                                        className={styles.howItWorksContainersBlocksBlockContentBodyListScrollActive}></div>
                                                </div>
                                            </div>
                                            <div
                                                className={styles.howItWorksContainersBlocksBlockContentBodyListContainerFooter}>
                                                <h1>1. Selection of coins.</h1>
                                                <h2>Specify which coin you are sending and which one you are
                                                    receiving.</h2>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className={styles.howItWorksContainersBlocksBlock}>
                                    <div className={styles.howItWorksContainersBlocksBlockContent}>
                                        <div className={styles.howItWorksContainersBlocksBlockContentTop}>
                                            <h1 className={styles.howItWorksContainersBlocksBlockContentTopMainText}>Awaiting
                                                your deposit</h1>
                                        </div>
                                        <div className={styles.howItWorksContainersBlocksBlockContentBody}>
                                            <div
                                                className={styles.howItWorksContainersBlocksBlockContentBodySendDeposit}>
                                                <h1>Send deposit</h1>
                                                <Image src={'/icons/bitcoin.svg'} alt={'bitcoin'} width={21} height={21}
                                                       className={styles.mlten}></Image>
                                                <h2><p>≈</p> 0.01247 BTC</h2>
                                                <span>BTC</span>
                                            </div>
                                            <div
                                                className={`${styles.howItWorksContainersBlocksBlockContentBodySendDeposit} ${styles.howItWorksContainersBlocksBlockContentBodyDepositeAdress}`}>
                                                <h1>Deposit address:</h1>
                                                <h2>bc1q3kyn9rl8m...</h2>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodySendDepositImages}>
                                                    <Image src={'/icons/send-sqaure-2.svg'} alt={'send'} width={21}
                                                           height={21}
                                                    ></Image>
                                                    <Image src={'/icons/size.svg'} alt={'size'} width={21} height={21}
                                                    ></Image>
                                                </div>
                                            </div>
                                            <div className={styles.howItWorksContainersBlocksBlockContentBodyQrCode}>
                                                <Image src={'/images/qr-code.png'} alt={'qrCode'} width={100}
                                                       height={100}></Image>
                                            </div>
                                            <div className={styles.howItWorksContainersBlocksBlockContentBodySteps}>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyStepsStep}>
                                                    <Image src={'/icons/more-circle.svg'} alt={'step'} width={20}
                                                           height={20}></Image>
                                                    <h3 className={styles.howItWorksContainersBlocksBlockContentBodyStepsStepActiveText}>Pending
                                                        deposit</h3>
                                                </div>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyStepsStep}>
                                                    <Image src={'/icons/more-circle-black.svg'} alt={'step'} width={20}
                                                           height={20}></Image>
                                                    <h3 className={styles.howItWorksContainersBlocksBlockContentBodyStepsStepText}>Confirming</h3>
                                                </div>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyStepsStep}>
                                                    <Image src={'/icons/more-circle-black.svg'} alt={'step'} width={20}
                                                           height={20}></Image>
                                                    <h3 className={styles.howItWorksContainersBlocksBlockContentBodyStepsStepText}>Exchanging</h3>
                                                </div>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyStepsStep}>
                                                    <Image src={'/icons/more-circle-black.svg'} alt={'step'} width={20}
                                                           height={20}></Image>
                                                    <h3 className={styles.howItWorksContainersBlocksBlockContentBodyStepsStepText}>Sending</h3>
                                                </div>

                                            </div>
                                            <div
                                                className={styles.howItWorksContainersBlocksBlockContentBodyListContainerFooter}>
                                                <h1>2. Making a deposit</h1>
                                                <h2>Send the amount to the address on <br/>time, including the MEMO if
                                                    needed.</h2>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className={styles.howItWorksContainersBlocksBlock}>
                                    <div className={styles.howItWorksContainersBlocksBlockContent}>
                                        <div
                                            className={`${styles.howItWorksContainersBlocksBlockContentTop} ${styles.howItWorksContainersBlocksBlockContentTopThree}`}>
                                            <h1 className={styles.howItWorksContainersBlocksBlockContentTopMainText}>Confirming
                                                the transaction</h1>
                                            <h2>Number of blockchain confirmations: 1</h2>
                                        </div>
                                        <div className={styles.howItWorksContainersBlocksBlockContentBody}>
                                            <div className={styles.howItWorksContainersBlocksBlockContentBodyThree}>
                                                <div className={styles.howItWorksContainersBlocksBlockContentBodyTop}>
                                                    <div
                                                        className={styles.howItWorksContainersBlocksBlockContentBodySendTop}>
                                                        <h1
                                                            className={styles.howItWorksContainersBlocksBlockContentBodyTopSendText}>0.01247</h1>
                                                    </div>

                                                    <div
                                                        className={`${styles.howItWorksContainersBlocksBlockContentBodyTopSendTokens} $`}>

                                                        <div
                                                            className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensDescriptions}>
                                                            <Image src={'/icons/bitcoin.svg'} alt={'search'} width={24}
                                                                   height={24}></Image>
                                                            <div
                                                                className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinText}>
                                                                <h1>BTC</h1>
                                                                <h3>Bitcoin <span>BTC</span></h3>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <p className={styles.howItWorksContainersBlocksBlockContentBodyFloatingRate}>Floating
                                                    rate: 1 BTC = 26,897238 TON</p>
                                                <div className="w-full">
                                                    <div
                                                        className={styles.howItWorksContainersBlocksBlockContentBodySwap}>
                                                        <Image src="/icons/swap.svg" width={25} height={25} alt="swap"/>
                                                    </div>
                                                </div>
                                                <div className={styles.howItWorksContainersBlocksBlockContentBodyTop}>
                                                    <div
                                                        className={styles.howItWorksContainersBlocksBlockContentBodySendTop}>
                                                        <h1
                                                            className={styles.howItWorksContainersBlocksBlockContentBodyTopSendText}>0.01247</h1>
                                                    </div>

                                                    <div
                                                        className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokens}>

                                                        <div
                                                            className={`${styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensDescriptions}`}>
                                                            <Image src={'/icons/toncoin.svg'} alt={'toncoin'} width={24}
                                                                   height={24}></Image>
                                                            <div
                                                                className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinText}>
                                                                <h1>TON</h1>
                                                                <h3>Toncoin <span
                                                                    className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinTextTon}>TON</span>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className={styles.howItWorksContainersBlocksBlockContentBodySteps}>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyStepsStep}>
                                                    <Image src={'/icons/more-circle-green.svg'} alt={'step'} width={20}
                                                           height={20}></Image>
                                                    <h3 className={styles.howItWorksContainersBlocksBlockContentBodyStepsStepCompleteText}>Pending
                                                        deposit</h3>
                                                </div>

                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyStepsStep}>
                                                    <Image src={'/icons/more-circle.svg'} alt={'step'} width={20}
                                                           height={20}></Image>
                                                    <h3 className={styles.howItWorksContainersBlocksBlockContentBodyStepsStepActiveText}>Confirming</h3>
                                                </div>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyStepsStep}>
                                                    <Image src={'/icons/more-circle-black.svg'} alt={'step'} width={20}
                                                           height={20}></Image>
                                                    <h3 className={styles.howItWorksContainersBlocksBlockContentBodyStepsStepText}>Exchanging</h3>
                                                </div>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyStepsStep}>
                                                    <Image src={'/icons/more-circle-black.svg'} alt={'step'} width={20}
                                                           height={20}></Image>
                                                    <h3 className={styles.howItWorksContainersBlocksBlockContentBodyStepsStepText}>Sending</h3>
                                                </div>
                                            </div>

                                            <div
                                                className={styles.howItWorksContainersBlocksBlockContentBodyListContainerFooter}>
                                                <h1>3. Exchange in progress</h1>
                                                <h2>The transaction is processing. Wait for completion.</h2>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className={styles.howItWorksContainersBlocksBlock}>
                                    <div
                                        className={`${styles.howItWorksContainersBlocksBlockContent} ${styles.howItWorksContainersBlocksBlockContentFour}`}>
                                        <div className={styles.howItWorksContainersBlocksBlockContentTop}>
                                            <h1 className={styles.howItWorksContainersBlocksBlockContentTopMainText}>Completed
                                                successfully</h1>
                                        </div>
                                        <div className={styles.howItWorksContainersBlocksBlockContentBody}>
                                            <div
                                                className={styles.howItWorksContainersBlocksBlockContentBodyDemonstration}>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyDemonstrationIndicator}>
                                                    <h1 className={styles.howItWorksContainersBlocksBlockContentBodyDemonstrationIndicatorMainText}>0.01247</h1>
                                                    <div
                                                        className={`${styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensDescriptions}`}>
                                                        <Image src={'/icons/bitcoin.svg'} alt={'bitcoin'} width={24}
                                                               height={24}></Image>
                                                        <div
                                                            className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinText}>
                                                            <h1>BTC</h1>
                                                            <h3>Bitcoin <span
                                                                className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinTextBTC}>BTC</span>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <Image className={styles.arrowRight} src={'/icons/arrow-right.svg'}
                                                           alt={'arrow-right'} width={22}
                                                           height={22}></Image>
                                                    <h1 className={styles.howItWorksContainersBlocksBlockContentBodyDemonstrationIndicatorMainText}>309,5</h1>
                                                    <div
                                                        className={`${styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensDescriptions}`}>
                                                        <Image src={'/icons/toncoin.svg'} alt={'toncoin'} width={24}
                                                               height={24}></Image>
                                                        <div
                                                            className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinText}>
                                                            <h1>TON</h1>
                                                            <h3>Toncoin<span
                                                                className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinTextTon}>TON</span>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div
                                                className={styles.howItWorksContainersBlocksBlockContentBodyTopSendTokensCoinCenterAreaButton}>
                                                <button
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyDemonstrationIndicatorButton}
                                                    type={'button'}><p>Start a new exchange</p></button>
                                            </div>
                                            <div
                                                className={styles.howItWorksContainersBlocksBlockContentBodyDemonstrationFeedback}>
                                                <Image src={'/icons/messages.svg'} alt={'messages'} width={16}
                                                       height={16}></Image>
                                                <h1>Submit your <span>feedback</span></h1>
                                            </div>
                                            <div className={styles.howItWorksContainersBlocksBlockContentBodySteps}>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyStepsStep}>
                                                    <Image src={'/icons/more-circle-green.svg'} alt={'step'} width={20}
                                                           height={20}></Image>
                                                    <h3 className={styles.howItWorksContainersBlocksBlockContentBodyStepsStepCompleteText}>Pending
                                                        deposit</h3>
                                                </div>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyStepsStep}>
                                                    <Image src={'/icons/more-circle-green.svg'} alt={'step'} width={20}
                                                           height={20}></Image>
                                                    <h3 className={styles.howItWorksContainersBlocksBlockContentBodyStepsStepCompleteText}>Confirming</h3>
                                                </div>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyStepsStep}>
                                                    <Image src={'/icons/more-circle-green.svg'} alt={'step'} width={20}
                                                           height={20}></Image>
                                                    <h3 className={styles.howItWorksContainersBlocksBlockContentBodyStepsStepCompleteText}>Exchanging</h3>
                                                </div>
                                                <div
                                                    className={styles.howItWorksContainersBlocksBlockContentBodyStepsStep}>
                                                    <Image src={'/icons/more-circle-green.svg'} alt={'step'} width={20}
                                                           height={20}></Image>
                                                    <h3 className={styles.howItWorksContainersBlocksBlockContentBodyStepsStepCompleteText}>Sending</h3>
                                                </div>

                                            </div>
                                            <div
                                                className={`${styles.howItWorksContainersBlocksBlockContentBodyListContainerFooter} ${styles.howItWorksContainersBlocksBlockContentBodyListContainerFooterFour}`}>
                                                <h1>4. The exchange is complete</h1>
                                                <h2>Coins have been successfully <br/>credited to your address.</h2>
                                            </div>
                                        </div>

                                    </div>
                                </div> */
}
