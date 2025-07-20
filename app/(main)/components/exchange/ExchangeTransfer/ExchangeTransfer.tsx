'use client';

import { Button, Checkbox, Input, Tooltip } from 'antd';
import { CoinsListParams, CurrencyPropsFinal } from '@/types/coin.interface';
import { ExchangeService } from '@/services/exchange/exchange.service';
import { CreateExchangeBody, ValidCreatedResponse } from '@/types/exchange.interface';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SwitcherWIcon } from '@/app/components/SwitcherWIcon/SwitcherWIcon';
import { getLocalStoreItem } from '@/utils/local.storage';
import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.css';
import { debounce } from '@/utils/debounce';
import { CoinService } from '@/services/coin/coin.service';
import QrInput from '@/app/components/QrInput';
import SwapSelector from '@/app/(main)/components/exchange/swap-selector/swap-selector';

export const ExchangeTransfer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [fixedRate, setfixedRate] = useState(getLocalStoreItem('fixedRate') ?? false);
  const [fromAmount, onFromAmountChange] = useState(getLocalStoreItem('amount') ?? '0.1');
  const [toAmount, onToAmountChange] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  // Initialize currencies with localStorage values or null
  const [fromCurrency, onFromCurrencyChange] = useState<CurrencyPropsFinal | null>(
    getLocalStoreItem('from') ?? null
  );
  const [toCurrency, onToCurrencyChange] = useState<CurrencyPropsFinal | null>(
    getLocalStoreItem('to') ?? null
  );

  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);

  // Fetch initial currencies on component mount
  useEffect(() => {
    const fetchInitialCurrencies = async () => {
      try {
        setIsLoadingCurrencies(true);

        // If currencies are already loaded from localStorage, skip API call
        const localFrom = getLocalStoreItem('from');
        const localTo = getLocalStoreItem('to');

        if (localFrom && localTo) {
          onFromCurrencyChange(localFrom);
          onToCurrencyChange(localTo);
          setIsLoadingCurrencies(false);
          return;
        }

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
          if (!localFrom) onFromCurrencyChange(btcCurrency);
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
          if (!localTo) onToCurrencyChange(solCurrency);
        }
      } catch (error) {
        console.error('Error fetching initial currencies:', error);

        // Fallback to hardcoded values if API fails and no localStorage
        if (!getLocalStoreItem('from')) {
          onFromCurrencyChange({
            token: 'BTC',
            title: 'Bitcoin',
            is_memo: false,
            network: {
              id: 29593,
              title: 'BTC',
            },
          });
        }

        if (!getLocalStoreItem('to')) {
          onToCurrencyChange({
            token: 'SOL',
            title: 'Solana',
            is_memo: false,
            network: {
              id: 29528,
              title: 'SOL',
            },
          });
        }
      } finally {
        setIsLoadingCurrencies(false);
      }
    };

    fetchInitialCurrencies();
  }, []);

  //send form
  const [walletAddress, setWalletAddress] = useState('');
  const [memoAddress, setMemoAddress] = useState('');
  const [refundAddress, setRefundAddress] = useState('');
  const [email, setEmail] = useState('');

  const [confTerms, setConfTerms] = useState(false);
  const [tryExchange, setTryExchange] = useState(false);

  const onAddExchange = async (e: FormEvent) => {
    e.preventDefault();
    setTryExchange(false);
    setIsLoading(true);

    const formFromAmount = Number(fromAmount);
    const formToAmount = Number(toAmount);
    if (
      !isNaN(formFromAmount) &&
      isFinite(formFromAmount) &&
      !isNaN(formToAmount) &&
      isFinite(formToAmount)
    ) {
      if (!fromCurrency?.network.id || !toCurrency?.network.id) {
        console.warn('Invalid IDs');
        return;
      }

      if (fromCurrency?.is_memo && !memoAddress.trim()) {
        console.warn('Must have Memo');
        return;
      }

      const rParam = searchParams.get('r');

      const localReferral = localStorage?.getItem('r');
      console.log(localReferral);
      // console.log('Exchange key =====', getLocalStoreItem('exchange_key'));
      if (!confTerms) {
        setTryExchange(true);
        return;
      }

      const SubmitBody: CreateExchangeBody = {
        from_amount: formFromAmount,
        address: walletAddress.trim(),
        memo: memoAddress.trim() ?? '',
        terms: confTerms,
        fixed: fixedRate,
        support_email: email, // 'test@gmail.com'
        withdraw_refund: refundAddress.trim() ?? '',
        from_pair_id: fromCurrency.network.id!,
        to_pair_id: toCurrency.network.id!,
        to_amount: toAmount,
        referral: localReferral ?? rParam ?? null,
        key: getLocalStoreItem('exchange_key'),
      };

      if (!isLoading) {
        try {
          const resp: ValidCreatedResponse = await ExchangeService.createExchange(SubmitBody);

          if (resp && resp.deposit_address && resp.exchange_id) {
            // ${resp?.deposit_memo ? `?deposit_memo=${encodeURIComponent(resp.deposit_memo)}` : ''}
            const url = `${pathname}/${resp.exchange_id}`;
            router.push(url);
          }

          if (!resp?.deposit_address) {
            setIsLoading(false);
          }

          setIsError(`${resp?.support_email ?? ''}`);

          console.log('Add exchange', resp);
          console.log(walletAddress);
        } catch (error) {
          console.error('create error', error);
          setIsLoading(false);
        }
      }
    }
  };

  const [isValid, setIsValid] = useState<boolean>(true);
  const [isValidating, setIsValidating] = useState(false);

  console.log(toCurrency);
  const debouncedValidate = useMemo(() => {
    const validate = async (addr: string) => {
      // Only make API call if address has content
      if (!addr.trim()) {
        setIsValid(true);
        setIsValidating(false);
        return;
      }

      try {
        const res = await CoinService.validateWallet({
          address: addr,
          currency_name: toCurrency?.network?.title ?? 'SOL',
        });
        console.log('valid wallet', res?.is_valid);
        setIsValid(res?.is_valid ?? false);
      } catch (error) {
        console.error('Validation error:', error);
        setIsValid(false);
      } finally {
        setIsValidating(false); // Always reset validating state
      }
    };

    return debounce(validate, 500);
  }, [toCurrency]);

  // Modified useEffect to only validate when walletAddress has at least one character
  useEffect(() => {
    // Only validate if walletAddress has at least one character
    if (walletAddress.trim().length > 0) {
      setIsValidating(true); // Set validating state immediately
      debouncedValidate(walletAddress);
    } else {
      // Reset validation state when input is empty
      setIsValid(true);
      setIsValidating(false);
    }

    return () => debouncedValidate.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress, fromCurrency]);

  const [childError, setChildError] = useState<boolean>(false);

  // Don't render form until currencies are loaded (show loading state)
  if (isLoadingCurrencies || !fromCurrency || !toCurrency) {
    return (
      <div className="mt-2 mb-3 sm:mt-10 max-xl:w-full px-3 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exchange details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" mt-2 mb-3 sm:mt-10 max-xl:w-full px-3">
      {/* Exchange Bloxk */}
      <div className={`${styles.exchangeContainer} !mt-0`}>
        <h1 className="text-center font-medium">Add exchange details</h1>
      </div>
      {/* Exchange Inputs */}
      <div className={styles.exchangeContainer}>
        <div className="w-full mb-8">
          <SwapSelector
            onError={setChildError}
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
        </div>

        <div className="w-full pb-7">
          <SwitcherWIcon checked={fixedRate} setChecked={setfixedRate} />
        </div>

        <form className="w-full" onSubmit={onAddExchange}>
          {/* Wallet Address */}
          <div className="w-full mb-4">
            <p className="text-gray-700 mb-2 text-sm font-medium">Enter wallet address</p>
            <QrInput
              value={walletAddress}
              onChange={setWalletAddress}
              placeholder="Enter the recipient's address"
              required
            />
            {!isValid && (
              <div className="text-xs pt-3 text-red-600">{'Check your wallet for a valid one'}</div>
            )}
          </div>

          {(fromCurrency?.is_memo || toCurrency?.is_memo) && (
            <div className="w-full">
              <p className="text-gray-700 mb-2 text-sm font-medium">Enter Memo address</p>
              <Input
                required={fromCurrency.is_memo || toCurrency.is_memo}
                placeholder="Enter the recipient's address"
                value={memoAddress}
                onChange={(e) => setMemoAddress(e.target.value)}
                size="large"
                suffix={
                  <Tooltip title="Qr">
                    {/* <CopyOutlined className="text-gray-400 cursor-pointer" /> */}
                    <Image
                      src="/icons/copy.svg"
                      width={20}
                      height={20}
                      alt="qr"
                      className="text-gray-400 cursor-pointer"
                    />
                  </Tooltip>
                }
              />
            </div>
          )}

          <div className={`flex gap-2 justify-start items-center py-3 ${''}`}>
            <Checkbox
              required
              checked={confTerms}
              onChange={() => {
                setConfTerms((prev) => !prev);
              }}
            />
            <p className={styles.policyTermsTextBox}>
              I agree to the
              <a
                href="/privacy-policy"
                target="_blank"
                className={!confTerms && tryExchange ? '!text-red-500' : 'text-blue-500'}>
                {' Privacy Policy '}
              </a>
              and
              <a
                href="/temp-of-use"
                target="_blank"
                className={!confTerms && tryExchange ? '!text-red-500' : 'text-blue-500'}>
                {' Terms of Service '}
              </a>
              when I click
              <a
                href="/temp-of-use"
                target="_blank"
                className={!confTerms && tryExchange ? '!text-red-500' : 'text-blue-500'}>
                {' Create an exchange'}
              </a>
              .
            </p>
          </div>
          {/* Exchange Button */}

          <Button
            disabled={
              isLoading || !confTerms || !isValid || childError || !walletAddress.trim() || isValidating
            }
            htmlType="submit"
            className={`w-full h-11 mb-3 !text-white disabled:!bg-[#1347FE80]`}
            variant="solid"
            color="blue"
            size="large">
            <span>Create an exchange</span>
          </Button>

          {/*  <button >
            <span>Create an exchange</span>
          </button> */}
          {/* Terms */}
          {/* <p className="text-center text-xs text-gray-500 mb-8">

          </p> */}
        </form>
      </div>
      <div className={styles.exchangeContainer}>
        <div className="w-full mb-5 ml-1">
          <p className="text-gray-700 mb-2 text-sm font-medium">Refund wallet (optional)</p>
          <Input
            placeholder="Wallet for refund (optional)"
            value={refundAddress}
            onChange={(e) => setRefundAddress(e.target.value)}
            size="large"
          />
          {/*<p className="text-xs mt-2 text-gray-500">We recommend adding your wallet address for a refund</p>*/}
        </div>

        <div className="w-full mb-2 ml-1">
          <p className={!isError ? 'text-gray-700 mb-2 text-sm font-medium' : 'text-red-500'}>
            Email (Optional)
          </p>
          <Input
            placeholder="Exchange alerts (optional)"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            size="large"
          />
          <p className="text-xs mt-2 text-gray-500">
            {
              isError && <span className="text-red-500">Invalid email</span>
              //   : (
              //   'If you want to get notifications about this exchange.'
              // )
            }
          </p>
        </div>
      </div>
    </div>
  );
};
