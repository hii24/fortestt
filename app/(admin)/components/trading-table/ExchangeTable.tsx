import { FC, ReactNode, useState } from 'react';
import styles from './styles.module.css';
import { ExchangeProcessStatus } from '@/config/status.config';
import { GetExchangesItem } from '@/types/exchange.interface';
import { Modal } from 'antd';
import { Tooltip } from 'antd';
import EyeIcon from './EyeIcon';
import InfoIcon from './InfoIcon';
import ManualUpdateModal from '../create-modal/ManualUpdateModal';
import { ExchangeService } from '@/services/exchange/exchange.service';

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
  
  // Состояния для hover кнопок и модалки manual update
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [isManualUpdateOpen, setIsManualUpdateOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<GetExchangesItem | null>(null);

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
              <span className="px-1">Time</span>
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
              <tr 
                key={`exch-${index}`} 
                className="hover:bg-gray-50 relative"
                onMouseEnter={() => setHoveredRowIndex(index)}
                onMouseLeave={() => setHoveredRowIndex(null)}>
                <td className={`${className} min-w-fit text-left`}>{excluded.unique_id}</td>

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
                  <div className="flex justify-center items-center">
                    {excluded.end_time || excluded.start_time ? (
                      <Tooltip title={excluded.end_time ?? excluded.start_time}>
                        <div className="flex flex-col items-center">
                          <span>{new Date(excluded.end_time ?? excluded.start_time).toLocaleDateString('ru-RU')}</span>
                          <span>{new Date(excluded.end_time ?? excluded.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </Tooltip>
                    ) : (
                      '-'
                    )}
                  </div>
                </td>

                <td className={`${className} min-w-fit text-left`}>
                  <InfoIcon
                    size={20}
                    className="hover:opacity-80 transition-opacity"
                    onClick={() => {
                      setModalContent({
                        title: 'Info',
                        children: (
                          <div className="bg-[#F5F0F0] rounded-2xl p-3 mr-4">
                            {excluded?.address && (
                              <div>
                                <strong>Address:</strong> {excluded.address}
                              </div>
                            )}
                            {excluded?.refund_address && (
                              <div>
                                <strong>Refound address:</strong> {excluded.refund_address}
                              </div>
                            )}
                            {!(excluded?.address || excluded?.refund_address) && <div>No data</div>}
                          </div>
                        ),
                      });
                      setOpenModal(true);
                    }}
                  />
                </td>

                <td className={`${className} min-w-fit text-left`}>
                  {excluded.volume != null ? Number(excluded.volume).toFixed(4) : '-'}
                </td>
                <td className={`${className} min-w-fit text-left`}>{excluded.fixed ? 'fixed' : 'float'}</td>

                <td className={className}>
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
                                      <strong>Deposit ID:</strong> {excluded?.deposite ?? '-'}
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
                        <div className="flex items-center gap-1">
                          <Tooltip title={excluded.address != null ? String(excluded.address) : ''}>
                            <span
                              className="text-xs cursor-pointer"
                              style={{
                               
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                display: 'inline-block',
                              }}
                              onClick={() => {
                                if (excluded.address) {
                                  navigator.clipboard.writeText(String(excluded.address));
                                }
                              }}>
                              {formatAddress(excluded.address)}
                             
                            </span>
                          </Tooltip>
                          <button
                                onClick={() => {
                                  if (excluded.address) {
                                    navigator.clipboard.writeText(String(excluded.address));
                                  }
                                }}>
                                <EyeIcon size={16} />
                              </button>
                          {/* Левый нижний глазик - копирование депозитного адреса */}
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
                                      <strong>Withdrawal ID:</strong> {excluded?.unique_id ?? '-'}
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
                              onClick={() => {
                                if (excluded.deposit_address) {
                                  navigator.clipboard.writeText(String(excluded.deposit_address));
                                }
                              }}>
                              {formatAddress(excluded.deposit_address)}
                              
                            </span>
                          </Tooltip>
                          {/* Правый нижний глазик - копирование адреса для вывода */}
                          <button
                                onClick={() => {
                                  if (excluded.deposit_address) {
                                    navigator.clipboard.writeText(String(excluded.deposit_address));
                                  }
                                }}>
                                <EyeIcon size={16} />
                              </button>
                        </div>
                        {/* MEMO для вывода если есть */}
                        {excluded.withdrawal_memo && (
                          <div className="text-xs text-gray-500">MEMO: {excluded.withdrawal_memo}</div>
                        )}
                      </div>
                    </div>
                  )}
                </td>
                <td className={`${className} min-w-fit text-left`}>
                  {excluded?.profit != null ? Number(excluded.profit).toFixed(4) : '-'}
                </td>
                <td className={`${className} min-w-fit text-left relative`}>
                  {excluded?.partner_profit != null ? Number(excluded.partner_profit).toFixed(4) : '-'}
                  
                  {/* Hover кнопки */}
                  {hoveredRowIndex === index && (
                    <div 
                      className="absolute top-1/4 transform -translate-y-1/2 flex"
                      style={{
                        gap: '4px',
                        width: '260px',
                        right: '-10px',
                        height: '37px',
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
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
                              // Optionally refresh the data or update UI
                              // You might want to call a callback prop here to refresh the table data
                            } else {
                              console.error('Failed to stop exchange:', result?.error || 'Unknown error');
                            }
                          } catch (error) {
                            console.error('Error stopping exchange:', error);
                          }
                        }}
                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = '#E42E31'}
                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = '#FD3437'}
                        title="Stop Exchange">
                        Stop Exchange
                      </button>
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
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction}
        onUpdateSuccess={() => {
          // Здесь можно добавить логику для обновления списка обменов
          // Например, вызвать коллбэк из родительского компонента
          console.log('Exchange updated, consider refreshing the list');
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
