'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Select } from 'antd';
import { Button, DatePicker, DatePickerProps } from 'antd';
// import CreateOrderModal from '@/app/(admin)/components/create-modal/createOrderModal';
import styles from './styles.module.css';
import { EmptyResponse, ResponseList } from '@/types/response.interface';
import { AdminService } from '@/services/admin/admin.service';
import { CustomPagination } from '@/app/components/paginations/CustomPagination';
import { SearchInput } from '@/app/components/SearchInput';
import { ExchangeProcessStatus } from '@/config/status.config';
import { GetWithdrawalItem } from '@/types/withdrawal.interface';
// import { CoinService } from '@/services/coin/coin.service';
import DepositTable from '@/app/(admin)/components/trading-table/DepositTable';
import { DepositeParams } from '@/types/order.interface';

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
  const [responseData, setResponseData] = useState<ResponseList<GetWithdrawalItem> | EmptyResponse | null>(
    null
  );
  const [desiredPageSize, setDesiredPageSize] = useState<number | undefined>(undefined);

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
    page: '1',
    page_size: '50',
    search: '',
    status: '',
    deposit_id: '',
    coin: '',
  });

  const fetchData = useCallback(async (params: DepositeParams) => {
    setIsLoading(true);
    try {
      const data = await AdminService.getAllDeposits(params);
      if (!('status' in data && data.status === 204)) {
        setResponseData(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchData(currentParams as any);
  }, [fetchData, currentParams]);

  useEffect(() => {
    if (desiredPageSize && String(desiredPageSize) !== currentParams.page_size) {
      setCurrentParams((prev) => ({ ...prev, page_size: String(desiredPageSize), page: '1' }));
    }
  }, [desiredPageSize, currentParams.page_size]);

  // const [coinList, setCoinList] = useState<{ label: string; value: string | Element }[]>([]);

  /*   useEffect(() => {
    CoinService.getCoinsList({ page_size: 295 }).then((coinsData) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const list = coinsData?.results.map((tok: any) => ({
        value: tok.token,
        label: <span className="text-sm font-medium">{tok.token}</span>,
      }));
      setCoinList(list);
    });
  }, []); */

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

  return (
    <div className="">
      <div className={`items-center ${styles.filters}`}>
        <Select
          className={`${styles.customSelect}  mr-2 min-w-[200px]`}
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
      </div>

      {isLoading ? (
        <div>Loading</div>
      ) : responseData && 'count' in responseData && responseData?.count ? (
        <>
          <div className="w-full overflow-x-auto">
            <DepositTable list={responseData?.results} onDesiredPageSize={(size) => setDesiredPageSize(size)} />
          </div>
          <CustomPagination
            total={responseData?.count}
            currentPage={Number(currentParams?.page ?? 1)}
            setCurrentPage={setCurrentPage}
            pageSize={Number(currentParams.page_size)}
          />
        </>
      ) : (
        <p className="text-2xl">No Items</p>
      )}
    </div>
  );
}
