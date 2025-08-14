'use client';
import { useRouter } from 'next/navigation';
import { SwitcherWIcon } from '@/app/components/SwitcherWIcon/SwitcherWIcon';
import { useEffect, useRef, useState } from 'react';
import { CoinsListParams, CurrencyPropsFinal } from '@/types/coin.interface';
import { Button } from 'antd';
import styles from '@/app/(main)/styles.module.css';
import { motion, useInView, Variants } from 'framer-motion';
import clsx from 'clsx';
import SwapSelector from '@/app/(main)/components/exchange/swap-selector/swap-selector';
import { CoinService } from '@/services/coin/coin.service';
import { useTranslations } from 'next-intl';

const ExchangeForm = () => {
  const router = useRouter();
  const t = useTranslations('exchange');
  const [fixedRate, setfixedRate] = useState(false);
  const [fromAmount, onFromAmountChange] = useState('0.1');
  const [toAmount, onToAmountChange] = useState('0');

  // Ref and inView hook for animation trigger
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  // const [fromCurrency, onFromCurrencyChange] = useState<CurrencyPropsFinal>({
  //   token: 'BTC',
  //   title: 'Bitcoin',
  //   is_memo: false,
  //   network: {
  //     id: 29593,
  //     title: 'BTC',
  //   },
  // });
  //
  // const [toCurrency, onToCurrencyChange] = useState<CurrencyPropsFinal>({
  //   token: 'SOL',
  //   title: 'Solana',
  //   is_memo: false,
  //   network: { id: 29528, title: 'SOL' },
  // });

  // Initialize with null to indicate loading state
  const [fromCurrency, onFromCurrencyChange] = useState<CurrencyPropsFinal | null>(null);
  const [toCurrency, onToCurrencyChange] = useState<CurrencyPropsFinal | null>(null);
  // const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);

  // Fetch initial currencies on component mount
  useEffect(() => {
    const fetchInitialCurrencies = async () => {
      try {
        // setIsLoadingCurrencies(true);

        // Fetch BTC
        const btcParams: CoinsListParams = {
          search: 'BTC',
          page: 1,
          page_size: 1,
        };

        // Fetch SOL
        const solParams: CoinsListParams = {
          search: 'SOL',
          page: 1,
          page_size: 1,
        };

        const [btcResponse, solResponse] = await Promise.all([
          CoinService.getCoinsList(btcParams),
          CoinService.getCoinsList(solParams),
        ]);

        // Process BTC data
        if (btcResponse.results && btcResponse.results.length > 0) {
          const btcCoin = btcResponse.results[0];
          const btcCurrency: CurrencyPropsFinal = {
            token: btcCoin.token,
            title: btcCoin.title,
            is_memo: btcCoin.is_memo,
            network: btcCoin.networks[0], // Assuming first network
          };
          onFromCurrencyChange(btcCurrency);
        }

        // Process SOL data
        if (solResponse.results && solResponse.results.length > 0) {
          const solCoin = solResponse.results[0];
          const solCurrency: CurrencyPropsFinal = {
            token: solCoin.token,
            title: solCoin.title,
            is_memo: solCoin.is_memo,
            network: solCoin.networks[0], // Assuming first network
          };
          onToCurrencyChange(solCurrency);
        }
      } catch (error) {
        console.error('Error fetching initial currencies:', error);

        // Fallback to hardcoded values if API fails
        onFromCurrencyChange({
          token: 'BTC',
          title: 'Bitcoin',
          is_memo: false,
          network: {
            id: 29593,
            title: 'BTC',
          },
        });

        onToCurrencyChange({
          token: 'SOL',
          title: 'Solana',
          is_memo: false,
          network: { id: 29528, title: 'SOL' },
        });
      } finally {
        // setIsLoadingCurrencies(false);
      }
    };

    fetchInitialCurrencies();
  }, []);

  const handleExchange = () => {
    if (!fromCurrency || !toCurrency) return;

    localStorage.setItem('fixedRate', String(fixedRate));
    localStorage.setItem('amount', fromAmount);
    localStorage.setItem('from', JSON.stringify(fromCurrency));
    localStorage.setItem('to', JSON.stringify(toCurrency));

    router.push(`/transfer/`);
  };

  const updateQuery = async (value: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fixedRate', String(value));
    }
  };

  const switchRateInQuery = (value: boolean) => {
    setfixedRate(value);
    updateQuery(value);
  };

  const [childError, setChildError] = useState<boolean>(false);

  // Animation variants for the dots
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const dotVariants: Variants = {
    hidden: {
      scale: 0.8,
      opacity: 0.3,
    },
    visible: (i: number) => ({
      scale: [0.8, 1.2, 1, 0.8],
      opacity: [0.3, 1, 0.8, 0.3],
      backgroundColor: ['#3460FD', '#3460FD', '#3460FD', '#3460FD'],
      transition: {
        duration: 1.2,
        delay: i * 0.1,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 0.3,
        backgroundColor: {
          duration: 0.2,
          delay: i * 0.1 + 0.3,
          repeat: Infinity,
          repeatDelay: 0.3,
        },
      },
    }),
  };

  return (
    <div
      ref={ref}
      className={clsx(
        'max-w-[1140px] w-full bg-[#FFFAFA] rounded-[20px] p-[10px] mt-5 md:mt-16',
        'relative',
        'shadow-[0px_0px_4px_0px_#E1DCDC]'
      )}>
      {/*{inView && (*/}
      {/*  <motion.div*/}
      {/*    style={{ boxShadow: '0px 0px 25px 15px rgba(240, 241, 245, 0.8)', pointerEvents: 'none' }}*/}
      {/*    className="absolute inset-0 flex items-center justify-center bg-[#FFFAFA]/70 backdrop-blur-xl z-10 rounded-[15px] "*/}
      {/*    initial={{ opacity: 1 }}*/}
      {/*    animate={{ opacity: 0 }}*/}
      {/*    transition={{ delay: 1.0, duration: 0.5 }}>*/}
      {/*    <motion.div*/}
      {/*      className="flex space-x-2"*/}
      {/*      variants={containerVariants}*/}
      {/*      initial="hidden"*/}
      {/*      animate="visible">*/}
      {/*      {[...Array(10)].map((_, i) => (*/}
      {/*        <motion.div*/}
      {/*          key={i}*/}
      {/*          className="w-3 h-3 rounded-full bg-gray-600"*/}
      {/*          variants={dotVariants}*/}
      {/*          custom={i}*/}
      {/*        />*/}
      {/*      ))}*/}
      {/*    </motion.div>*/}
      {/*  </motion.div>*/}
      {/*)}*/}

      {/* Loading Animation - shows when currencies are not loaded */}
      {inView && (
        <motion.div
          style={{ boxShadow: '0px 0px 25px 15px rgba(240, 241, 245, 0.8)', pointerEvents: 'none' }}
          className="absolute inset-0 flex items-center justify-center bg-[#FFFAFA]/70 backdrop-blur-xl z-10 rounded-[15px]"
          initial={{ opacity: 1 }}
          animate={{ opacity: fromCurrency && toCurrency ? 0 : 1 }}
          transition={{
            delay: fromCurrency && toCurrency ? 0.5 : 0,
            duration: 0.5,
          }}>
          <motion.div
            className="flex space-x-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-gray-600"
                variants={dotVariants}
                custom={i}
              />
            ))}
          </motion.div>
        </motion.div>
      )}

      <form action="" className={`flex items-center flex-col w-full`}>
        <div className={styles.formHead}>
          <div className={`${styles.leftForm}`}>
            <button className={styles.active}>{t('tabs.exchange')}</button>
            <button disabled className={styles.disabled}>
              {t('tabs.buy')} <span>{t('soon')}</span>
            </button>
            <button disabled className={styles.disabled}>
              {t('tabs.sell')} <span>{t('soon')}</span>
            </button>
          </div>

          {/*{!isMobile && (*/}
          <div className={`hidden lg:flex justify-center items-center ${styles.floatingRate}`}>
            <SwitcherWIcon checked={fixedRate} setChecked={switchRateInQuery} />
          </div>
          {/*)}*/}
        </div>

        <SwapSelector
          onError={setChildError}
          className="bg-snow"
          fixedRate={fixedRate}
          fromCurrency={fromCurrency}
          setFromCurrencyChange={onFromCurrencyChange}
          toCurrency={toCurrency}
          setToCurrencyChange={onToCurrencyChange}
          fromAmount={fromAmount}
          onFromAmountChange={onFromAmountChange}
          toAmount={toAmount}
          onToAmountChange={onToAmountChange}
        />

        <div className="lg:hidden w-full pt-4 sm:pl-4">
          <SwitcherWIcon checked={fixedRate} setChecked={switchRateInQuery} />
        </div>

        <Button
          disabled={childError}
          // disabled={childError}
          variant="solid"
          color="blue"
          size="large"
          className={styles.exchangeBtn}
          onClick={handleExchange}>
          {t('buttons.exchangeNow')}
        </Button>
      </form>
    </div>
  );
};
export default ExchangeForm;
