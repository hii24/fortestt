import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { WithdrawalProcessStatus } from '@/config/status.config';
import { GetWithdrawalItem } from '@/types/withdrawal.interface';
import { Tooltip, message, Modal } from 'antd';
import EyeIcon from './EyeIcon';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useViewportPageSize } from '@/hooks/useViewportPageSize';

const WithdrawalTable: FC<{
  list?: GetWithdrawalItem[];
  statusColors?: {
    success: string;
  };
  onDesiredPageSize?: (size: number) => void;
}> = ({
  list = [],
  statusColors = {
    success: 'bg-green-100 text-green-800',
  },
  onDesiredPageSize,
}) => {
  const excludeKeys: string[] = [
    'memo',
    // 'deposit_address', 'address'
  ];
  console.log('statusColors', statusColors);

  // Состояния для модального окна
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title?: string; children?: ReactNode } | null>(null);

  // Функция для форматирования адреса
  const formatAddress = (address?: string) => {
    if (!address) return '';
    if (address.length <= 8) return address;
    return `${address.slice(0, 4)}...${address.slice(address.length - 4)}`;
  };

  const normalHeaders = Object.keys(list?.[0] ?? {}).filter((key) => !excludeKeys?.includes(key));

  const handleCopy = async (label: string, value?: unknown) => {
    if (!value) return;
    try {
      await copyToClipboard(String(value));
      message.success(`${label} copied to clipboard!`);
    } catch {
      message.error(`Failed to copy ${label.toLowerCase()}!`);
    }
  };

  const tableRef = useRef<HTMLTableElement | null>(null);
  const desiredPageSize = useViewportPageSize(tableRef as unknown as React.MutableRefObject<HTMLElement | null>, {
    storageKey: 'withdrawalTablePageSize',
    topReservePx: 220,
    tableHeaderPx: 48,
    rowHeightPx: 32,
  });
  useEffect(() => {
    if (desiredPageSize && onDesiredPageSize) {
      onDesiredPageSize(desiredPageSize);
    }
  }, [desiredPageSize, onDesiredPageSize]);

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
      <table className={styles.table} ref={tableRef}>
        <thead>
          <tr>
            {normalHeaders.map((key, index) => (
              <th key={`norm-${index}`} className="p-2 border text-left">
                <span className="whitespace-nowrap">
                  {(() => {
                    const base = key.replace(/_/g, ' ');
                    const title = base.charAt(0).toUpperCase() + base.slice(1);
                    if (/_id$/.test(key)) return title.replace(/ id$/i, ' ID');
                    if (key === 'id') return 'ID';
                    if (key === 'txid') return 'TXID';
                    if (key === 'withdrawal_time') return 'Withdrawal time';
                    return title;
                  })()}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((transaction, index) => {
            const className = 'p-2 border text-left';
            return (
              <tr key={`exch-${index}`} className="hover:bg-gray-50">
                {Object.entries(transaction).map(([key, value]) => {
                  if (excludeKeys.includes(key)) return null;
                  value = value === '' || (!!value && value !== true) ? value : JSON.stringify(value);
                  const isNumeric = typeof value === 'number' || (!isNaN(Number(value)) && value !== '' && value !== null);

                  if (key === 'buy_orders' || key === 'sell_orders') {
                    return (
                      <td key={key} className={className}>
                        <span>{value?.length ?? 0}</span>
                      </td>
                    );
                  }
                  // Click-to-copy ID-like fields
                  if (key === 'withdrawal_id' || key === 'deposit_id' || key === 'exchange_id' || key === 'order_id' || key === 'id') {
                    return (
                      <td key={key} className={className}>
                        {value ? (
                          <span
                            className="cursor-pointer hover:underline"
                            onClick={() => handleCopy(key.replace('_', ' ').toUpperCase(), value)}
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

                  if (key === 'withdrawal_time') {
                    const date = value ? new Date(String(value)) : null;
                    return (
                      <td key={key} className={className}>
                        <Tooltip title={value != null && value !== '' ? String(value) : ''}>
                          <span>
                            {date
                              ? date.toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                })
                              : '-'}
                          </span>
                        </Tooltip>
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

                  // Обработка txid
                  if (key === 'txid') {
                    return (
                      <td key={key} className={className}>
                        <div className="flex items-center gap-1">
                          <Tooltip title={value != null && value !== '' ? String(value) : ''}>
                            <span
                              className="text-xs cursor-pointer"
                              style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                display: 'inline-block',
                              }}
                              onClick={async () => {
                                if (value && value !== '') {
                                  try {
                                    await copyToClipboard(String(value));
                                    message.success('TXID copied to clipboard!');
                                  } catch {
                                    message.error('Failed to copy TXID!');
                                  }
                                }
                              }}>
                              {formatAddress(value)}
                            </span>
                          </Tooltip>
                          <button
                            onClick={() => {
                              if (value && value !== '') {
                                setModalContent({
                                  title: 'TXID Details',
                                  children: (
                                    <div className="bg-[#F5F0F0] rounded-2xl p-3 mr-4">
                                      <div>
                                        <strong>TXID:</strong> {String(value)}
                                      </div>
                                    </div>
                                  ),
                                });
                                setOpenModal(true);
                              }
                            }}>
                            <EyeIcon size={16} />
                          </button>
                        </div>
                      </td>
                    );
                  }

                  // Обработка address
                  if (key === 'address') {
                    return (
                      <td key={key} className={className}>
                        <div className="flex items-center gap-1">
                          <Tooltip title={value != null && value !== '' ? String(value) : ''}>
                            <span
                              className="text-xs cursor-pointer"
                              style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                display: 'inline-block',
                              }}
                              onClick={async () => {
                                if (value && value !== '') {
                                  try {
                                    await copyToClipboard(String(value));
                                    message.success('Address copied to clipboard!');
                                  } catch {
                                    message.error('Failed to copy address!');
                                  }
                                }
                              }}>
                              {formatAddress(value)}
                            </span>
                          </Tooltip>
                          <button
                            onClick={() => {
                              if (value && value !== '') {
                                setModalContent({
                                  title: 'Address Details',
                                  children: (
                                    <div className="bg-[#F5F0F0] rounded-2xl p-3 mr-4">
                                      <div>
                                        <strong>Address:</strong> {String(value)}
                                      </div>
                                    </div>
                                  ),
                                });
                                setOpenModal(true);
                              }
                            }}>
                            <EyeIcon size={16} />
                          </button>
                        </div>
                      </td>
                    );
                  }

                  return (
                    <td key={key} className="p-2 border text-left">
                      {isNumeric && value !== '' && value !== null ? (
                        <Tooltip title={value}>
                          {Number(value).toFixed(2)}
                        </Tooltip>
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default WithdrawalTable;
