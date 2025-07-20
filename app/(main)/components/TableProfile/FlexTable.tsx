import { FC, useState } from 'react';
import { ExchangeProcessStatus } from '@/config/status.config';
import { Modal } from 'antd';
import styles from './styles.module.css';

// Mock data similar to the screenshot

const FlexTable: FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list?: any[];

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
    'id',
    'unique_id',
    'status',
    'token1',
    'token1_amount',
    'token2',
    'token2_amount',
    'fixed',
    'start_time',
    'end_time',
    'partner_profit',
    '',
    // 'deposit_address', 'address'
  ];

  // const normalHeaders = Object.keys(list?.[0] ?? {}).filter((key) => !excludeKeys.includes(key));

  const [openModal, setOpenModal] = useState(false);
  // const [modalContent, setModalContent] = useState<{ title?: string } | null>(null);

  return (
    <>
      <Modal
        open={openModal}
        footer={null}
        onCancel={() => {
          setOpenModal((prev) => !prev);
        }}>
        {/* <div className="bg-[#F5F0F0] rounded-2xl p-3 mr-4">{modalContent?.title}</div> */}
      </Modal>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">ID</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">date/time</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">Type</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">From</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1"></span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">To</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">Profit</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">Status</span>
            </th>
            {/*       {normalHeaders.map((key, index) => (
              <th key={`norm-${index}`} className="p-2 border text-left capitalize">
                {key}
              </th>
            ))} */}
          </tr>
        </thead>
        <tbody>
          {list.map((transaction, index) => {
            // eslint-disable-next-line
            const [_, excluded] = Object.entries(transaction).reduce(
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
              <tr key={`exch-${index}`} className="hover:bg-gray-50 ">
                <td className={`${className} min-w-fit`}>{excluded.unique_id}</td>
                <td className={`${className} min-w-fit`}>
                  <div className="flex justify-center items-center">
                    {excluded?.start_time ? new Date(excluded.start_time).toLocaleString() : '—'}
                  </div>
                </td>
                <td className={`${className} min-w-fit`}>{`${excluded?.fixed ? 'fix' : 'float'}`}</td>
                <td className={className}>
                  {!!Object.keys(excluded)?.length && (
                    <div className="flex items-center">
                      <div className="flex flex-col justify-end items-end">
                        <span>{`${excluded.token1_amount}`}</span>
                        <span className="text-xs text-gray-500">{`${excluded?.token1}`}</span>
                      </div>
                    </div>
                  )}
                </td>
                <td className={className}>
                  <div className="flex items-center">
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
                  </div>
                </td>
                <td className={className}>
                  {!!Object.keys(excluded)?.length && (
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <span>{`${excluded.token2_amount}`}</span>
                        <span className="text-xs text-gray-500">{`${excluded.token2}`}</span>
                      </div>
                    </div>
                  )}
                </td>

                <td className={`${className} min-w-fit`}>{excluded.partner_profit ?? '-'}</td>

                <td className={`${className} min-w-fit`}>
                  <span
                    className={`px-2 py-1 rounded uppercase ${
                      ExchangeProcessStatus?.[excluded.status as keyof typeof ExchangeProcessStatus]
                        ? statusColors?.[
                            ExchangeProcessStatus?.[
                              excluded.status as keyof typeof ExchangeProcessStatus
                            ] as keyof typeof statusColors
                          ]
                        : statusColors?.[ExchangeProcessStatus?.[6] as keyof typeof statusColors]
                    }`}>
                    {ExchangeProcessStatus?.[excluded.status as keyof typeof ExchangeProcessStatus] ??
                      `${excluded?.status ?? 'success'}`}
                  </span>
                </td>

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

export default FlexTable;

/*     <div className={styles.wrapper}>
      <div className={styles.tableHeader}>
        <div>Time</div>
        <div>Sum</div>
        <div>Coin</div>
        <div>Network</div>
        <div>Status</div>
        <div>Memo</div>
        <div>Address</div>
      </div>

      <div className={styles.tableRow}>
        <div>Nothing Found</div>
      </div>
    </div> */
