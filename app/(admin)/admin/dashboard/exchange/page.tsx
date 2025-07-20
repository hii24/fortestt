'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Select } from 'antd';
import { Button, DatePicker, DatePickerProps } from 'antd';
import ExchangeTable from '@/app/(admin)/components/trading-table/ExchangeTable';
// import CreateOrderModal from '@/app/(admin)/components/create-modal/createOrderModal';
import styles from './styles.module.css';
import { EmptyResponse, ResponseList } from '@/types/response.interface';
import { AdminService } from '@/services/admin/admin.service';
import { CustomPagination } from '@/app/components/paginations/CustomPagination';
import { SearchInput } from '@/app/components/SearchInput';
import { ExchangeProcessStatus } from '@/config/status.config';
import { GetExchangeParams, GetExchangesItem } from '@/types/exchange.interface';
import { CoinService } from '@/services/coin/coin.service';

const statusColors = {
  waiting: 'bg-yellow-100 text-yellow-400',
  confirmation: 'bg-yellow-100 text-yellow-500',
  transferring: 'bg-yellow-200 text-yellow-600',
  exchanging: 'bg-yellow-300 text-yellow-700',
  sending: 'bg-yellow-400 text-yellow-800',
  success: 'bg-green-100 text-green-800',
  overdue: 'bg-red-200 text-red-300',
  frozen: 'bg-blue-100 text-blue-800',
  problematic: 'bg-red-200 text-red-600',
  refunded: 'bg-violet-100 text-violet-800',
};

