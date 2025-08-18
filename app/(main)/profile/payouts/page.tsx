'use client';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.css';
import Breadcrumbs from '@/app/(main)/components/breadcrumbs/breadcrumbs';
import Image from 'next/image';
import AccordionWithOutCategory from '@/app/(main)/components/accordion/AccordionWithOutCategory';
import MobileSideBar from '@/app/(main)/components/mobileSideBar/mobileSideBar';
import ButtonLogout from '@/app/components/buttonLogout/buttonLogout';
import { UserService } from '@/services/user/user.service';
import { Button, DatePicker, DatePickerProps, Input, Modal, Select, Tooltip } from 'antd';
// import CurrencySelector from '../../components/exchange/CurrencySelector';
// import { CurrencyProps } from '@/types/coin.interface';
import { WithdrawalService } from '@/services/withdrawal/withdrawal.service';
import { CurrencyView } from '../../components/exchange/CurrencyView/CurrencyView';
import { debounce } from '@/utils/debounce';
import { useTranslations, useLocale } from 'next-intl';
import { CoinService } from '@/services/coin/coin.service';

const Page = () => {
  const t = useTranslations('profile');
  const tc = useTranslations('profile.common');
  const locale = useLocale();
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const currentDate = new Date();
  const formatedDate = {
    day: currentDate.getDate(),
    month: String(currentDate.getMonth() + 1).padStart(2, '0'),
    year: currentDate.getFullYear(),
    monthName: currentDate.toLocaleString(locale, { month: 'long' }),
  } as const;

  const monthStart = 1;
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const monthRangeLabel = `${t('payouts.cards.periodShort')} ${monthStart}-${monthEnd}${formatedDate.monthName}`;

  const [data, setData] = useState<{
    actual_balance: number;
    earned_month: number;
    earned_total: number;
  } | null>(null);

  useEffect(() => {
    try {
      UserService.getStatistic().then((data) => {
        console.log('statistic', data);
        setData(data);
      });
      // setList()
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onChangeStartDate: DatePickerProps['onChange'] = (_, dateString) => {
    console.log(dateString);
  };
  const onChangEndDate: DatePickerProps['onChange'] = (_, dateString) => {
    console.log(dateString);
  };

  const [openDateModal, setOpenDateModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<{ coin?: string[]; amount?: string[]; address: string[] } | null>(
    null
  );

  const [withdrawalAmount, setWithdrawalAmount] = useState<string>(`${data?.actual_balance ?? 0}`);
  const [withdrawalCurrency, setWithdrawalCurrency] = useState<string | null>('USDT');
  const [withdrawalAddress, setWithdrawalAddress] = useState<string>('');

  /*   interface CurrencyViewProps {
    currency?: {
      symbol: string;
      network: string;
      name?: string;
      value?: string;
    };
  } */

  const currencyOptions = [
    {
      value: 'USDT',
      label: <CurrencyView marginLeft="" currency={{ symbol: 'USDT', name: 'Tether', network: 'TRC20' }} />,
    },
    {
      value: 'BTC',
      label: <CurrencyView marginLeft="" currency={{ symbol: 'BTC', name: 'Bitcoin', network: 'BTC' }} />,
    },
    {
      value: 'XMR',
      label: <CurrencyView marginLeft="" currency={{ symbol: 'XMR', name: 'Monero', network: 'XMR' }} />,
    },
  ];

  const onRequest = async () => {
    if (isLoading) return;
    setIsLoading(true);
    console.log('withdrawalAddress', withdrawalAddress);

    const selectedCurrency = currencyOptions.find((c) => c.value === withdrawalCurrency);

    WithdrawalService.newWithdrawalRequest({
      address: withdrawalAddress,
      amount: +withdrawalAmount,
      coin: selectedCurrency?.value ?? '',
      memo: 'optional',
    })
      .then((data) => {
        if (data?.error) {
          setIsError({
            coin: data.error.coin?.map(String),
            amount: data.error.amount?.map(String),
            address: data.error.address?.map(String),
          });
        } else {
          setOpenModal(false);
        }
      })
      .catch((e) => console.log('e', e))
      .finally(() => {
        setIsLoading(false);
        // setOpenDateModal(false);
      });
  };

  const [isValid, setIsValid] = useState<boolean>(true);

  const debouncedValidate = useMemo(() => {
    const validate = async (addr: string) => {
      const selectedCurrency = currencyOptions.find((c) => c.value === withdrawalCurrency);

      const res = await CoinService.validateWallet({
        address: addr,
        currency_name: selectedCurrency?.value ?? 'USDT',
      });
      console.log('valid wallet', res?.is_valid);
      setIsValid(res?.is_valid ?? false);
    };

    return debounce(validate, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawalAmount, withdrawalAddress]);

  useEffect(() => {
    debouncedValidate(withdrawalAddress);
    return () => debouncedValidate.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawalAddress, withdrawalAmount]);

  return (
    <>
      <div className={styles.subContainer}>
        <Modal
          centered
          className="p-3"
          open={openDateModal}
          okText={tc('select')}
          onOk={() => {}}
          onCancel={() => {
            setOpenDateModal(false);
          }}>
          <DatePicker
            className="mx-2 mt-6 mb-2 w-full"
            placeholder={tc('selectStartDate')}
            variant="filled"
            color="blue"
            size="large"
            onChange={onChangeStartDate}
          />
          <DatePicker
            className="mx-2 w-full"
            placeholder={tc('selectEndDate')}
            variant="filled"
            color="blue"
            size="large"
            onChange={onChangEndDate}
          />
        </Modal>

        <Modal
          centered
          className="p-3"
          footer={
            <>
              {isLoading && <p className="text-center">{t('payouts.processing')}</p>}
              {isError && (
                <p className="text-center text-red-600 flex flex-col">
                  {isError?.coin && <span className="capitalize">{` ${t('payouts.errors.currency')}: ${isError.coin}`}</span>}
                  {isError?.amount && <span className="capitalize">{` ${t('payouts.errors.amount')}: ${isError.amount}`}</span>}
                  {isError?.address && <span className="capitalize">{` ${t('payouts.errors.address')}: ${isError.address}`}</span>}
                  {!isValid && (
                    <div className="text-xs pt-3 text-red-600">{t('payouts.errors.invalidWallet')}</div>
                  )}
                </p>
              )}

              <Button
                disabled={isLoading || !isValid || !!isError || Number(withdrawalAmount) === 0}
                onClick={() => {
                  onRequest();
                }}
                className="w-full mt-5"
                color="blue"
                variant="solid"
                size="large">
                {t('payouts.request.button')}
              </Button>
            </>
          }
          onCancel={() => {
            setOpenModal(false);
          }}
          open={openModal}>
          <h2 className={styles.requestModalTitle}>{t('payouts.request.title')}</h2>

          <form className="flex flex-col gap-5">
            {/*          <CurrencySelector
              amount={withdrawalAmount}
              currency={withdrawalCurrency}
              currencyListLimit={400}
              onAmountChange={(amount) => {
                setWithdrawalAmount(amount);
              }}
              onCurrencyChange={(currency) => setWithdrawalCurrency(currency)}
            /> */}
            <fieldset>
              <label className={styles.requestFormLabel}>{t('payouts.form.coin')}</label>
              <Select
                variant="filled"
                className="mr-2 w-full min-h-14 customSelect"
                size="large"
                defaultValue="USDT"
                onChange={(val: string) => setWithdrawalCurrency(val)}
                suffixIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none">
                    <path
                      d="M19.9201 9.41154L13.4001 15.9315C12.6301 16.7015 11.3701 16.7015 10.6001 15.9315L4.08008 9.41154"
                      stroke="#1B1B1B"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                options={currencyOptions}
              />
            </fieldset>
            <fieldset>
              <label className={styles.requestFormLabel}>{t('payouts.form.amount')}</label>
              <Input
                type="number"
                step={0.01}
                placeholder="0"
                onChange={(e) => {
                  setWithdrawalAmount(e.target.value);
                }}
                className="rounded-md border-gray-300 w-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
                size="large"
              />
            </fieldset>
            <fieldset>
              <label className={styles.requestFormLabel}>{t('payouts.form.address')}</label>
              <Input
                required
                placeholder={t('payouts.form.addressPlaceholder')}
                value={withdrawalAddress}
                onChange={({ currentTarget }) => {
                  setWithdrawalAddress(currentTarget.value);
                }}
                className="rounded-md border-gray-300 w-full"
                size="large"
                suffix={
                  <Tooltip title={t('payouts.form.qr')}>
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
            </fieldset>
          </form>
        </Modal>
        {isMobile && <Breadcrumbs />}
        {!isMobile && (
            <div className={styles.header}>
            <div className="headText">
              <p className="headerP">{t('payouts.header')}</p>
            </div>
            <button
              className={styles.dataPicker}
              onClick={() => {
                setOpenDateModal(true);
              }}>
              <p className={styles.textDataPicker}>{t('payouts.selectDateRange')}</p>
              {/* <Image src="/icons/down.svg" alt="arrow-down" height={15} width={15} className="dark:invert" /> */}
            </button>
          </div>
        )}
        {isMobile && (
          <div className="headText">
            <p className="headerP">{t('payouts.header')}</p>
            <Image src={'/icons/calendar.svg'} alt={'calendar search'} width={24} height={24}></Image>
          </div>
        )}
        {isMobile && <MobileSideBar />}
        {!isMobile && <Breadcrumbs />}
        <div className={styles.cardsRow}>
          {isMobile && (
            <div className={`${styles.card} ${styles.cardHeight}`}>
              <div className={styles.cardLeft}>
                <p className={styles.cardTitle}>{t('payouts.cards.actual')}</p>
                <h3 className={styles.cardValue}>{data ? `$ ${data.actual_balance}` : `$ 0`}</h3>
              </div>
              <div className={styles.cardRight}>
                <span className={styles.cardSub}>{t('payouts.cards.on')} {`${formatedDate.month} ${formatedDate.year}`}</span>
                <Image src="/icons/size.svg" alt="copy" height={20} width={20}></Image>
              </div>
            </div>
          )}
          <div className={`${styles.cardsContent} ${isExpanded ? styles.expanded : styles.collapsed}`}>
            <div className={styles.cardsCliped}>
              <div className={`${styles.card} ${styles.cliped}`}>
                <div className={styles.cardLeft}>
                  <p className={styles.cardTitle}>{t('payouts.cards.earnedMonth')}</p>
                  <h3 className={styles.cardValue}>{data ? `$ ${data.earned_month}` : `$ 0`}</h3>
                </div>
                <div className={styles.cardRight}>
                  <p className={styles.cardRightSub}>{monthRangeLabel}</p>
                  <Image src="/icons/size.svg" alt="copy" height={20} width={20}></Image>
                </div>
              </div>
              {!isMobile && (
                <div className={styles.horizontalSub}>
                  <div className={styles.horizontalLine}></div>
                </div>
              )}
              <div className={`${styles.card}  ${styles.clipedtwo}`}>
                <div className={styles.cardLeft}>
                  <p className={styles.cardTitle}>{t('payouts.cards.earnedTotal')}</p>
                  <h3 className={styles.cardValue}>{data ? `$ ${data.earned_total}` : `$ 0`}</h3>
                </div>
                <div className={styles.cardRight}>
                  <p className={styles.cardRightSub}>{`2021-${formatedDate.year}`}</p>
                  <Image src="/icons/size.svg" alt="copy" height={20} width={20}></Image>
                </div>
              </div>
            </div>
          </div>

          {!isMobile && (
            <div className={`${styles.card} ${styles.cardHeight}`}>
              <div className={styles.cardLeft}>
                <p className={styles.cardTitle}>{t('payouts.cards.actual')}</p>
                <h3 className={styles.cardValue}>{data ? `$ ${data.actual_balance}` : `$ 0`}</h3>
              </div>
              <div className={styles.cardRight}>
                <span className={styles.cardSub}>{t('payouts.cards.on')} {`${formatedDate.month}.${formatedDate.year}`}</span>
                <Image src="/icons/size.svg" alt="copy" height={20} width={20}></Image>
              </div>
            </div>
          )}

          {isMobile && (
            <div
              className={`${styles.upArrow} ${!isExpanded ? styles.collapsed : ''}`}
              onClick={toggleExpand}>
              <Image src="/icons/up.svg" alt="copy" height={24} width={24}></Image>
            </div>
          )}
        </div>

        {!isMobile && (
          <div className={styles.payoutsSection}>
            <div className={styles.availableForPayouts}>
              <div className="">
                <p className={styles.blockTitle}>{t('payouts.available.title')}</p>
                <h3 className={styles.blockValue}>
                  {data ? `$ ${data.actual_balance}` : `$ 0`}
                  <span className={styles.smallTag}>TRC20</span>
                </h3>
                <p className={styles.minimalInfo}>{t('payouts.available.min')}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpenModal(true);
                }}
                className={styles.withdrawButton}>
                {t('payouts.available.button')}
              </button>
            </div>
          </div>
        )}
        {isMobile && (
          <button
            onClick={() => {
              setOpenModal(true);
            }}
            className={styles.withdrawButton}>
            {t('payouts.available.button')}
          </button>
        )}
        <div className={styles.latestPayouts}>
          <h1>{t('payouts.latest.title')}</h1>
          <div className={styles.latestPayoutsTitle}>
            <h3 className={styles.blockTitleWindraw}>{t('payouts.latest.title')}</h3>
            <p className={styles.blockDescription}>{t('payouts.latest.desc')}</p>
            <button
              type="button"
              onClick={() => {
                setOpenModal(true);
              }}
              className={styles.withdrawButton}>
              {t('payouts.latest.button')}
            </button>
          </div>
        </div>
        <AccordionWithOutCategory></AccordionWithOutCategory>
        {isMobile && <ButtonLogout />}
      </div>
    </>
  );
};

export default Page;
