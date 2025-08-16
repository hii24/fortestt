'use client';

import Image from 'next/image';

import { CalculateExchangeBody, CurrencyPropsFinal } from '@/types/coin.interface';
import { useCallback, useEffect, useState } from 'react';
import { CoinService } from '@/services/coin/coin.service';

import styles from '@/app/(main)/components/exchange/styles.module.css';
import { ExchangeService } from '@/services/exchange/exchange.service';
import CurrencySelector from '@/app/(main)/components/exchange/swap-selector/ui/currency-selector/currency-selector';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

interface SwapSelectorProps {
  fixedRate?: boolean;
  className?: string;
  fromAmount: string;
  toAmount: string;
  fromCurrency: CurrencyPropsFinal | null;
  onFromAmountChange: (amount: string) => void;
  setFromCurrencyChange?: (currency: CurrencyPropsFinal) => void;
  toCurrency: CurrencyPropsFinal | null;
  onToAmountChange: (amount: string) => void;
  setToCurrencyChange?: (currency: CurrencyPropsFinal) => void;
  onError?: (hasError: boolean) => void;
}

export interface IAmountRange {
  symbol: string;
  min_deposit: string;
  max_deposit: string;
  min_withdraw?: string;
  max_withdraw?: string;
  reversed?: boolean;
  source?: string;
}

export interface IPerOne {
  symbol: string;
  price: string;
  error?: string;
}

const totalInterval = 40;

