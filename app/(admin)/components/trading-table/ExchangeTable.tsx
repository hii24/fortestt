import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { ExchangeProcessStatus } from '@/config/status.config';
import { GetExchangesItem } from '@/types/exchange.interface';
import { Modal, message } from 'antd';
import { Tooltip } from 'antd';
import EyeIcon from './EyeIcon';
import InfoIcon from './InfoIcon';
import ManualUpdateModal from '../create-modal/ManualUpdateModal';
import { ExchangeService } from '@/services/exchange/exchange.service';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useViewportPageSize } from '@/hooks/useViewportPageSize';

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
  onExchangeUpdated?: () => void;
  onDesiredPageSize?: (size: number) => void;
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
  onExchangeUpdated,
  onDesiredPageSize,
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
    'withdraw_refund',
    'support_email',
  ];

  // const normalHeaders = Object.keys(list?.[0] ?? {}).filter((key) => !excludeKeys.includes(key));

  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title?: string; children?: ReactNode } | null>(null);
  
  // Состояния для hover кнопок и модалки manual update
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [isManualUpdateOpen, setIsManualUpdateOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<GetExchangesItem | undefined>(undefined);

  // Функция для форматирования адреса
  const formatAddress = (address?: string) => {
    if (!address) return '';
    if (address.length <= 8) return address;
    return `${address.slice(0, 4)}...${address.slice(address.length - 4)}`;
  };

  // Функция для форматирования числового значения пары (до 8 знаков после запятой)
  const formatPairNumber = (value: number | string | null | undefined) => {
    if (value == null) return '';
    const num = Number(value);
    if (isNaN(num)) return String(value);
    return num.toFixed(8);
  };

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
    storageKey: 'exchangeTablePageSize',
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
            <th className="p-2 border text-left capitalize">
              <span className="px-1">ID</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">Status</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">Time</span>
            </th>
            <th className="p-2 border text-center capitalize">
              <span className="px-1">info</span>
            </th>
            <th className="p-2 border text-right capitalize">
              <span className="px-1">volume</span>
            </th>
            <th className="p-2 border text-left capitalize">
              <span className="px-1">Type</span>
            </th>
            <th className="p-2 border text-center capitalize">
              <span className="px-1">Pair</span>
            </th>
            <th className="p-2 border text-right capitalize">
              <span className="px-1">Profit</span>
            </th>
            <th className="p-2 border text-right capitalize">
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
            const [, excluded] = Object.entries(transaction).reduce(
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
            console.log(list);
            const className = 'p-2 border';
            return (
              <tr 
                key={`exch-${index}`} 
                className="hover:bg-gray-50 relative"
                onMouseEnter={() => setHoveredRowIndex(index)}
                onMouseLeave={() => setHoveredRowIndex(null)}>
                <td className={`${className} min-w-fit text-left`}>
                  <div className="flex flex-col items-start">
                    {excluded.unique_id ? (
                      <span
                        className="cursor-pointer hover:underline"
                        onClick={() => handleCopy('Exchange ID', excluded.unique_id)}
                        title="Click to copy Exchange ID"
                      >
                        {excluded.unique_id}
                      </span>
                    ) : (
                      '-'
                    )}
                    {excluded.support_email && excluded.support_email !== '-' && String(excluded.support_email).trim() !== '' && (
                      <span className="text-xs text-gray-500 mt-1 break-all">
                        {String(excluded.support_email)}
                      </span>
                    )}
                  </div>
                </td>

                <td className={`${className} min-w-fit text-left`}>
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

                <td className={`${className} min-w-fit text-left`}>
                  <div className="flex justify-start items-center">
                    {excluded.end_time || excluded.start_time ? (
                      <Tooltip title={excluded.end_time ?? excluded.start_time}>
                        <div className="flex flex-col items-start">
                          <span>{new Date(excluded.end_time ?? excluded.start_time).toLocaleDateString('ru-RU')}</span>
                          {/* time intentionally omitted per latest requirements */}
                        </div>
                      </Tooltip>
                    ) : (
                      '-'
                    )}
                  </div>
                </td>

                <td className={`${className} min-w-fit text-center`}>
                  <InfoIcon
                    size={20}
                    className="hover:opacity-80 transition-opacity"
                    onClick={() => {
                      setModalContent({
                        title: 'Info',
                        children: (
                          <div className="bg-[#F5F0F0] rounded-2xl p-3 mr-4">
                            <div>
                              <strong>Address:</strong> {excluded?.address || '-'}
                            </div>
                           
                            <div>
                              <strong>Withdraw refund:</strong> {excluded?.withdraw_refund || '-'}
                            </div>
                            <div>
                              <strong>Support email:</strong> {excluded?.support_email || '-'}
                            </div>
                          </div>
                        ),
                      });
                      setOpenModal(true);
                    }}
                  />
                </td>

                <td className={`${className} min-w-fit text-right`}>
                  {excluded.volume != null ? Number(excluded.volume).toFixed(4) : '-'}
                </td>
                <td className={`${className} min-w-fit text-left`}>{excluded.fixed ? 'fixed' : 'float'}</td>

                <td className={`${className} text-left`}>
                  {!!Object.keys(excluded)?.length && (
                    <div className="flex items-center">
                      <div className="flex flex-col gap-1 " style={{ width: 120 }}>
                        <div className="flex items-center gap-1">
                          <Tooltip
                            title={
                              excluded.exp_token1_amount != null ? String(excluded.exp_token1_amount) : ''
                            }>
                            <span>{formatPairNumber(excluded.exp_token1_amount)}</span>
                          </Tooltip>
                          {/* Левый верхний глазик - Deposit Info */}
                          
                        </div>
                        <div className='flex items-center gap-1'>
                          <span className="text-xs ">{`${excluded.token1}`}</span>
                          <span className="text-gray-500">{` (${excluded.token1_network})`}</span>
                          <button
                            onClick={() => {
                              setModalContent({
                                title: 'Deposit Info',
                                children: (
                                  <div className="bg-[#F5F0F0] rounded-2xl p-3 mr-4">
                                    <div>
                                      <strong>Deposit ID:</strong>{' '}
                                      {excluded?.deposite ? (
                                        <span
                                          className="cursor-pointer hover:underline"
                                          onClick={() => handleCopy('Deposit ID', excluded.deposite)}
                                          title="Click to copy Deposit ID"
                                        >
                                          {excluded.deposite}
                                        </span>
                                      ) : (
                                        '-'
                                      )}
                                    </div>
                                    <div>
                                      <strong>Expected Deposit:</strong> {excluded.exp_token1_amount ?? '-'}
                                    </div>
                                    <div>
                                      <strong>Actual Deposit:</strong> {excluded.exp_token1_amount ?? '-'}
                                    </div>
                                  </div>
                                ),
                              });
                              setOpenModal(true);
                            }}>
                            <EyeIcon size={16} />
                          </button>
                        </div>
                        <div className="flex items-center gap-1 ">
                          <Tooltip
                            title={excluded.deposit_address != null ? String(excluded.deposit_address) : ''}>
                            <span
                              className="text-xs cursor-pointer flex items-center gap-1"
                              style={{
                               
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                display: 'inline-block',
                              }}
                              onClick={async () => {
                                if (excluded.deposit_address) {
                                  try {
                                    await copyToClipboard(String(excluded.deposit_address));
                                    message.success('Deposit address copied to clipboard!');
                                  } catch {
                                    message.error('Failed to copy deposit address!');
                                  }
                                }
                              }}>
                              {formatAddress(excluded.deposit_address)}
                              
                            </span>
                          </Tooltip>
                          {/* Правый нижний глазик - копирование адреса для вывода */}
                          <button
                                onClick={() => {
                                  if (excluded.deposit_address) {
                                    setModalContent({
                                      title: 'Deposit Address Details',
                                      children: (
                                        <div className="bg-[#F5F0F0] rounded-2xl p-3 mr-4">
                                          <div>
                                            <strong>Deposit Address:</strong> {String(excluded.deposit_address)}
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
                        
                        {/* MEMO для депозита если есть */}
                        {excluded.memo && <div className="text-xs text-gray-500">MEMO: {excluded.memo}</div>}
                      </div>
                      <svg
                        style={{
                          width: 22,
                          marginRight: 28,
                          marginLeft: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
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
                      <div className="flex flex-col gap-1" >
                        <div className="flex items-center gap-1">
                          <Tooltip
                            title={
                              excluded.exp_token2_amount != null ? String(excluded.exp_token2_amount) : ''
                            }>
                            <span>{formatPairNumber(excluded.exp_token2_amount)}</span>
                          </Tooltip>
                          {/* Правый верхний глазик - Withdrawal Info */}
                          
                        </div>
                        <div className='flex items-center gap-1'>
                          <span className="text-xs ">{`${excluded.token2}`}</span>
                          <span className="text-gray-500">{` (${excluded.token2_network})`}</span>
                          <button
                            onClick={() => {
                              setModalContent({
                                title: 'Withdrawal Info',
                                children: (
                                  <div className="bg-[#F5F0F0] rounded-2xl p-3 mr-4">
                                    <div>
                                      <strong>Withdrawal ID:</strong>{' '}
                                      {excluded?.unique_id ? (
                                        <span
                                          className="cursor-pointer hover:underline"
                                          onClick={() => handleCopy('Withdrawal ID', excluded.unique_id)}
                                          title="Click to copy Withdrawal ID"
                                        >
                                          {excluded.unique_id}
                                        </span>
                                      ) : (
                                        '-'
                                      )}
                                    </div>
                                    <div>
                                      <strong>Expected Withdrawal:</strong>{' '}
                                      {excluded.exp_token2_amount ?? '-'}
                                    </div>
                                    <div>
                                      <strong>Actual Withdrawal:</strong> {excluded.exp_token2_amount ?? '-'}
                                    </div>
                                  </div>
                                ),
                              });
                              setOpenModal(true);
                            }}>
                            <EyeIcon size={16} />
                          </button>
                        </div>
                        {/* Копирование адреса для вывода депозита */}
                        <div className="flex items-center gap-1">
                          <Tooltip title={excluded.address != null ? String(excluded.address) : ''}>
                            <span
                              className="text-xs cursor-pointer"
                              style={{
                               
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                display: 'inline-block',
                              }}
                              onClick={async () => {
                                if (excluded.address) {
                                  try {
                                    await copyToClipboard(String(excluded.address));
                                    message.success('Address copied to clipboard!');
                                  } catch {
                                    message.error('Failed to copy address!');
                                  }
                                }
                              }}>
                              {formatAddress(excluded.address)}
                             
                            </span>
                          </Tooltip>
                          <button
                                onClick={() => {
                                  if (excluded.address) {
                                    setModalContent({
                                      title: 'Address Details',
                                      children: (
                                        <div className="bg-[#F5F0F0] rounded-2xl p-3 mr-4">
                                          <div>
                                            <strong>Address:</strong> {String(excluded.address)}
                                          </div>
                                        </div>
                                      ),
                                    });
                                    setOpenModal(true);
                                  }
                                }}>
                                <EyeIcon size={16} />
                              </button>
                          {/* Левый нижний глазик - копирование депозитного адреса */}
                        </div>
                        {/* MEMO для вывода если есть */}
                        {excluded.withdrawal_memo && (
                          <div className="text-xs text-gray-500">MEMO: {excluded.withdrawal_memo}</div>
                        )}
                      </div>
                    </div>
                  )}
                </td>
                <td className={`${className} min-w-fit text-right`}>
                  {excluded?.profit != null ? Number(excluded.profit).toFixed(4) : '-'}
                </td>
                <td className={`${className} min-w-fit text-right relative`}>
                  {excluded?.partner_profit != null ? Number(excluded.partner_profit).toFixed(4) : '-'}
                  
                  {/* Hover кнопки */}
                  {hoveredRowIndex === index && (
                    <div 
                      className="absolute -bottom-1/4 transform -translate-y-1/2 flex"
                      style={{
                        gap: '4px',
                        width: '260px',
                        right: '-10px',
                        height: '37px',
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      {!transaction.is_stopped && (
                      <button
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '10px 40px',
                          gap: '10px',
                          width: '120px',
                          height: '37px',
                          background: '#FD3437',
                          borderRadius: '10px',
                          border: 'none',
                          fontFamily: 'Inter',
                          fontWeight: 500,
                          fontSize: '14px',
                          lineHeight: '17px',
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          textWrap: 'nowrap',
                          transition: 'background-color 0.2s ease'
                        }}
                        onClick={async () => {
                          try {
                            const result = await ExchangeService.stopExchange(excluded.unique_id);
                            
                            if (result && !result.error) {
                              console.log('Exchange stopped successfully:', excluded.unique_id);
                              if (onExchangeUpdated) {
                                onExchangeUpdated();
                              }
                            } else {
                              console.error('Failed to stop exchange:', result?.error || 'Unknown error');
                            }
                          } catch {
                            console.error('Error stopping exchange');
                          }
                        }}
                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = '#E42E31'}
                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = '#FD3437'}
                        title="Stop Exchange">
                        Stop Exchange
                      </button>
                      )}
                      <button
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '10px 40px',
                          gap: '10px',
                          width: '120px',
                          height: '37px',
                          background: '#3460FD',
                          borderRadius: '10px',
                          border: 'none',
                          fontFamily: 'Inter',
                          fontWeight: 500,
                          fontSize: '14px',
                          lineHeight: '17px',
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s ease'
                        }}
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setIsManualUpdateOpen(true);
                        }}
                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = '#2850E8'}
                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = '#3460FD'}
                        title="Update">
                        Update
                      </button>
                    </div>
                  )}
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
      
      {/* Manual Update Modal */}
      <ManualUpdateModal
        isOpen={isManualUpdateOpen}
        onClose={() => {
          setIsManualUpdateOpen(false);
          setSelectedTransaction(undefined);
        }}
        transaction={selectedTransaction}
        onUpdateSuccess={() => {
          // Вызываем коллбэк для обновления списка обменов
          if (onExchangeUpdated) {
            onExchangeUpdated();
          }
          console.log('Exchange updated, refreshing the list');
        }}
      />
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
