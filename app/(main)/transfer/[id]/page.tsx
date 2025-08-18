'use client';

import { useEffect, useState } from 'react';
import { Tooltip, QRCode, Button, Input } from 'antd';
import styles from './styles.module.css';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ExchangeService } from '@/services/exchange/exchange.service';
import { ExchangeCheckingItem } from '@/types/exchange.interface';
import { timeLeft } from '@/utils/timer';
import { copyToClipboard } from '@/utils/copyToClipboard';
import Link from 'next/link';
import { OperationDetails } from '../../components/exchange/OperationDetails/OperationDetails';
import CurrencySelected from '../../components/exchange/CurrencySelected';
import { CurrencyView } from '../../components/exchange/CurrencyView/CurrencyView';
import { CopiedInput } from '@/app/components/CopiedInput/CopiedInput';
import CurrencyButton from '@/app/(main)/components/exchange/swap-selector/ui/currency-selector/ui/currency-button/currency-button';
import { useTranslations } from 'next-intl';

export default function ExchangeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('transfer');
  const tExchange = useTranslations('exchange');

  // main response
  const [responseData, setResponseData] = useState<ExchangeCheckingItem | null>(null);

  const params = useParams();
  const exchangeId = params?.id;
  console.log(params, 'params');

  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    if (!exchangeId) return;

    const fetchData = () => {
      ExchangeService.getExchangeByUniqueId(`/${exchangeId}`)
        .then((exData) => {
          setResponseData(exData);
          setSecondsLeft(exData?.seconds_left ?? 0);
        })
        .finally(() => setIsLoading(false));
    };

    fetchData();

    const interval = setInterval(fetchData, 30_000);

    return () => clearInterval(interval);
  }, [exchangeId]);

  useEffect(() => {
    if (!responseData || responseData.status > 1 || !secondsLeft) return;
    // console.log(responseData, 'secondsLeft');
    
    const timer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1_000);

    return () => clearInterval(timer);
  }, [responseData, secondsLeft]);

  const steps = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" viewBox="0 0 27 26" fill="none">
          <path
            d="M13.4993 23.8333C19.4577 23.8333 24.3327 18.9583 24.3327 13C24.3327 7.04167 19.4577 2.16667 13.4993 2.16667C7.54102 2.16667 2.66602 7.04167 2.66602 13C2.66602 18.9583 7.54102 23.8333 13.4993 23.8333Z"
            stroke="currentColor"
            strokeWidth={1.625}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.8287 13H17.8384"
            stroke="currentColor"
            strokeWidth={2.16667}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.4947 13H13.5044"
            stroke="currentColor"
            strokeWidth={2.16667}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.16072 13H9.17045"
            stroke="currentColor"
            strokeWidth={2.16667}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: t('steps.pendingDeposit'),
      code: 1,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path
            d="M15.7618 23.4758C20.4093 22.2517 23.8327 18.0267 23.8327 13C23.8327 7.02001 19.0227 2.16667 12.9993 2.16667C5.77352 2.16667 2.16602 8.19001 2.16602 8.19001M2.16602 8.19001V3.25001M2.16602 8.19001H4.34352H6.97602"
            stroke="currentColor"
            strokeWidth={1.625}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.16602 13C2.16602 18.98 7.01935 23.8333 12.9993 23.8333"
            stroke="currentColor"
            strokeWidth={1.625}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="3.25 3.25"
          />
        </svg>
      ),
      label: t('steps.confirming'),
      code: 2,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" fill="none">
          <path
            d="M8.125 9.03519H16.1417C17.1058 9.03519 17.875 9.81516 17.875 10.7685V12.686"
            stroke="currentColor"
            strokeWidth={1.625}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.95584 7.21516L8.125 9.03522L9.95584 10.8661"
            stroke="currentColor"
            strokeWidth={1.625}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.875 16.9649H9.85834C8.89417 16.9649 8.125 16.1849 8.125 15.2316V13.3141"
            stroke="currentColor"
            strokeWidth={1.625}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.0449 18.7851L17.8758 16.9651L16.0449 15.1342"
            stroke="currentColor"
            strokeWidth={1.625}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.9993 23.8333C18.9824 23.8333 23.8327 18.9831 23.8327 13C23.8327 7.01692 18.9824 2.16667 12.9993 2.16667C7.01626 2.16667 2.16602 7.01692 2.16602 13C2.16602 18.9831 7.01626 23.8333 12.9993 23.8333Z"
            stroke="currentColor"
            strokeWidth={1.625}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: t('steps.exchanging'),
      code: 4,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={27} height={26} viewBox="0 0 27 26" fill="none">
          <path
            d="M13.3201 24.5556C19.8018 24.5556 25.0562 19.3011 25.0562 12.8194C25.0562 6.33776 19.8018 1.08333 13.3201 1.08333C6.83842 1.08333 1.58398 6.33776 1.58398 12.8194C1.58398 19.3011 6.83842 24.5556 13.3201 24.5556Z"
            stroke="currentColor"
            strokeWidth={1.76042}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.5292 7.07678C19.5242 7.05274 19.5125 7.03062 19.4954 7.01302C19.4782 6.99543 19.4564 6.98309 19.4325 6.97746C17.8394 6.58781 14.1591 7.97619 12.1631 9.97072C11.8074 10.3235 11.483 10.7066 11.1937 11.1156C10.5784 11.06 9.9632 11.1069 9.43937 11.3354C7.96017 11.9858 7.5298 13.6844 7.40968 14.4136C7.40317 14.4536 7.40595 14.4945 7.4178 14.5332C7.42966 14.5719 7.45026 14.6073 7.47802 14.6368C7.50579 14.6663 7.53996 14.6889 7.5779 14.7031C7.61584 14.7172 7.65652 14.7224 7.69679 14.7183L10.0719 14.4575C10.0735 14.6367 10.0843 14.8156 10.1041 14.9937C10.1165 15.1167 10.1714 15.2316 10.2594 15.3186L11.179 16.2382C11.266 16.3262 11.381 16.3811 11.5042 16.3935C11.6812 16.4132 11.8591 16.424 12.0371 16.4257L11.7767 18.7988C11.7726 18.839 11.7778 18.8796 11.792 18.9175C11.8061 18.9553 11.8288 18.9895 11.8582 19.0172C11.8876 19.0449 11.923 19.0655 11.9617 19.0773C12.0003 19.0892 12.0412 19.092 12.0811 19.0856C12.8106 18.9684 14.5127 18.538 15.1593 17.0591C15.3878 16.5347 15.4347 15.9227 15.3819 15.3104C15.7922 15.0213 16.1764 14.6969 16.5301 14.3409C18.5334 12.3488 19.913 8.74934 19.5292 7.07678ZM14.7494 11.7602C14.5744 11.5852 14.4553 11.3623 14.407 11.1197C14.3587 10.877 14.3834 10.6254 14.4781 10.3968C14.5728 10.1682 14.7331 9.97285 14.9389 9.83537C15.1446 9.6979 15.3865 9.62453 15.6339 9.62453C15.8813 9.62453 16.1232 9.6979 16.3289 9.83537C16.5347 9.97285 16.695 10.1682 16.7897 10.3968C16.8844 10.6254 16.9091 10.877 16.8608 11.1197C16.8125 11.3623 16.6934 11.5852 16.5184 11.7602C16.4023 11.8765 16.2644 11.9688 16.1127 12.0317C15.9609 12.0947 15.7982 12.1271 15.6339 12.1271C15.4696 12.1271 15.3069 12.0947 15.1551 12.0317C15.0034 11.9688 14.8655 11.8765 14.7494 11.7602V11.7602Z"
            stroke="currentColor"
            strokeWidth={1.35417}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.21309 15.8133C8.92082 15.8492 8.64891 15.9817 8.44055 16.1898C7.92396 16.7081 7.875 18.6279 7.875 18.6279C7.875 18.6279 9.79594 18.5789 10.3128 18.0618C10.5217 17.8537 10.6545 17.5814 10.6896 17.2886"
            stroke="currentColor"
            strokeWidth={1.35417}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: t('steps.sending'),
      code: 5,
    },
  ];

  if (isLoading) {
    return (
      <div className={`lg:mt-10 max-xl:w-full font-semibold min-h-screen`}>
        <p>{t('loading')}</p>
      </div>
    );
  } else if (responseData === null) {
    return (
      <div className={`lg:mt-10 max-xl:w-full font-semibold min-h-screen`}>
        <p>{t('noData')}</p>
      </div>
    );
  } else
    return (
      <div className="lg:mt-10 max-xl:w-full p-3">
        {/* ID Block */}
        <div className={`flex justify-between gap-2 sm:gap-5 w-full max-w-[994px] mx-auto`}>
          <div
            className={`flex sm:gap-2 items-center w-fit bg-[#FFFAFA] px-5 rounded-[10px] flex-1 ${responseData.status === 7 ? 'text-red-500' : ''}`}>
            <b className="sm:mx-1 min-w-[104px]">{t('exchangeId')}:</b>

            <CopiedInput
              className="rounded-md py-2 my-2 !bg-transparent !border-0 !outline-none text-sm lg:mx-3 !text-[#1B1B1B]"
              copyTooltipAlt={t('copy.exchangeIdAlt')}
              copyTooltipTitle={t('copy.idTitle')}
              value={responseData.unique_id}
            />
          </div>
          {responseData?.status < 2 && (
            <div
              className={`w-fit flex justify-center items-center bg-[#fffafa] p-5 rounded-[10px] ${responseData.status === 7 ? 'text-red-500' : ''}`}>
              <time>{timeLeft(secondsLeft)}</time>
            </div>
          )}
        </div>

        {responseData.status === 1 && (
          <div className={styles.exchangeContainer}>
            <h1 className="flex flex-col text-center text-xl font-medium mb-8">{t('awaiting.title')}</h1>
            <div className="w-full flex items-center gap-3">
              <span className="text-sm ">{t('awaiting.sendDeposit')}</span>

              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {responseData?.exp_token1_amount ?? responseData?.token1_amount ?? 0}
                </span>
                <CurrencyButton
                  currencyToken={responseData.token1 ?? ''}
                  currencyTitle={responseData.token1_title ?? ''}
                  networkTitle={responseData.token1_network ?? ''}
                  opened={false}
                  onClick={() => {}}
                  showArrow={false}
                />
              </div>
            </div>
            <div className="w-full flex flex-wrap max-sm:flex-col gap-2">
              <div className="flex flex-wrap gap-1 gap-x-3 items-start flex-1 sm:gap-x-3">
                <div className="w-full flex flex-wrap gap-1 items-start justify-start">
                  <span className="text-sm">{t('awaiting.depositAddress')}</span>
                  <Input
                    variant="outlined"
                    className="rounded-md !bg-transparent !outline !outline-[1px] !outline-[#F0F1F5] lg:mx-3 !text-[#1B1B1B]"
                    placeholder={tExchange('walletAddress.placeholder')}
                    value={responseData.deposit_address}
                    size="large"
                    suffix={
                      <Tooltip title={t('awaiting.depositAddress')}>
                        {/* <CopyOutlined className="text-gray-400 cursor-pointer" /> */}
                        <Image
                          src="/icons/copy.svg"
                          width={20}
                          height={20}
                          alt="qr"
                          className="text-gray-400 cursor-pointer"
                          onClick={() => copyToClipboard(responseData.deposit_address)}
                        />
                      </Tooltip>
                    }
                  />
                  {/*                   <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">{responseData.deposit_address}</span>
                    <Tooltip title="Deposit address">
                      <Image
                        src="/icons/copy.svg"
                        width={20}
                        height={20}
                        alt="deposit"
                        className="text-gray-400 cursor-pointer ml-2"
                        onClick={() => copyToClipboard(responseData.deposit_address)}
                      />
                    </Tooltip>
                    <Image
                      src="/icons/qr.svg"
                      width={20}
                      height={20}
                      alt="qr"
                      className="text-gray-400 cursor-pointer ml-1"
                    />
                  </div> */}
                </div>
                {responseData.deposit_memo && (
                  <div className="w-full flex flex-wrap items-start gap-1 sm:gap-x-4 flex-1">
                    <span className="text-sm">{t('awaiting.memo')}</span>
                    {/* <QRCode bordered={false} value={responseData.deposit_memo} /> */}
                    <Input
                      variant="outlined"
                      className="rounded-md !bg-transparent !outline !outline-[1px] !outline-[#F0F1F5] lg:mx-3 !text-[#1B1B1B]"
                      placeholder={tExchange('memo.placeholder')}
                      value={responseData.deposit_memo}
                      size="large"
                      suffix={
                        <Tooltip title={t('awaiting.memo')}>
                          {/* <CopyOutlined className="text-gray-400 cursor-pointer" /> */}
                          <Image
                            src="/icons/copy.svg"
                            width={20}
                            height={20}
                            alt="Memo"
                            className="text-gray-400 cursor-pointer"
                            onClick={() => copyToClipboard(responseData.deposit_memo)}
                          />
                        </Tooltip>
                      }
                    />
                    {/*                     <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold">{responseData.deposit_memo}</span>
                      <Tooltip title="Deposit Memo">
                        <Image
                          src="/icons/copy.svg"
                          width={20}
                          height={20}
                          alt="memo"
                          className="text-gray-400 cursor-pointer ml-2"
                          onClick={() => copyToClipboard(responseData.deposit_memo)}
                        />
                      </Tooltip>
                      <Image
                        src="/icons/qr.svg"
                        width={20}
                        height={20}
                        alt="qr"
                        className="text-gray-400 cursor-pointer ml-1"
                      />
                    </div> */}
                  </div>
                )}
              </div>
              <QRCode
                className="border-none lg:mx-auto"
                bordered
                bgColor="#F0F1F5"
                value={responseData.deposit_address}
              />
            </div>
          </div>
        )}

        {(responseData.status === 2 || responseData.status === 3) && (
          <div className={`${styles.exchangeContainer} gap-3`}>
            <b className="text-xl">{t('confirming.title')}</b>
            {/* <p className="text-gray-400">Number of blockchain confirmations: 1</p> */}
          </div>
        )}

        {responseData.status === 4 && (
          <div className={`${styles.exchangeContainer} gap-3`}>
            <b className="text-xl">{t('exchanging.title')}</b>
            {/* <p className="text-gray-400">Your coins are safe and being exchanged</p> */}
          </div>
        )}

        {responseData.status === 5 && (
          <div className={`${styles.exchangeContainer} gap-3`}>
            <b className="text-xl">{t('sending.title')}</b>
            <p className="text-gray-400">{t('sending.desc')}</p>
          </div>
        )}
        {responseData.status === 6 && (
          <>
            <div className={`${styles.exchangeContainer} gap-3`}>
              <b className="text-xl">{t('completed.title')}</b>
              <div className="relative flex items-center w-full pb-4 pt-2">
                {/* Ліва частина */}
                <div
                  className={`${styles.coplatedResult} flex items-center gap-3 min-w-0 flex-1 justify-end pr-6`}>
                  <span className="truncate">{responseData.exp_token1_amount}</span>
                  <CurrencyButton
                  currencyToken={responseData.token2 ?? ''}
                  currencyTitle={responseData.token2_title ?? ''}
                  networkTitle={responseData.token2_network ?? ''}
                  opened={false}
                  onClick={() => {}}
                  showArrow={false}
                />
                </div>

                {/* Іконка по центру */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
                  <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.7266 5.43555L19.2907 10.9997L13.7266 16.5639"
                      stroke="#3460FD"
                      strokeWidth="1.375"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.70898 11H19.1365"
                      stroke="#3460FD"
                      strokeWidth="1.375"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Права частина */}
                <div
                  className={`${styles.coplatedResult} flex items-center gap-2 min-w-0 flex-1 justify-start pl-6`}>
                  <span className="max-w-[110px] truncate block">{responseData.exp_token2_amount}</span>
                  <CurrencyView
                    currency={{
                      symbol: responseData?.token2 ?? '',
                      value: ``,
                      network: responseData?.token2_network ?? '',
                      name: responseData?.token2_title ?? '',
                    }}
                  />
                </div>
              </div>

              <Link href={'/transfer'}>
                <Button size="large" color="blue" variant="solid">
                  {t('completed.startNewExchange')}
                </Button>
              </Link>

              <Link className="flex gap-2 bottom-0 w-full" href={'#'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="23"
                  viewBox="0 0 24 23"
                  fill="none">
                  <path
                    d="M22 5.89289V10.7014C22 11.8989 21.58 12.9077 20.83 13.6054C20.09 14.3126 19.02 14.7086 17.75 14.7086V16.4151C17.75 17.0563 16.99 17.4429 16.43 17.0846L15.46 16.4812C15.55 16.1889 15.59 15.8683 15.59 15.5289V11.6915C15.59 9.76805 14.23 8.48574 12.19 8.48574H5.39999C5.25999 8.48574 5.13 8.49519 5 8.50462V5.89289C5 3.4886 6.7 1.88574 9.25 1.88574H17.75C20.3 1.88574 22 3.4886 22 5.89289Z"
                    stroke="#7D7878"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.59 11.6911V15.5285C15.59 15.8679 15.55 16.1885 15.46 16.4808C15.09 17.8668 13.87 18.7342 12.19 18.7342H9.47L6.45 20.6294C6 20.9216 5.39999 20.6105 5.39999 20.1014V18.7342C4.37999 18.7342 3.53 18.4136 2.94 17.8574C2.34 17.2916 2 16.4902 2 15.5285V11.6911C2 9.89966 3.18 8.66451 5 8.50423C5.13 8.4948 5.25999 8.48535 5.39999 8.48535H12.19C14.23 8.48535 15.59 9.76766 15.59 11.6911Z"
                    stroke="#7D7878"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className={styles.submitFeedback}>
                  <span className="text-[#7D7878]">{t('feedback.prefix')}</span>
                  <span className="text-[#3460FD]">{` ${t('feedback.word')}`}</span>
                </p>
              </Link>
            </div>
          </>
        )}
        {/*  <div className="flex gap-2 justify-center items-center">
          <div className="font-bold">{responseData?.exp_exp_token1_amount}</div>
          <Image src={'/icons/coin.svg'} width={35} height={35} alt={responseData.token1} />
          <div>
            <p>{responseData?.token1_network ?? ''}</p>
            <p>{responseData?.token1 ?? ''}</p>
          </div>
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.7266 5.43555L19.2907 10.9997L13.7266 16.5639"
              stroke="#3460FD"
              strokeWidth="1.375"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.70703 11H19.1345"
              stroke="#3460FD"
              strokeWidth="1.375"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="font-bold">{responseData?.exp_token2_amount}</div>
          <Image src={'/icons/coin.svg'} width={35} height={35} alt={responseData.token1} />
          <div>
            <p>{responseData?.token2_network ?? ''}</p>
            <p>{responseData?.token2 ?? ''}</p>
          </div>
          </div> */}

        {/* You Send / You Get */}
        {responseData.status === 7 && (
          <div className={`${styles.exchangeContainer} w-full flex-1`}>
            <CurrencySelected
              fromAmount={`${responseData?.exp_token1_amount ?? 0}`}
              toAmount={`${responseData?.exp_token2_amount ?? 0}`}
              fromCurrency={{
                id: responseData?.token1 ?? '',
                name: responseData?.token1_network ?? '',
              }}
              toCurrency={{
                id: responseData?.token2 ?? '',
                name: responseData?.token2_network ?? '',
              }}
            />
          </div>
        )}

        {/* Status Block */}
        <div className={styles.exchangeContainer}>
          <div className="flex max-sm:w-full items-center justify-between sm:justify-center gap-[10px] sm:gap-20">
            {steps.map((step, index) => (
              <div key={`step_key_${step.code ?? index}`}>
                <div
                  className={`flex flex-col items-center justify-center  text-sm ${step.code === responseData.status ? ' text-[#3460FD]' : ''}
                ${step.code < responseData.status ? ' text-green-400' : ''} ${responseData.status === 7 ? '!text-red-500' : ''}`}>
                  {step.icon}
                  {step.label}
                </div>
                {step.code === responseData.status && (
                  <div className={styles.loaderWrapper}>
                    <div className={styles.loaderBar}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* You Send / You Get */}
        {responseData.status !== 7 && (
          <>
            {/*             <OperationDetails
              description="You send:"
              className={styles.exchangeContainer}
              recipientAdrress={responseData.address}
              tokenAmount={`${responseData?.exp_token1_amount ?? responseData?.token1_amount ?? 0}`}
              currencyName={responseData?.token1_title}
              currencySymbol={responseData.token1}
              networkSymbol={responseData.token1_network}
            /> */}
            <OperationDetails
              showTitle
              description={t('operation.youSend')}
              className={styles.exchangeContainer}
              recipientAdrress={responseData.address}
              depositeAdrress={responseData?.status === 2 ? responseData.deposit_address : undefined}
              tokenAmount={responseData?.exp_token1_amount ?? responseData?.token1_amount ?? 0}
              currencyName={responseData?.token1_title}
              currencySymbol={responseData.token1}
              networkSymbol={responseData.token1_network}
              hashIn={responseData.transactions?.in}
              hashOut={responseData.transactions?.out}
            />
          </>
        )}

        {responseData.status === 7 && (
          <div className={styles.exchangeContainer}>
            <div className={styles.statusOverdueWrapper}>
              <b className={styles.statusOverdueTitle}>{t('overdue.title')}</b>
              <p className={styles.statusOverdueDescription}>
                {t('overdue.desc')}
              </p>
            </div>
          </div>
        )}

        {/*         <div className={styles.exchangeContainer}>
          <div className="w-full mb-6">
            <p className="text-gray-700 mb-2 text-sm font-medium">Refund address</p>
            <Input
              placeholder="Filling in your wallet address for a refund is optional."
              value={refundAddress}
              onChange={(e) => setRefundAddress(e.target.value)}
              className="rounded-md border-gray-300 mb-2 ml-1"
              size="large"
            />
            <p className="text-xs text-gray-500">We recommend adding your wallet address for a refund</p>
          </div>

          <div className="w-full ">
            <p className="text-gray-700 mb-2 text-sm font-medium">Add Email</p>
            <Input
              placeholder="Receiving notifications about this exchange is optional."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border-gray-300 mb-2 ml-1"
              size="large"
            />
            <p className="text-xs text-gray-500">If you want to get notifications about this exchange.</p>
          </div>
          <Button className="mt-3" type="primary" variant="filled">
            Send
          </Button>
        </div> */}

        {/* Exchange Bloxk */}
        {/*  <div className={styles.exchangeContainer}>
          <h1 className="text-center text-xl font-medium mb-8 mt-10">Add exchange details</h1>

          Exchange Inputs
          <div className="w-full mb-8">
            <CurrencySelector className="bg-white" />
          </div>

          Wallet Address
          <div className="w-full mb-4">
            <p className="text-gray-700 mb-2 text-sm font-medium">Enter wallet address</p>
            <Input
              placeholder="Enter the recipient's address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="rounded-md border-gray-300"
              size="large"
              suffix={
                <Tooltip title="Qr">
                  <CopyOutlined className="text-gray-400 cursor-pointer" />
                  <Image
                    src="/icons/qr.svg"
                    width={20}
                    height={20}
                    alt="qr"
                    className="text-gray-400 cursor-pointer"
                  />
                </Tooltip>
              }
            />
          </div>

          Enter Memo address
          <div className="w-full mb-12">
            <p className="text-gray-700 mb-2 text-sm font-medium">Enter Memo address</p>
            <Input
              placeholder="Enter the recipient's address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="rounded-md border-gray-300"
              size="large"
              suffix={
                <Tooltip title="Qr">
                  <CopyOutlined className="text-gray-400 cursor-pointer" />
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

          Exchange Button
          <Button type="primary" size="large" block className="h-12 mb-4 bg-blue-500 hover:bg-blue-600">
            Exchange now
          </Button>

          Terms
          <p className="text-center text-xs text-gray-500 mb-8">
            I agree to the
            <a href="/privacy-policy" target="_blank" className="text-blue-500">
              Privacy Policy
            </a>
            and
            <a href="/temp-of-use" target="_blank" className="text-blue-500">
              Terms of Service
            </a>
            when I click
            <a href="#" className="text-gray-500">
              Create an exchange
            </a>
            .
          </p>
        </div>
         */}
      </div>
    );
}