const SwapSelector: React.FC<SwapSelectorProps> = ({
  fixedRate,
  className,
  fromCurrency,
  toCurrency,
  setFromCurrencyChange,
  setToCurrencyChange,
  onFromAmountChange,
  onToAmountChange,
  fromAmount,
  toAmount,
  onError,
}) => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [amountRange, setAmountRange] = useState<IAmountRange | null>(null);
  const [pricePerOne, setPricePerOne] = useState<IPerOne | null>(null);
  const t = useTranslations('exchange.swap');

  useEffect(() => {
    onError?.(error && error.trim() !== '' ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const onFromCurrencyChange = useCallback(
    (newFromCurrency: CurrencyPropsFinal) => {
      if (newFromCurrency?.network.id === toCurrency?.network.id || !setFromCurrencyChange) return;
      setFromCurrencyChange(newFromCurrency);
    },
    [toCurrency, setFromCurrencyChange]
  );

  const onToCurrencyChange = useCallback(
    (newToCurrency: CurrencyPropsFinal) => {
      if (newToCurrency?.network.id === fromCurrency?.network.id || !setToCurrencyChange) return;
      setToCurrencyChange(newToCurrency);
    },
    [fromCurrency, setToCurrencyChange]
  );

  useEffect(() => {
    const fetchRate = () => {
      console.warn('swap effect');
      if (!fromCurrency?.network.id || !toCurrency?.network.id) {
        console.warn('No Ids');
        return;
      }

      if ((!isLoading || error || Number(fromAmount) !== 0) && Number(fromAmount)) {
        setisLoading(true);
        const calcBody: CalculateExchangeBody = {
          amount: fromAmount,
          from_pair_id: fromCurrency.network.id,
          to_pair_id: toCurrency.network.id,
          commission_type: fixedRate ? 'fix' : 'float',
        };
        CoinService.calculateExchangeRate(calcBody)
          .then((respo) => {
            if (respo?.amount && !respo?.result) {
              const min = respo?.min_amount
                ? t('minAmount', { min: respo.min_amount, token: fromCurrency?.token ?? '' })
                : '';
              // If backend returns a human-readable amount error (e.g. "Must be greater than 60 USDT"),
              // prefer showing it. Otherwise fall back to localized min amount text.
              const amountMessage = typeof respo.amount === 'string' ? respo.amount : '';
              if (amountMessage) {
                setError(amountMessage);
              } else {
                setError(`${t('amountRange')} ${min}`.trim());
              }
              onToAmountChange('0');
            } else {
              setError(null);
              onToAmountChange(respo.result);

              localStorage.setItem('fixedRate', String(fixedRate));
              localStorage.setItem('amount', fromAmount);
              localStorage.setItem('from', JSON.stringify(fromCurrency));
              localStorage.setItem('to', JSON.stringify(toCurrency));
              localStorage.setItem('exchange_key', JSON.stringify(respo?.key));
            }

            console.log('Request ', calcBody);
            console.log('Calculate ', respo);
          })
          .catch((err) => {
            setError(t('errors.fetchRate'));
            console.error(err);
          })
          .finally(() => {
            setisLoading(false);
          });

        ExchangeService.quoteRangeWhitebit({
          coin_id: fromCurrency?.network.id,
          // to_coin_id: toCurrency?.network.id,
        })
          .then((data) => {
            console.log('MINIMUM', data);
            setAmountRange(data);
          })
          .catch((e) => {
            console.error(e);
            setAmountRange(null);
          });

        ExchangeService.quoteOneWhitebit({
          from_coin_id: fromCurrency?.network.id,
          to_coin_id: toCurrency?.network.id,
          fee_type: fixedRate ? 'fix' : 'float',
        })
          .then((data) => {
            console.log('price per one', data?.price);
            if (data?.error) setError(t('errors.amountRangeIn', { error: data.error ?? '' }));

            setPricePerOne(data);
          })
          .catch((e) => {
            console.error(e);
            setPricePerOne(null);
          });
      }
    };

    fetchRate();

    const interval = setInterval(fetchRate, totalInterval * 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromAmount, fromCurrency, toCurrency, !!fixedRate]);

  return (
    <>
      <div className={`flex flex-col lg:flex-row w-full p-0 sm:p-5 ${className || ''}`}>
        {/*---------------YOU SEND---------------*/}
        <div className="flex-1 flex flex-col items-start gap-[10px] pt-[15px] sm:pt-0 lg:max-w-[442px] xl:max-w-none min-w-0">
          <p
            className={`color-[#1b1b1b] text-[14px] md:text-[16px] font-[400] leading-normal ${error && '!text-red-500'}`}>
            {t('youSend')}
          </p>
          <CurrencySelector
            className={`${error && '[&_input]:!text-red-500'}`}
            amount={fromAmount}
            currency={fromCurrency}
            currencyListLimit={50}
            onCurrencyChange={onFromCurrencyChange}
            onAmountChange={onFromAmountChange}
            isCalculating={isLoading}
          />
          <div className="relative inline-block">
            <p className={clsx(`pl-1 color-[#1B1B1B] text-[12px] md:text-[14px] font-[360] leading-normal`)}>
              {error ? (
                <span className="text-red-500">{error}</span>
              ) : (
                <>
                  {amountRange && (
                    <>
                      <span className={`${error && '!text-red-500'}`}>{t('amountRange')}</span>
                      <span>{` ${amountRange?.min_deposit} - ${amountRange?.max_deposit} `}</span>
                      <span className="text-[#1b1b1b]">{fromCurrency?.token}</span>
                    </>
                  )}
                </>
              )}
            </p>
          </div>
        </div>

        {/*---------------SWAP BUTTON---------------*/}
        <button
          type="button"
          className={`${styles.swap} max-sm:w-full max-sm:!my-0 max-sm:pr-6 sm:mx-8 flex max-sm:!justify-end`}
          onClick={() => {
            if (setFromCurrencyChange && setToCurrencyChange && fromCurrency && toCurrency) {
              const tempTo = { ...toCurrency };
              const tempFrom = { ...fromCurrency };
              setFromCurrencyChange(tempTo);
              setToCurrencyChange(tempFrom);
            }
          }}>
          <Image src="/icons/swap.svg" width={32} height={32} alt="swap" />
        </button>

        {/*---------------YOU GET---------------*/}
        <div className={`${styles.toSelect} flex-1 gap-[10px] flex flex-col items-start !w-full lg:max-w-[442px] xl:max-w-none min-w-0`}>
          <p className={'color-[#1b1b1b] text-[14px] md:text-[16px] font-[400] leading-normal'}>{t('youGet')}</p>
          <CurrencySelector
            cuted
            showFloatIcon
            fixed={fixedRate}
            disabledAmound
            amount={toAmount}
            currency={toCurrency}
            currencyListLimit={50}
            onCurrencyChange={onToCurrencyChange}
            onAmountChange={onToAmountChange}
            isCalculating={isLoading}
          />
          <div className="relative inline-block">
            <p className={clsx(`pl-1 color-[#1B1B1B] text-[12px] md:text-[14px] font-[360] leading-normal`)}>
              {pricePerOne?.price
                ? t('pricePerOne', { from: fromCurrency?.token ?? '', price: pricePerOne?.price ?? '' })
                : `${pricePerOne?.price ?? t('tryAnotherPair')}`}
            </p>

            {/* Loading animation overlay - fits content width */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SwapSelector;