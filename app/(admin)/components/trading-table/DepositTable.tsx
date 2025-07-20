import { FC } from 'react';
import styles from './styles.module.css';
import { WithdrawalProcessStatus } from '@/config/status.config';
import { GetWithdrawalItem } from '@/types/withdrawal.interface';

const DepositTable: FC<{
  list?: GetWithdrawalItem[];
  statusColors?: {
    success: string;
  };
}> = ({
  list = [],
  statusColors = {
    success: 'bg-green-100 text-green-800',
  },
}) => {
  const excludeKeys: string[] = [
    // 'memo',
    // 'deposit_address', 'address'
  ];
  console.log('statusColors', statusColors);

  const normalHeaders = Object.keys(list?.[0] ?? {}).filter((key) => !excludeKeys?.includes(key));

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {normalHeaders.map((key, index) => (
            <th key={`norm-${index}`} className="p-2 border text-left capitalize">
              {key}
            </th>
          ))}
            </tr>
          </thead>
          <tbody>
            {list.map((transaction, index) => {
              const className = 'p-2 border';
              return (
                <tr key={`exch-${index}`} className="hover:bg-gray-50">
                  {Object.entries(transaction).map(([key, value]) => {
                    value = value === '' || (!!value && value !== true) ? value : JSON.stringify(value);

                    if (key === 'buy_orders' || key === 'sell_orders') {
                      return (
                        <td key={key} className={className}>
                          <span>{value?.length ?? 0}</span>
                        </td>
                      );
                    }

                    if (key === 'status') {
                      return (
                        <td key={key} className={`${className} min-w-fit`}>
                          <span
                            className={`px-2 py-1 rounded uppercase ${
                              /* WithdrawalProcessStatus?.[value as keyof typeof WithdrawalProcessStatus]
                                ? statusColors?.[
                                    WithdrawalProcessStatus?.[
                                      value as keyof typeof WithdrawalProcessStatus
                                    ] as keyof typeof statusColors
                                  ]
                            : */ 'bg-green-100 text-green-800'
                        }`}>
                        {WithdrawalProcessStatus?.[value as keyof typeof WithdrawalProcessStatus] ??
                          `${value}`}
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
          );
        })}
      </tbody>
    </table>
  );
};

export default DepositTable;
