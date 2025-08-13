'use client';
import { Image } from 'antd';
import styles from './styles.module.css';
import { FC } from 'react';
import { getNetworkTextColor, networkColors } from '@/config/networks.config';

interface CurrencyViewProps {
  marginLeft?: string;
  symbolFirst?: boolean;
  currency?: {
    symbol: string;
    network: string;
    name?: string;
    value?: string;
  };
}

export const CurrencyView: FC<CurrencyViewProps> = ({
  currency,
  symbolFirst = false,
  marginLeft = '-ml-1',
}) => {
  if (currency)
    return (
      <div className={`max-w-full ${styles.currencyWrapper}`}>
        <Image
          className={`${marginLeft ?? ''}`}
          src={`/coins/(${currency?.symbol.toLocaleUpperCase()}).svg`}
          width={35}
          height={35}
          alt={currency?.name ?? 'token'}
          onError={(e) => {
            e.currentTarget.src = '/icons/coin.svg';
          }}
        />

        {currency.value && <span>{currency.value}</span>}

        <div className={styles.currencyWrapperCol}>
          {currency?.symbol && (
            <p className={styles.currencySymbol}>{symbolFirst ? currency?.symbol : currency.name}</p>
          )}
          <p className={styles.currencyWrapperRow}>
            <span
              className={`max-sm:max-w-full truncate overflow-hidden whitespace-nowrap ${styles.currencyName}`}>
              {symbolFirst ? currency.name : currency?.symbol}
            </span>

            <span
              style={{
                backgroundColor:
                  networkColors[currency.network?.toUpperCase() as keyof typeof networkColors] ?? '#CBEDFF',
              color: getNetworkTextColor(currency.network),
              }}
              className={styles.networkSymbol}>
              {currency?.network}
            </span>
          </p>
        </div>
      </div>
    );
};