export default function HistoryPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [responseData, setResponseData] = useState<ResponseList<GetExchangesItem> | EmptyResponse | null>(
    null
  );

  const onChangeDate: DatePickerProps['onChange'] = (_, dateString) => {
    console.log(dateString);
    setCurrentParams((prevParams) => ({
      ...prevParams,
      page: '',
      date: dateString,
    }));
  };

  const setCurrentPage = (page: number = 1) => {
    setCurrentParams((prev) => ({ ...prev, page: `${page}` }));
  };

  const [currentParams, setCurrentParams] = useState({
    page: '',
    page_size: '50',
    status: '',
    token: '',
    token1: '',
    token1_network: '',
    token2: '',
    token2_network: '',
    unique_id: '',
    search: '',
  });

  const fetchData = useCallback(async (params: GetExchangeParams) => {
    setIsLoading(true);
    try {
      const data = await AdminService.getAllExchanges(params);
      if (!('status' in data && data.status === 500)) {
        setResponseData(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const statusOptions = [
    { value: 'all', label: <span className="text-sm font-medium">Status</span> },
    ...Object.entries(ExchangeProcessStatus).map(([key, status]) => ({
      value: key,
      label: (
        <span
          className={`uppercase text-sm font-medium px-2 mx-auto rounded-sm ${statusColors?.[status as keyof object] || ''}`}>
          {status}
        </span>
      ),
    })),
  ];

  useEffect(() => {
    fetchData(currentParams);
  }, [fetchData, currentParams]);

  const [coinList, setCoinList] = useState<{ label: string; value: string }[]>([]);
  const [searchToken1, setSearchToken1] = useState('');
  const [searchToken2, setSearchToken2] = useState('');

  const [debouncedSearchToken1, setDebouncedSearchToken1] = useState('');
  const [debouncedSearchToken2, setDebouncedSearchToken2] = useState('');

  // Функція отримання монет з урахуванням пошуку
  const fetchCoins = async (search = '') => {
    try {
      const data = await CoinService.getCoinsList({ page_size: 50, search });
      const list =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.results.map((tok: any) => ({
          value: tok.token,
          label: <span className="text-sm font-medium">{tok.token}</span>,
        })) || [];
      setCoinList(list);
    } catch (e) {
      console.error(e);
    }
  };

  // Debounce searchToken1
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchToken1(searchToken1), 300);
    return () => clearTimeout(handler);
  }, [searchToken1]);

  // Debounce searchToken2
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchToken2(searchToken2), 300);
    return () => clearTimeout(handler);
  }, [searchToken2]);

  // Fetch coins on debounced searchToken1
  useEffect(() => {
    fetchCoins(debouncedSearchToken1);
  }, [debouncedSearchToken1]);

  // Fetch coins on debounced searchToken2
  useEffect(() => {
    fetchCoins(debouncedSearchToken2);
  }, [debouncedSearchToken2]);

  return (
    <div>
      <div className={`items-center ${styles.filters}`}>
        <Select
          className={`${styles.customSelect}  mr-2 min-w-[160px]`}
          size="large"
          defaultValue={'all'}
          onChange={(option) => {
            setCurrentParams((prev) => ({ ...prev, status: option === 'all' ? '' : option }));
          }}
          options={statusOptions}
          suffixIcon={
            <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="4.5" width="1" height="15" fill="#1B1B1B" />
              <path
                d="M25.92 8.95L19.4 15.47C18.63 16.24 17.37 16.24 16.6 15.47L10.08 8.95"
                stroke="#1B1B1B"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <Select
          showSearch
          filterOption={false}
          className="mr-2 min-w-[140px] text-sm font-medium"
          size="large"
          value={currentParams.token1 || 'all'}
          suffixIcon={
            <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="4.5" width="1" height="15" fill="#1B1B1B" />
              <path
                d="M25.92 8.95L19.4 15.47C18.63 16.24 17.37 16.24 16.6 15.47L10.08 8.95"
                stroke="#1B1B1B"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          onSearch={setSearchToken1}
          onChange={(option) => {
            setCurrentParams((prev) => ({ ...prev, token1: option === 'all' ? '' : option }));
          }}
          options={[{ value: 'all', label: <span className="text-sm font-medium">Cur 1</span> }, ...coinList]}
        />

        <Select
          showSearch
          filterOption={false}
          className="mr-2 min-w-[140px] text-sm font-medium"
          size="large"
          value={currentParams.token2 || 'all'}
          suffixIcon={
            <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="4.5" width="1" height="15" fill="#1B1B1B" />
              <path
                d="M25.92 8.95L19.4 15.47C18.63 16.24 17.37 16.24 16.6 15.47L10.08 8.95"
                stroke="#1B1B1B"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          onSearch={setSearchToken2}
          onChange={(option) => {
            setCurrentParams((prev) => ({ ...prev, token2: option === 'all' ? '' : option }));
          }}
          options={[{ value: 'all', label: <span className="text-sm font-medium">Cur 2</span> }, ...coinList]}
        />

        <Select
          className="mr-2 min-w-[100px]"
          size="large"
          defaultValue="all"
          onChange={(option) => {
            setCurrentParams((prev) => ({ ...prev, token1_network: option }));
          }}
          options={[
            { value: 'all', label: <span className="text-sm font-medium">Net 1</span> },
            { value: 'TRC20', label: <span className="text-sm font-medium">TRC20</span> },
            { value: 'TRON', label: <span className="text-sm font-medium">TRON</span> },
            { value: 'ERC20', label: <span className="text-sm font-medium">ERC20</span> },
          ]}
          suffixIcon={
            <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="4.5" width="1" height="15" fill="#1B1B1B" />
              <path
                d="M25.92 8.95L19.4 15.47C18.63 16.24 17.37 16.24 16.6 15.47L10.08 8.95"
                stroke="#1B1B1B"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <Select
          className="mr-2 min-w-[100px]"
          size="large"
          defaultValue="all"
          onChange={(option) => {
            setCurrentParams((prev) => ({ ...prev, token2_network: option }));
          }}
          options={[
            { value: 'all', label: <span className="text-sm font-medium">Net 2</span> },
            { value: 'TRC20', label: <span className="text-sm font-medium">TRC20</span> },
            { value: 'TRON', label: <span className="text-sm font-medium">TRON</span> },
            { value: 'ERC20', label: <span className="text-sm font-medium">ERC20</span> },
          ]}
          suffixIcon={
            <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="4.5" width="1" height="15" fill="#1B1B1B" />
              <path
                d="M25.92 8.95L19.4 15.47C18.63 16.24 17.37 16.24 16.6 15.47L10.08 8.95"
                stroke="#1B1B1B"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <DatePicker
          className="mr-2 w-[160px]"
          size="large"
          onChange={onChangeDate}
          suffixIcon={null}
          prefix={
            <svg
              className="mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 2V5"
                stroke="#1B1B1B"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 2V5"
                stroke="#1B1B1B"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.2 21.4C19.9673 21.4 21.4 19.9673 21.4 18.2C21.4 16.4327 19.9673 15 18.2 15C16.4327 15 15 16.4327 15 18.2C15 19.9673 16.4327 21.4 18.2 21.4Z"
                stroke="#1B1B1B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 22L21 21"
                stroke="#1B1B1B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 9.08997H20.5"
                stroke="#1B1B1B"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.37 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5V13"
                stroke="#1B1B1B"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.9955 13.7H12.0045"
                stroke="#1B1B1B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.29431 13.7H8.30329"
                stroke="#1B1B1B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.29431 16.7H8.30329"
                stroke="#1B1B1B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <SearchInput
          size="large"
          className="mr-2 w-[180px]"
          placeholder="Search by ID"
          allowClear
          onDebouncedChange={(val) => {
            setCurrentParams((prev) => ({ ...prev, page: '', search: val }));
          }}
        />

        <Button size="large" className="mr-2 !h-10 w-10 px-1 rounded-[10px]" color="danger" variant="solid">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.08998 13.28H9.17998V20.48C9.17998 22.16 10.09 22.5 11.2 21.24L18.77 12.64C19.7 11.59 19.31 10.72 17.9 10.72H14.81V3.52002C14.81 1.84002 13.9 1.50002 12.79 2.76002L5.21998 11.36C4.29998 12.42 4.68998 13.28 6.08998 13.28Z"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <Button size="large" className="mr-2" color="green" variant="solid">
          DROP ANALYTIC
        </Button>
      </div>

      {isLoading ? (
        <div>Loading</div>
      ) : responseData && 'count' in responseData && responseData?.count ? (
        <>
          <div className="w-full overflow-x-auto">
            <ExchangeTable list={responseData?.results} />
          </div>
          <CustomPagination
            total={responseData?.count}
            currentPage={Number(currentParams?.page ?? 1)}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <p className="text-2xl">No Items</p>
      )}
    </div>
  );
}
