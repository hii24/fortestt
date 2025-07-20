import React, { FC } from 'react';
import styles from './styles.module.css';
import { Pagination } from 'antd';
import { Order } from '@/types/response.interface';

const TradingTable: FC<{
  total: number;
  list: Order[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
}> = ({ total = 0, list = [], currentPage, setCurrentPage }) => {
  if (total > 0)
    return (
      <>
        <div className="max-w-full overflow-x-auto -mx-3 px-3">
          <table className={styles.table}>
            <thead>
              <tr>
                {Object.keys(list?.at(0) ?? {}).map((th) => (
                  <th key={`th${th}`} className="p-2 border text-left capitalize">
                    {th}
                    {/* {th.replace(/^order_/, '')} */}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((transaction) => (
                <tr key={transaction.order_id} className="hover:bg-gray-50 ">
                  {Object.entries(transaction).map(([key, value]) => {
                    let className = 'p-2 border';

                    if (['price', 'amount', 'filled', 'total', 'fee'].includes(key)) {
                      className += ' text-right';
                    }

                    if (key === 'side') {
                      const isBuy = String(value).toLowerCase() === 'buy';
                      return (
                        <td key={key} className={`${className} font-semibold uppercase`}>
                          <span
                            className={`px-2 py-1 rounded ${isBuy ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {value}
                          </span>
                        </td>
                      );
                    }

                    if (key === 'status') {
                      return (
                        <td key={key} className={className}>
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
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`${styles.paginationContainer} relative h-[48px] my-5`}>
          <Pagination
            style={{ background: 'var(--Background_blocks, #fffafa)' }}
            className="w-fit inline-block-0 px-3 py-2 rounded-xl"
            current={currentPage}
            onChange={(page) => {
              setCurrentPage(page);
            }}
            total={total}></Pagination>
        </div>
      </>
    );
};

export default TradingTable;
