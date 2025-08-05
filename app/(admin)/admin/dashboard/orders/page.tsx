'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, DatePicker, DatePickerProps, Select } from 'antd';
import CreateOrderModal from '@/app/(admin)/components/create-modal/createOrderModal';
import ManualUpdateModal from '@/app/(admin)/components/create-modal/ManualUpdateModal';
import styles from './styles.module.css';
import { AdminService } from '@/services/admin/admin.service';
import { Order, ResponseList } from '@/types/response.interface';
import { SearchInput } from '@/app/components/SearchInput';
import { OrderParams } from '@/types/order.interface';
import { CoinService } from '@/services/coin/coin.service';
import OrderTable from '@/app/(admin)/components/trading-table/OrderTable';
import { OrderProcessStatus } from '@/config/status.config';

const statusColors = {
  filled: 'bg-green-100 text-green-800',
};

export default function HistoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOrderCreated = () => {
    // Обновляем список ордеров после создания нового
    fetchData(currentParams);
  };

  const handleOpenModal2 = () => {
    setIsModal2Open(true);
  };

  const handleCloseModal2 = () => {
    setIsModal2Open(false);
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orderData, setOrderData] = useState<ResponseList<Order> | null>(null);

  const [currentParams, setCurrentParams] = useState<OrderParams>({
    page: 1,
    // page_size: 50,
    page_size: 500,
    status: '',
    pair: '',
    search: '',
  });

  const setCurrentPage = (page: number = 1) => {
    setCurrentParams((prev) => ({ ...prev, page: page }));
  };

  const [pair, setPair] = useState({
    first: '',
    second: '',
  });

  const handleTokenChange = (key: 'first' | 'second', option: string) => {
    const updatedPair = {
      ...pair,
      [key]: option,
    };

    setPair(updatedPair);

    if (updatedPair.first && updatedPair.second) {
      const pairValue =
        updatedPair.first === 'all' && updatedPair.second === 'all'
          ? 'all'
          : updatedPair.first !== 'all' && updatedPair.second !== 'all'
            ? `${updatedPair.first}_${updatedPair.second}`
            : '';

      setCurrentParams((prev) => ({
        ...prev,
        pair: pairValue,
        token1: updatedPair.first === 'all' ? '' : updatedPair.first,
        token2: updatedPair.second === 'all' ? '' : updatedPair.second,
      }));
    }
  };

  const onChangeDate: DatePickerProps['onChange'] = (_, dateString) => {
    console.log(dateString);
    setCurrentParams((prevParams) => ({
      ...prevParams,
      date: dateString,
    }));
  };

  const fetchData = useCallback(async (params: OrderParams) => {
    setIsLoading(true);
    try {
      const data = await AdminService.getOrders(params);
      setOrderData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentParams);
  }, [fetchData, currentParams]);

  const statusOptions = [
    { value: 'all', label: <span className="text-sm font-medium">Status</span> },
    ...Object.entries(OrderProcessStatus).map(([key, status]) => ({
      value: key,
      label: (
        <span
          className={`uppercase text-sm font-medium px-2 mx-auto rounded-sm ${statusColors?.[status as keyof object] || ''}`}>
          {status}
        </span>
      ),
    })),
  ];

  const [coinList, setCoinList] = useState<{ value: string; label: string | Element }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const fetchCoins = async (search = '') => {
    try {
      const data = await CoinService.getCoinsList({ page_size: 50, search });
      // const data = await CoinService.getCoinsList({ search });
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

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    fetchCoins(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="">
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
          onSearch={setSearchTerm} // встановлюємо searchTerm, debounce обробить виклик fetchCoins
          className={'mr-2 min-w-[150px] text-sm font-medium'}
          size="large"
          defaultValue="all"
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
          onChange={(option) => handleTokenChange('first', option)}
          options={[
            { value: 'all', label: <span className="text-sm font-medium">Currency 1</span> },
            ...coinList,
          ]}
        />

        <Select
          showSearch
          filterOption={false}
          onSearch={setSearchTerm} // для другого селекта теж debounce працює через searchTerm
          className={'mr-2 min-w-[150px] text-sm font-medium'}
          size="large"
          defaultValue="all"
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
          onChange={(option) => handleTokenChange('second', option)}
          options={[
            { value: 'all', label: <span className="text-sm font-medium">Currency 2</span> },
            ...coinList,
          ]}
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
            setCurrentParams((prev) => ({ ...prev, page: 1, search: val }));
          }}
        />

        <Button size="large" className="mr-2" color="danger" variant="solid" onClick={handleOpenModal2}>
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
        <Button size="large" className="mr-2" color="primary" variant="solid" onClick={handleOpenModal}>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.5 22H21.5"
              stroke="#F0F1F5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.09998 8.38H4.5C3.95 8.38 3.5 8.83 3.5 9.38V18C3.5 18.55 3.95 19 4.5 19H6.09998C6.64998 19 7.09998 18.55 7.09998 18V9.38C7.09998 8.83 6.64998 8.38 6.09998 8.38Z"
              stroke="#F0F1F5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.3 5.18994H11.7C11.15 5.18994 10.7 5.63994 10.7 6.18994V17.9999C10.7 18.5499 11.15 18.9999 11.7 18.9999H13.3C13.85 18.9999 14.3 18.5499 14.3 17.9999V6.18994C14.3 5.63994 13.85 5.18994 13.3 5.18994Z"
              stroke="#F0F1F5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.5 2H18.9C18.35 2 17.9 2.45 17.9 3V18C17.9 18.55 18.35 19 18.9 19H20.5C21.05 19 21.5 18.55 21.5 18V3C21.5 2.45 21.05 2 20.5 2Z"
              stroke="#F0F1F5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Create
        </Button>
      </div>

      {isLoading ? (
        <div>Loading</div>
      ) : orderData?.count ? (
        <OrderTable
          total={Number(orderData?.count)}
          list={orderData?.results ?? []}
          currentPage={currentParams?.page ?? 1}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <p className="text-2xl">No Items</p>
      )}

      <CreateOrderModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onCreateSuccess={handleOrderCreated}
      />
      <ManualUpdateModal isOpen={isModal2Open} onClose={handleCloseModal2} />
    </div>
  );
}
