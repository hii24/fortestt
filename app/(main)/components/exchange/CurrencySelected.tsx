'use client';

import styles from '@/app/(main)/components/exchange/styles.module.css';
import Image from 'next/image';

interface CurrencySelectedProps {
  className?: string;
  fromCurrency?: {
    id: string;
    name: string;
  };
  toCurrency?: {
    id: string;
    name: string;
  };
  onFromCurrencyChange?: (currency: { id: string; name: string }) => void;
  onToCurrencyChange?: (currency: { id: string; name: string }) => void;
  onFromAmountChange?: (amount: string) => void;
  onToAmountChange?: (amount: string) => void;
  fromAmount?: string;
  toAmount?: string;
  redItems?: boolean;
}

const CurrencySelected: React.FC<CurrencySelectedProps> = ({
  className,
  fromCurrency = { id: 'BTC', name: 'Bitcoin' },
  toCurrency = { id: 'SOL', name: 'Solana' },
  onFromAmountChange,
  onToAmountChange,
  fromAmount = '',
  toAmount = '',
  redItems = true,
}) => {
  return (
    <div className={`${styles.formCenter} flex-wrap ${className || ''}`}>
      <h4
        className="w-full"
        style={{
          fontSize: '16px',
          lineHeight: '100%',
          letterSpacing: '0%',
          paddingBlock: '12px',
          fontWeight: 'bold',
          color: redItems ? 'rgb(239 68 68 / var(--tw-text-opacity, 1))' : 'inherit',
          width: '100%',
        }}>
        Show details
      </h4>
      <div>
        <p
          style={{ color: redItems ? 'rgb(239 68 68 / var(--tw-text-opacity, 1))' : 'inherit' }}
          className={styles.send}>
          You send
        </p>
        <div className={styles.fromSelect}>
          <input
            style={{ color: redItems ? 'rgb(239 68 68 / var(--tw-text-opacity, 1))' : 'inherit' }}
            className="flex-1"
            type="text"
            value={fromAmount}
            onChange={(e) => onFromAmountChange && onFromAmountChange(e.target.value)}
          />
          <div className={`${styles.from} !cursor-default`}>
            <div className={`justify-center ${styles.coinsend}`}>
              <Image
                src={`/coins/(${fromCurrency?.id}).svg`}
                onError={(e) => {
                  e.currentTarget.src = '/icons/coin.svg';
                }}
                width={35}
                height={35}
                alt={fromCurrency.name}
              />
              <div className={`${styles.coinSendText} flex-col leading-3`}>
                <p className={styles.coinSendOwn}>{fromCurrency.id}</p>
                <br />
                <p className={styles.coinSendDescription}>{fromCurrency.name}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <p className={styles.description}>Amount range 0.00110 - 11.00246 BTC</p> */}
      </div>
      <div className={`${styles.swap} !m-5`}>
        <Image src="/icons/swap.svg" width={32} height={32} alt="swap" />
      </div>
      <div className={styles.toSelect}>
        <p
          style={{ color: redItems ? 'rgb(239 68 68 / var(--tw-text-opacity, 1))' : 'inherit' }}
          className={styles.send}>
          You get
        </p>
        <div className={styles.fromSelect}>
          <input
            style={{ color: redItems ? 'rgb(239 68 68 / var(--tw-text-opacity, 1))' : 'inherit' }}
            className="flex-1"
            type="text"
            value={toAmount}
            onChange={(e) => onToAmountChange && onToAmountChange(e.target.value)}
          />
          <div className={`${styles.to} !h-[65px] !cursor-default`}>
            <div className={`justify-center ${styles.coinsend}`}>
              <Image
                src={`/coins/(${toCurrency?.id}).svg`}
                onError={(e) => {
                  e.currentTarget.src = '/icons/coin.svg';
                }}
                width={35}
                height={35}
                alt={toCurrency.name}
              />
              <div className={`${styles.coinSendText}`}>
                <p className={styles.coinSendOwn}>{toCurrency.id}</p>
                <p className={styles.coinSendDescription}>{toCurrency.name}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <p className={styles.description}>Amount range 0.00110 - 11.00246 BTC</p> */}
      </div>
    </div>
  );
};

export default CurrencySelected;
