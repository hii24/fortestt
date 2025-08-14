'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import Breadcrumbs from '@/app/(main)/components/breadcrumbs/breadcrumbs';
import MobileSideBar from '@/app/(main)/components/mobileSideBar/mobileSideBar';
import ButtonLogout from '@/app/components/buttonLogout/buttonLogout';
import { DatePicker, DatePickerProps, Modal } from 'antd';
import { ExchangeService } from '@/services/exchange/exchange.service';
import '@ant-design/v5-patch-for-react-19';

import FlexTable from '@/app/(main)/components/TableProfile/FlexTable';
import { CustomPagination } from '@/app/components/paginations/CustomPagination';
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations('profile');
  const tc = useTranslations('profile.common');
  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [responseData, setResponseData] = useState<any>(null); // TODO: створити точний тип замість any для data

  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);

  const onChangeStartDate: DatePickerProps['onChange'] = (_, dateString) => {
    console.log(dateString);
    setStartDate(dateString as string);
  };
  const onChangEndDate: DatePickerProps['onChange'] = (_, dateString) => {
    console.log(dateString);
    setEndDate(dateString as string);
  };

  useEffect(() => {
    if (loading) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await ExchangeService.getRefferralExchanges({
          page: 1,
          page_size: 20,
          start_time__gte: startDate,
          start_time__lte: endDate,
        });
        setResponseData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const setCurrentPage = (page: number = 1) => {
    setCurrentParams((prev) => ({ ...prev, page: `${page}` }));
  };

  const [currentParams, setCurrentParams] = useState({
    page: '',
    page_size: '',
    status: '',
    token: '',
    token1: '',
    token1_network: '',
    token2: '',
    token2_network: '',
    unique_id: '',
    search: '',
  });

  return (
    <>
      <div className={`${styles.subContainer}`}>
        {isMobile && (
          <>
            <Breadcrumbs />
            <div className="headText">
              <p className="headerP">{t('main.header')}</p>
              <button type="button" onClick={() => setOpenModal(true)}>
                <Image src={'/icons/calendar.svg'} alt={'calendar search'} width={24} height={24}></Image>
              </button>
            </div>
            <MobileSideBar></MobileSideBar>
          </>
        )}

        {!isMobile && (
          <>
            <input type="search" className={styles.search} placeholder={tc('search')} />
            <Breadcrumbs></Breadcrumbs>

            <div className={styles.buttonsTable}>
              <button
                onClick={() => {
                  setOpenModal(true);
                }}>
                {t('main.selectDateRange')}
                <Image src="/icons/arrowDownWhite.svg" alt="arrowDown" width={15} height={15}></Image>
              </button>

              {/*               <button
                onClick={() => {
                  setEndModal(true);
                }}>
                Select Finish Date
                <Image src="/icons/arrowDownWhite.svg" alt="arrowDown" width={15} height={15}></Image>
              </button> */}
            </div>
          </>
        )}

        <Modal
          className="p-3"
          open={openModal}
          onCancel={() => {
            setOpenModal(false);
          }}
          onOk={() => {
            setOpenModal(false);
          }}>
          <DatePicker
            className="mx-2 mt-6 mb-2 w-full"
            placeholder={t('common.selectStartDate')}
            variant="filled"
            color="blue"
            size="large"
            onChange={onChangeStartDate}
          />
          <DatePicker
            className="mx-2 w-full"
            placeholder={t('common.selectEndDate')}
            variant="filled"
            color="blue"
            size="large"
            onChange={onChangEndDate}
          />
        </Modal>

        <div className="mt-4 flex-1">
          {loading ? (
            <div>{tc('loading')}</div>
          ) : responseData && 'count' in responseData && responseData?.count ? (
            <>
              <div className="w-full overflow-x-auto">
                <FlexTable list={responseData.results} />
              </div>
              <CustomPagination
                total={responseData?.count}
                currentPage={Number(currentParams?.page ?? 1)}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <div className={styles.wrapper}>
              <div className={styles.tableHeader}>
                <div>{t('main.table.id')}</div>
                <div>{t('main.table.datetime')}</div>
                <div>{t('main.table.type')}</div>
                <div>{t('main.table.from')}</div>
                <div>{t('main.table.to')}</div>
                <div>{t('main.table.profit')}</div>
                <div>{t('main.table.status')}</div>
              </div>

              <div className={styles.tableRow}>
                <div>{t('main.table.nothingFound')}</div>
              </div>
            </div>
          )}
        </div>
        {isMobile && <ButtonLogout style={{ marginTop: 'auto' }} />}
      </div>
    </>
  );
};

export default Page;

/* const mockData = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 249,
      deposit: null,
      unique_id: 'hjc4mvheam8fd',
      fixed: true,
      token1: 'USDT',
      token1_network: 'ERC20',
      token2: 'TRX',
      token2_network: 'TRC20',
      address: 'TWvNqcNVuBqkXFLjPEv7gYLwSFqLR6E6dq',
      memo: '',
      node_deposit_address: '0x21F72652e5277Fe0F2f78761f08F25CaCA45e8a8',
      node_deposit_memo: '',
      deposit_address: '0x705c1c9ED054e004ae4134B7EF9684ED418292Ad',
      deposit_memo: null,
      start_time: '2025-06-03T18:09:55.553044+02:00',
      end_time: null,
      token1_amount: null,
      token2_amount: null,
      exp_token1_amount: 90.0,
      exp_token2_amount: 330.93370978351646,
      volume: 90.0,
      profit: null,
      partner_profit: null,
      is_stopped: false,
      support_email: '',
      withdraw_refund: '',
      note: '',
      referral: null,
      status: 7,
    },
  ],
}; */
