'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Input, Button } from 'antd';
import styles from './styles.module.css';
import { ExchangeService } from '@/services/exchange/exchange.service';
// import { ExchangeProcessStatus } from '@/config/status.config';
import { ManualUpdateExchangeBody } from '@/types/exchange.interface';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Transaction {
  unique_id?: string;
  deposit?: any;
  token1_amount?: any;
  node_deposit?: any;
  withdrawal?: any;
  token2_amount?: any;
  buy_orders?: any[];
  sell_orders?: any[];
  is_stopped?: boolean;
  note?: string;
  status?: number;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

interface ManualUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction;
  onUpdateSuccess?: () => void; // Коллбэк для обновления данных в родительском компоненте
}

const ManualUpdateModal: React.FC<ManualUpdateModalProps> = ({ isOpen, onClose, transaction, onUpdateSuccess }) => {
  const [buyOrders, setBuyOrders] = useState<string[]>([]);
  const [sellOrders, setSellOrders] = useState<string[]>([]);
  const [deposit, setDeposit] = useState('');
  const [nodeDeposit, setNodeDeposit] = useState('');
  const [withdrawal, setWithdrawal] = useState('');
  const [status, setStatus] = useState('Success');
  const [isStopped, setIsStopped] = useState(false);
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // Состояние для управления dropdown статуса
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  // Маппинг статусов из строк в числа согласно ExchangeProcessStatus
  const statusMapping = useMemo((): { [key: string]: number } => ({
    'Waiting': 1,
    'Confirmation': 2, 
    'Transferring': 3,
    'Exchanging': 4,
    'Sending': 5,
    'Success': 6,
    'Overdue': 7,
    'Frozen': 8,
    'Problematic': 9,
    'Refunded': 10,
  }), []);

  // Предзаполнение полей при открытии модалки
  useEffect(() => {
    if (isOpen && transaction) {
      console.log('Pre-filling modal with transaction data:', transaction);
      
      // Предзаполняем поля значениями из транзакции
      setDeposit(transaction.deposit || transaction.token1_amount || '');
      setNodeDeposit(transaction.node_deposit || '');
      setWithdrawal(transaction.withdrawal || transaction.token2_amount || '');
      setBuyOrders(transaction.buy_orders || []);
      setSellOrders(transaction.sell_orders || []);
      setIsStopped(transaction.is_stopped || false);
      setNote(transaction.note || '');
      
      // Конвертируем числовой статус обратно в строку для отображения
      const currentStatusString = Object.entries(statusMapping).find(
        ([, value]) => value === transaction.status
      )?.[0] || 'Success';
      setStatus(currentStatusString);
      
      console.log('Set status to:', currentStatusString);
    }
  }, [isOpen, transaction, statusMapping]);

  // Очистка полей при закрытии модалки
  useEffect(() => {
    if (!isOpen) {
      setBuyOrders([]);
      setSellOrders([]);
      setIsStatusOpen(false);
      setFormError('');
      setFieldErrors({});
    }
  }, [isOpen]);

  const clearFieldError = (field: string) => {
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const rest = { ...prev };
        delete rest[field];
        return rest;
      });
    }
  };

  const handleSubmit = async () => {
    if (!transaction?.unique_id) {
      console.error('No transaction ID available');
      return;
    }

    // Валидация обязательных полей
    // if (!nodeDeposit.trim()) {
    //   alert('Node Deposit is required');
    //   return;
    // }

    setIsLoading(true);
    setFormError('');
    setFieldErrors({});
    
    try {
      // Подготавливаем данные для отправки согласно новой структуре
      const updateData: ManualUpdateExchangeBody = {
        buy_orders: buyOrders.length > 0 ? buyOrders : [],
        sell_orders: sellOrders.length > 0 ? sellOrders : [],
        deposit: deposit || '',
        node_deposit: nodeDeposit || transaction?.node_deposit || null,
        withdrawal: withdrawal || transaction?.withdrawal || null,
        status: statusMapping[status],
        is_stopped: isStopped,
        note: note || ''
      };

      console.log('Transaction unique_id:', transaction.unique_id);
      console.log('Transaction object:', transaction);
      console.log('Updating exchange with data:', updateData);

      const result = await ExchangeService.updateExchange(transaction.unique_id, updateData);
      
      if (result && !result.error) {
        console.log('Exchange updated successfully:', result);
        
        // Вызываем коллбэк для обновления данных в родительском компоненте
        if (onUpdateSuccess) {
          onUpdateSuccess();
        }
        
        // Reset fields and close modal only on success
        setBuyOrders([]);
        setSellOrders([]);
        setDeposit('');
        setNodeDeposit('');
        setWithdrawal('');
        setStatus('Success');
        setIsStopped(false);
        setNote('');
        onClose();
      } else {
        console.error('Failed to update exchange:', result?.error || 'Unknown error');
        // Разложим ошибки по полям, если есть
        if (result && typeof result === 'object') {
          const maybeFieldErrors = Object.fromEntries(
            Object.entries(result as Record<string, unknown>).filter(([key]) =>
              !['error', 'detail', 'message'].includes(key)
            )
          );
          const collected: Record<string, string[]> = {};
          Object.entries(maybeFieldErrors).forEach(([key, value]) => {
            if (value == null) return;
            if (Array.isArray(value)) {
              collected[key] = value.map((v) => String(v));
            } else if (typeof value === 'string') {
              collected[key] = [value];
            } else if (
              typeof value === 'object' &&
              value !== null &&
              'non_field_errors' in (value as { non_field_errors?: unknown[] }) &&
              Array.isArray((value as { non_field_errors?: unknown[] }).non_field_errors)
            ) {
              collected[key] = ((value as { non_field_errors?: unknown[] }).non_field_errors ?? []).map((v) => String(v));
            }
          });

          setFieldErrors(collected);
          setFormError(String((result as Record<string, unknown>)?.error || (result as Record<string, unknown>)?.detail || (result as Record<string, unknown>)?.message || 'Validation error'));
        } else {
          setFormError('Unknown error');
        }
        // При ошибке не закрываем модалку и не очищаем поля
      }
    } catch (error) {
      console.error('Error updating exchange:', error);
      setFormError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const statusOptions = [
    'Success',
    'Pending',
    'Failed',
    'Waiting',
    'Confirmation', 
    'Transferring',
    'Exchanging',
    'Sending',
    'Overdue',
    'Frozen',
    'Problematic',
    'Refunded'
  ];

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={674}
      centered
      maskClosable={true}
      className={styles.manualModal}
      closeIcon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 6L18 18" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }>
      <div className={styles.manualModalContent}>
        {/* Header */}
        <div className={styles.manualHeader}>
          <h2 className={styles.manualTitle}>Manual update</h2>
        </div>

        {/* Status Dropdown */}
        <div className={styles.statusSection}>
          <label className={styles.statusLabel}>Deposit</label>
          <div 
            className={styles.statusDropdown}
            onClick={() => setIsStatusOpen(!isStatusOpen)}>
            <span className={styles.statusText}>{status}</span>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.statusArrow} ${isStatusOpen ? styles.statusArrowRotated : ''}`}>
              <path d="M19.92 9.41L13.4 15.93C12.63 16.7 11.37 16.7 10.6 15.93L4.08 9.41" stroke="#1B1B1B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {fieldErrors.status && fieldErrors.status.length > 0 && (
            <div className={styles.errorText}>{fieldErrors.status.join(' ')}</div>
          )}
          
          {/* Status Options */}
          {isStatusOpen && (
            <div className={styles.statusOptions}>
              {statusOptions.map((option) => (
                <div
                  key={option}
                  className={styles.statusOption}
                  onClick={() => {
                    setStatus(option);
                    setIsStatusOpen(false);
                  }}>
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        { (formError || Object.keys(fieldErrors).length > 0) && (
          <div className={styles.errorSummary}>
            {formError && <div>{formError}</div>}
            {Object.entries(fieldErrors).map(([key, messages]) => (
              key !== 'non_field_errors' && messages?.length ? (
                <div key={key}>{`${key}: ${messages.join(' ')}`}</div>
              ) : null
            ))}
          </div>
        )}

        {/* Input Blocks Grid */}
        <div className={styles.inputGrid}>
         

          {/* Deposit */}
          <div className={styles.inputBlock}>
            <label className={styles.inputLabel}>Deposit</label>
            <div className={styles.inputContainer}>
              <Input 
                value={deposit}
                onChange={(e) => {
                  setDeposit(e.target.value);
                  clearFieldError('deposit');
                }}
                className={`${styles.manualInput} ${fieldErrors.deposit ? styles.inputError : ''}`}
                placeholder="Enter deposit amount"
              />
              {fieldErrors.deposit && fieldErrors.deposit.length > 0 && (
                <div className={styles.errorText}>{fieldErrors.deposit.join(' ')}</div>
              )}
              <button className={styles.placeOrderButton}>
                Place new order
              </button>
            </div>
          </div>
 {/* Withdrawals */}
 <div className={styles.inputBlock}>
            <label className={styles.inputLabel}>Withdrawals</label>
            <div className={styles.inputContainer}>
              <Input 
                value={withdrawal}
                onChange={(e) => {
                  setWithdrawal(e.target.value);
                  clearFieldError('withdrawal');
                }}
                className={`${styles.manualInput} ${fieldErrors.withdrawal ? styles.inputError : ''}`}
                placeholder="Enter withdrawal amount"
              />
              {fieldErrors.withdrawal && fieldErrors.withdrawal.length > 0 && (
                <div className={styles.errorText}>{fieldErrors.withdrawal.join(' ')}</div>
              )}
              <button className={styles.placeOrderButton}>
                Place new order +
              </button>
            </div>
          </div>
           {/* Sell Trades */}
           <div className={styles.inputBlock}>
            <label className={styles.inputLabel}>Sell Trades</label>
            <div className={styles.inputContainer}>
              <Input 
                value={sellOrders.join(', ')}
                onChange={(e) => {
                  setSellOrders(e.target.value.split(',').map(s => s.trim()).filter(s => s));
                  clearFieldError('sell_orders');
                }}
                className={`${styles.manualInput} ${fieldErrors.sell_orders ? styles.inputError : ''}`}
                placeholder="Enter sell trades"
              />
              {fieldErrors.sell_orders && fieldErrors.sell_orders.length > 0 && (
                <div className={styles.errorText}>{fieldErrors.sell_orders.join(' ')}</div>
              )}
              <button className={styles.placeOrderButton}>
                Place new order
              </button>
            </div>
          </div>
          {/* Buy Trades */}
          <div className={styles.inputBlock}>
            <label className={styles.inputLabel}>Buy Trades</label>
            <div className={styles.inputContainer}>
              <Input 
                value={buyOrders.join(', ')}
                onChange={(e) => {
                  setBuyOrders(e.target.value.split(',').map(s => s.trim()).filter(s => s));
                  clearFieldError('buy_orders');
                }}
                className={`${styles.manualInput} ${fieldErrors.buy_orders ? styles.inputError : ''}`}
                placeholder="Enter buy trades"
              />
              {fieldErrors.buy_orders && fieldErrors.buy_orders.length > 0 && (
                <div className={styles.errorText}>{fieldErrors.buy_orders.join(' ')}</div>
              )}
              <button className={styles.placeOrderButton}>
                Place new order
              </button>
            </div>
          </div>

         
        </div>

        {/* Save Button */}
        <Button 
          onClick={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
          className={styles.saveButton}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </Modal>
  );
};

export default ManualUpdateModal;
