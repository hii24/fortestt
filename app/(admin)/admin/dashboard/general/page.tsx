'use client';
import React, { useCallback, useEffect, useState } from 'react';
// import CreateOrderModal from '@/app/(admin)/components/create-modal/createOrderModal';
import { EmptyResponse, ResponseList } from '@/types/response.interface';
import { AdminService } from '@/services/admin/admin.service';

import { GetWithdrawalItem, GetWithdrawalParams } from '@/types/withdrawal.interface';
import { Button, Input, Select } from 'antd';
import styles from './styles.module.css';

export default function HistoryPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [responseData, setResponseData] = useState<ResponseList<GetWithdrawalItem> | EmptyResponse | null>(
    null
  );

  const [currentParams, setCurrentParams] = useState({
    page: '1',
    page_size: '',
    search: '',
    status: '',
    withdrawal_id: '',
  });

  const fetchData = useCallback(async (params: GetWithdrawalParams) => {
    setIsLoading(true);
    try {
      const data = await AdminService.getAllWithdrawals(params);
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
    fetchData(currentParams);
  }, [fetchData, currentParams]);

  return (
    <div className="">
      {isLoading ? (
        <div>Loading</div>
      ) : responseData && 'count' in responseData && responseData?.count ? (
        <div className="flex flex-col gap-5">
          <div className={styles.header}>General</div>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <fieldset className={styles.fieldset}>
                <label>
                  <span>{'Free, % {fixed}'}</span>
                  <div className="flex gap-1">
                    <Input value={1.5} />
                    <Button className="px-2 rounded-[10px]" variant="solid" color="blue" size="large">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path
                          d="M4 12L8.94975 16.9497L19.5568 6.34314"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </div>
                </label>
              </fieldset>
              {/* float */}
              <fieldset className={styles.fieldset}>
                <label>
                  <span>{'Free, % {float}'}</span>
                  <div className="flex gap-1">
                    <Input value={1.5} />
                    <Button className="px-2 rounded-[10px]" variant="solid" color="blue" size="large">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path
                          d="M4 12L8.94975 16.9497L19.5568 6.34314"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </div>
                </label>
              </fieldset>
              {/* Risk Score, % */}
              <fieldset className={styles.fieldset}>
                <label>
                  <span>{'Risk Score, %'}</span>
                  <div className="flex gap-1">
                    <Input value={1.5} />
                    <Button className="px-2 rounded-[10px]" variant="solid" color="blue" size="large">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path
                          d="M4 12L8.94975 16.9497L19.5568 6.34314"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </div>
                </label>
              </fieldset>
            </div>
            <div className={styles.content}>
              <fieldset className={styles.fieldset}>
                <label>
                  <span>{'Default Amount'}</span>
                  <div className="flex gap-1">
                    <Input value={1.5} />
                    <Select
                      className={`${styles.customArrow} min-w-56`}
                      size="large"
                      placeholder="BTC"
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
                      onChange={(option) => {
                        setCurrentParams((prev) => ({ ...prev, token1: option }));
                      }}
                      options={[
                        { value: '', label: <span>BTC</span> },
                        { value: 'XRP', label: <span>XRP</span> },
                        { value: 'USDT', label: <span>USDT</span> },
                      ]}
                    />
                    <Select
                      className={`${styles.customArrow} min-w-56`}
                      size="large"
                      placeholder="BTC"
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
                      onChange={(option) => {
                        setCurrentParams((prev) => ({ ...prev, token1: option }));
                      }}
                      options={[
                        { value: '', label: <span>BTC</span> },
                        { value: 'XRP', label: <span>XRP</span> },
                        { value: 'USDT', label: <span>USDT</span> },
                      ]}
                    />
                    <Button className="px-2 rounded-[10px]" variant="solid" color="blue" size="large">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path
                          d="M4 12L8.94975 16.9497L19.5568 6.34314"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </div>
                </label>
              </fieldset>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-2xl">Loading General Error</p>
      )}
    </div>
  );
}
