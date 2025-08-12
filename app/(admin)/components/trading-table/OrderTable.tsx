import React, { FC, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { Pagination } from 'antd';
import { Order } from '@/types/response.interface';
import { message, Tooltip } from 'antd';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useViewportPageSize } from '@/hooks/useViewportPageSize';

const OrderTable: FC<{
  total: number;
  list: Order[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize?: number;
  onDesiredPageSize?: (pageSize: number) => void;
}> = ({ total = 0, list = [], currentPage, setCurrentPage, pageSize, onDesiredPageSize }) => {
  const mainKeys = [
    'order_id',
    'order_time',
    'platform',
    'pair',
    'price',
    'amount',
    'filled',
    'total',
    'side',
    'order_type',
    'status',
    'fee',
  ];

  const extraKeys = Object.keys(list?.[0] ?? {}).filter((key) => !mainKeys.includes(key));

  if (total === 0) return null;

  const tableRef = useRef<HTMLTableElement | null>(null);

  const desiredPageSize = useViewportPageSize(tableRef as unknown as React.MutableRefObject<HTMLElement | null>, {
    storageKey: 'orderTablePageSize',
    // Static measurements to avoid initial layout jump
    topReservePx: 220,
    tableHeaderPx: 48,
    rowHeightPx: 60,
  });
  useEffect(() => {
    if (desiredPageSize && onDesiredPageSize) {
      onDesiredPageSize(desiredPageSize);
    }
  }, [desiredPageSize, onDesiredPageSize]);

  return (
    <>
      <div className="max-w-full  -mx-3 px-3">
      {/* <div className="max-w-full overflow-x-auto -mx-3 px-3"> */}
        <table className={styles.table} ref={tableRef}>
          <thead>
            <tr>
              {mainKeys.map((key) => (
                <th key={key} className="p-2 border text-left capitalize">
                  <span className="px-1">{key === 'order_time' ? 'Time' : key}</span>
                </th>
              ))}

              {extraKeys.map((key) => (
                <th key={`extra-${key}`} className="p-2 border text-left capitalize">
                  <span className="px-1">{key}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((order, index) => {
              const [extra, main] = Object.entries(order).reduce(
                ([inc, exc], [key, value]) => {
                  if (mainKeys.includes(key)) {
                    exc[key] = value;
                  } else {
                    inc[key] = value;
                  }
                  return [inc, exc];
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                [{}, {}] as [Record<string, any>, Record<string, any>]
              );

              return (
                <tr key={order.order_id || `row-${index}`} className="hover:bg-gray-50">
                  {mainKeys.map((key) => {
                    const value = main[key];
                    const baseClass = 'p-2 border';
                    const isNumeric = ['price', 'amount', 'filled', 'total', 'fee'].includes(key);
                    // const className = `${baseClass}${isNumeric ? ' text-center p-1' : ''}`;

                    if (key === 'order_time') {
                      const date = value ? new Date(value) : null;
                      const dateStr = date ? date.toLocaleDateString('ru-RU') : '-';
                      const timeStr = date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-';
                      return (
                        <td key={key} className={baseClass + ' text-center p-1'}>
                          <Tooltip title={value}>
                            <div className="flex flex-col items-center">
                              <span>{dateStr}</span>
                              <span>{timeStr}</span>
                            </div>
                          </Tooltip>
                        </td>
                      );
                    }
                    if (key === 'side') {
                      const isBuy = String(value).toLowerCase() === 'buy';
                      return (
                        <td key={key} className={`${baseClass} font-semibold uppercase`}>
                          <span
                            className={`px-2 py-1 rounded ${
                              isBuy ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                            }`}>
                            {value}
                          </span>
                        </td>
                      );
                    }
                    if (key === 'status') {
                      return (
                        <td key={key} className={baseClass}>
                          <span
                            className={`px-2 py-1 rounded uppercase ${
                              value === 'filled'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {value}
                          </span>
                        </td>
                      );
                    }

                    if (key === 'order_id' || key === 'exchange_id') {
                      return (
                        <td key={key} className={`${baseClass} text-left`}>
                          {value ? (
                            <span
                              className="cursor-pointer hover:underline"
                              onClick={async () => {
                                try {
                                  await copyToClipboard(String(value));
                                  message.success(`${key.replace('_', ' ').toUpperCase()} copied to clipboard!`);
                                } catch {
                                  message.error(`Failed to copy ${key.replace('_', ' ')}!`);
                                }
                              }}
                              title={`Click to copy ${key}`}
                            >
                              {String(value)}
                            </span>
                          ) : (
                            '-'
                          )}
                        </td>
                      );
                    }

                    return (
                      <td key={key} className={`${baseClass} text-left`}>
                        {isNumeric && value != null && value !== '' ? (
                          <Tooltip title={value}>
                            {Number(value).toFixed(2)}
                          </Tooltip>
                        ) : (
                          value ?? '-'
                        )}
                      </td>
                    );
                  })}
                  {Object.entries(extra).map(([key, value]) => (
                    <td key={key} className="p-2 border text-left">
                      {String(value)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={`${styles.paginationContainer} relative h-[48px] my-5`}>
        <Pagination
          style={{ background: 'var(--Background_blocks, #fffafa)' }}
          className="w-fit inline-block-0 px-3 py-2 rounded-xl"
          current={currentPage}
          onChange={(page) => setCurrentPage(page)}
          pageSize={pageSize}
          total={total}
        />
      </div>
    </>
  );
};

export default OrderTable;
