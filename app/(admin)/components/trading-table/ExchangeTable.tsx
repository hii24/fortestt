import { FC, ReactNode, useState } from 'react';
import styles from './styles.module.css';
import { ExchangeProcessStatus } from '@/config/status.config';
import { GetExchangesItem } from '@/types/exchange.interface';
import { Modal } from 'antd';

const ExchangeTable: FC<{
  list?: GetExchangesItem[];
  statusColors?: {
    waiting: string;
    confirmation: string;
    transferring: string;
    exchanging: string;
    sending: string;
    success: string;
    overdue: string;
    frozen: string;
    problematic: string;
    refunded: string;
  };
}> = ({
  list = [],
  statusColors = {
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
  },
}) => {
  const excludeKeys = [
    'unique_id',
    'status',
    'start_time',
    'end_time',
    'token1',
    'token1_network',
    'exp_token1_amount',
    'token2',
    'token2_network',
    'exp_token2_amount',
    'fixed',
    'volume',
    'profit',
    'partner_profit',
    'address',
    'deposit_address',
    'deposite',
    'terms',
  ];

  // const normalHeaders = Object.keys(list?.[0] ?? {}).filter((key) => !excludeKeys.includes(key));

  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title?: string; children?: ReactNode } | null>(null);

  return (
    <>
      <Modal
        open={openModal}
        footer={null}
        onCancel={() => {
          setOpenModal((prev) => !prev);
        }}>
        <div className="text-lg font-bold mb-3">{modalContent?.title}</div>
        {modalContent?.children}
      </Modal>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">ID</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">Status</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">time</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">info</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">volume</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">Type</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">Pair</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">Profit</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">Partner profit</span>
            </th>
            {/* {normalHeaders.map((key, index) => (
              <th key={`norm-${index}`} className="p-2 border text-left capitalize">
                {key}
              </th>
            ))} */}
          </tr>
        </thead>
        <tbody>
          {list.map((transaction, index) => {
            const [included, excluded] = Object.entries(transaction).reduce(
              ([inc, exc], [key, value]) => {
                if (excludeKeys.includes(key)) {
                  exc[key] = value;
                } else {
                  inc[key] = value;
                }
                return [inc, exc];
              },
              /* eslint-disable @typescript-eslint/no-explicit-any */
              [{}, {}] as [Record<string, any>, Record<string, any>]
            );

            const className = 'p-2 border';
            return (
              <tr key={`exch-${index}`} className="hover:bg-gray-50">
                <td className={`${className} min-w-fit`}>{excluded.unique_id}</td>

                <td className={`${className} min-w-fit`}>
                  <span
                    className={`px-2 py-1 rounded uppercase ${
                      ExchangeProcessStatus?.[excluded.status as keyof typeof ExchangeProcessStatus]
                        ? statusColors?.[
                            ExchangeProcessStatus?.[
                              excluded.status as keyof typeof ExchangeProcessStatus
                            ] as keyof typeof statusColors
                          ]
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {ExchangeProcessStatus?.[excluded.status as keyof typeof ExchangeProcessStatus] ??
                      `status_${excluded.status}`}
                  </span>
                </td>

                <td className={`${className} min-w-fit`}>
                  <div className="flex justify-center items-center">
                    {excluded.end_time || excluded.start_time
                      ? new Date(excluded.end_time ?? excluded.start_time).toLocaleString()
                      : '-'}
                  </div>
                </td>

                <td className={`${className} min-w-fit`}>
                  <button
                    className="pl-2"
                    type="button"
                    onClick={() => {
                      setModalContent({
                        title: `Other fields for : ${excluded?.unique_id ?? 'details'}`,
                        children: (
                          <div className="bg-[#F5F0F0] rounded-2xl p-3 mr-4">
                            {Object.entries(included)?.map(([key, value]) => (
                              <div key={key}>
                                <strong>{key}:</strong> {String(value)}
                              </div>
                            ))}
                          </div>
                        ),
                      });

                      setOpenModal((prev) => !prev);
                    }}>
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.25016 14.6666C11.9168 14.6666 14.9168 11.6666 14.9168 7.99992C14.9168 4.33325 11.9168 1.33325 8.25016 1.33325C4.5835 1.33325 1.5835 4.33325 1.5835 7.99992C1.5835 11.6666 4.5835 14.6666 8.25016 14.6666Z"
                        stroke="#7D7878"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.25 5.33325V8.66659"
                        stroke="#7D7878"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.24658 10.6667H8.25257"
                        stroke="#7D7878"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </td>

                <td className={`${className} min-w-fit`}>{excluded.volume}</td>
                <td className={`${className} min-w-fit`}>{excluded.fixed ? 'fixed' : 'float'}</td>

                <td className={className}>
                  {!!Object.keys(excluded)?.length && (
                    <div className="flex items-center min-w-[413px]">
                      <div className="flex flex-col gap-1 ">
                        <span>{`${excluded.exp_token1_amount} `}</span>
                        <div>
                          <span className="text-xs ">{`${excluded.token1}`}</span>
                          <span className="text-gray-500">{` (${excluded.token1_network})`}</span>
                        </div>
                        <span className="text-xs max-w-[180px] overflow-hidden whitespace-nowrap text-ellipsis">
                          {excluded.address}
                        </span>
                        <button
                          onClick={() => {
                            const view = {
                              Terms: excluded?.terms ? 'Confirmed' : 'NOT confirmed',
                              Address: excluded?.address ?? '-',
                            };
                            console.log('view', view);
                            setModalContent({
                              title: `Send : ${'details'}`,
                              children: (
                                <div className="bg-[#F5F0F0] rounded-2xl p-3 mr-4">
                                  {Object.entries(view)?.map(([key, value]) => (
                                    <div key={key}>
                                      <strong>{key}:</strong> {String(value)}
                                    </div>
                                  ))}
                                </div>
                              ),
                            });
                            setOpenModal((prev) => !prev);
                          }}>
                          <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M8.25016 14.6666C11.9168 14.6666 14.9168 11.6666 14.9168 7.99992C14.9168 4.33325 11.9168 1.33325 8.25016 1.33325C4.5835 1.33325 1.5835 4.33325 1.5835 7.99992C1.5835 11.6666 4.5835 14.6666 8.25016 14.6666Z"
                              stroke="#7D7878"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.25 5.33325V8.66659"
                              stroke="#7D7878"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.24658 10.6667H8.25257"
                              stroke="#7D7878"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <svg
                        className="mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none">
                        <path
                          d="M6.1 11.79L3 14.89L6.1 17.99"
                          stroke="#3460FD"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18 14.89H3"
                          stroke="#3460FD"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.9 9.21L18 6.11L14.9 3.01"
                          stroke="#3460FD"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 6.11H18"
                          stroke="#3460FD"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex flex-col gap-1">
                        <span>{`${excluded.exp_token2_amount} `}</span>
                        <div>
                          <span className="text-xs ">{`${excluded.token2}`}</span>
                          <span className="text-gray-500">{` (${excluded.token2_network})`}</span>
                        </div>
                        <span className="text-xs max-w-[180px] overflow-hidden whitespace-nowrap text-ellipsis">
                          {excluded.deposit_address}
                        </span>
                        <button
                          onClick={() => {
                            setModalContent({
                              title: `Get : ${'details'}`,
                              children: (
                                <div className="bg-[#F5F0F0] rounded-2xl p-3 mr-4">
                                  {Object.entries({
                                    'Deposite ID': excluded?.deposite ?? '-',
                                    'Deposite address': excluded?.deposit_address ?? '-',
                                  })?.map(([key, value]) => (
                                    <div key={key}>
                                      <strong>{key}:</strong> {String(value)}
                                    </div>
                                  ))}
                                </div>
                              ),
                            });

                            setOpenModal((prev) => !prev);
                          }}>
                          <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M8.25016 14.6666C11.9168 14.6666 14.9168 11.6666 14.9168 7.99992C14.9168 4.33325 11.9168 1.33325 8.25016 1.33325C4.5835 1.33325 1.5835 4.33325 1.5835 7.99992C1.5835 11.6666 4.5835 14.6666 8.25016 14.6666Z"
                              stroke="#7D7878"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.25 5.33325V8.66659"
                              stroke="#7D7878"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.24658 10.6667H8.25257"
                              stroke="#7D7878"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </td>
                <td className={`${className} min-w-fit`}>{excluded?.profit ?? '-'}</td>
                <td className={`${className} min-w-fit`}>{excluded?.partner_profit ?? '-'}</td>

                {/*                 {Object.entries(included).map(([key, value]) => {
                  value = value === '' || (!!value && value !== true) ? value : JSON.stringify(value);

                  if (key === 'buy_orders' || key === 'sell_orders') {
                    return (
                      <td key={key} className={className}>
                        <span>{value?.length ?? 0}</span>
                      </td>
                    );
                  }

                  return (
                    <td key={key} className={className}>
                      {value}
                    </td>
                  );
                })} */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ExchangeTable;

/* if (key === 'Pairs' && typeof value === 'object') {
  return (
    <td key={key} className={className}>
      <div className="flex items-center">
        <div>
          {value.Exchanges?.[0]}
          <br />
          <span className="text-xs text-gray-500">{value.From}</span>
        </div>
        <svg
          className="mx-2"
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none">
          <path
            d="M6.1 11.79L3 14.89L6.1 17.99"
            stroke="#3460FD"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 14.89H3"
            stroke="#3460FD"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.9 9.21L18 6.11L14.9 3.01"
            stroke="#3460FD"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 6.11H18"
            stroke="#3460FD"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div>
          {value.Exchanges?.[1]}
          <br />
          <span className="text-xs text-gray-500">{value.To}</span>
        </div>
      </div>
    </td>
  );
} */
