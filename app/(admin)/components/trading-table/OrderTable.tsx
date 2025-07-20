import React, { FC } from 'react';
import styles from './styles.module.css';
import { Pagination } from 'antd';
import { Order } from '@/types/response.interface';

const OrderTable: FC<{
  total: number;
  list: Order[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
}> = ({ total = 0, list = [], currentPage, setCurrentPage }) => {
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

  return (
    <>
      <div className="max-w-full overflow-x-auto -mx-3 px-3">
        <table className={styles.table}>
          <thead>
            <tr>
              {mainKeys.map((key) => (
                <th key={key} className="p-2 border text-left capitalize">
                  <span className="px-1">{key}</span>
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
                    const className = `${baseClass}${isNumeric ? ' text-right' : ''}`;

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

                    return (
                      <td key={key} className={className}>
                        {value ?? '-'}
                      </td>
                    );
                  })}
                  {Object.entries(extra).map(([key, value]) => (
                    <td key={key} className="p-2 border">
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
          total={total}
        />
      </div>
    </>
  );
};

export default OrderTable;
