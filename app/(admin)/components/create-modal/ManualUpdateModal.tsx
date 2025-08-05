'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Input, Button } from 'antd';
import styles from './styles.module.css';
import { ExchangeService } from '@/services/exchange/exchange.service';
import { ExchangeProcessStatus } from '@/config/status.config';

interface ManualUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: any;
  onUpdateSuccess?: () => void; // Коллбэк для обновления данных в родительском компоненте
}

const ManualUpdateModal: React.FC<ManualUpdateModalProps> = ({ isOpen, onClose, transaction, onUpdateSuccess }) => {
  const [withdrawals, setWithdrawals] = useState('');
  const [deposit, setDeposit] = useState('');
  const [buyTrades, setBuyTrades] = useState('');
  const [sellTrades, setSellTrades] = useState('');
  const [status, setStatus] = useState('Success');
  const [isLoading, setIsLoading] = useState(false);

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
    'Pending': 2, // Map Pending to Confirmation
    'Failed': 9,   // Map Failed to Problematic
  }), []);

  // Предзаполнение полей при открытии модалки
  useEffect(() => {
    if (isOpen && transaction) {
      console.log('Pre-filling modal with transaction data:', transaction);
      
      // Предзаполняем поля значениями из транзакции
      setDeposit(transaction.token1_amount ? String(transaction.token1_amount) : '');
      setWithdrawals(transaction.token2_amount ? String(transaction.token2_amount) : '');
      
      // Конвертируем числовой статус обратно в строку для отображения
      const currentStatusString = Object.entries(statusMapping).find(
        ([_, value]) => value === transaction.status
      )?.[0] || 'Success';
      setStatus(currentStatusString);
      
      console.log('Set status to:', currentStatusString);
    }
  }, [isOpen, transaction, statusMapping]);

  // Очистка полей при закрытии модалки
  useEffect(() => {
    if (!isOpen) {
      setBuyTrades('');
      setSellTrades('');
      setIsStatusOpen(false);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!transaction?.unique_id) {
      console.error('No transaction ID available');
      return;
    }

    setIsLoading(true);
    
    try {
      // Подготавливаем данные для отправки
      const updateData: { [key: string]: any } = {};
      
      // Маппинг полей формы в поля API
      if (status) {
        updateData.status = statusMapping[status];
      }
      
      if (deposit) {
        updateData.token1_amount = parseFloat(deposit);
      }
      
      if (withdrawals) {
        updateData.token2_amount = parseFloat(withdrawals);
      }

      // buyTrades и sellTrades пока оставим как заметки или отдельные поля
      // так как в API нет прямого соответствия
      if (buyTrades) {
        updateData.buy_trades_note = buyTrades;
      }
      
      if (sellTrades) {
        updateData.sell_trades_note = sellTrades;
      }

      console.log('Updating exchange with data:', updateData);

      const result = await ExchangeService.updateExchange(transaction.unique_id, updateData);
      
      if (result && !result.error) {
        console.log('Exchange updated successfully:', result);
        
        // Вызываем коллбэк для обновления данных в родительском компоненте
        if (onUpdateSuccess) {
          onUpdateSuccess();
        }
        
        // Reset fields and close modal only on success
        setWithdrawals('');
        setDeposit('');
        setBuyTrades('');
        setSellTrades('');
        setStatus('Success');
        onClose();
      } else {
        console.error('Failed to update exchange:', result?.error || 'Unknown error');
        // При ошибке не закрываем модалку и не очищаем поля
        alert('Failed to update exchange: ' + (result?.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating exchange:', error);
      alert('Error updating exchange: ' + (error instanceof Error ? error.message : 'Unknown error'));
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
          <label className={styles.statusLabel}>Status</label>
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

        {/* Input Blocks Grid */}
        <div className={styles.inputGrid}>
          {/* Withdrawals */}
          <div className={styles.inputBlock}>
            <label className={styles.inputLabel}>Withdrawals</label>
            <div className={styles.inputContainer}>
              <Input 
                value={withdrawals}
                onChange={(e) => setWithdrawals(e.target.value)}
                className={styles.manualInput}
                placeholder="Enter withdrawal amount"
              />
            </div>
          </div>

          {/* Deposit */}
          <div className={styles.inputBlock}>
            <label className={styles.inputLabel}>Deposit</label>
            <div className={styles.inputContainer}>
              <Input 
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className={styles.manualInput}
                placeholder="Enter deposit amount"
              />
            </div>
          </div>

          {/* Buy Trades */}
          <div className={styles.inputBlock}>
            <label className={styles.inputLabel}>Buy Trades</label>
            <div className={styles.inputContainer}>
              <Input 
                value={buyTrades}
                onChange={(e) => setBuyTrades(e.target.value)}
                className={styles.manualInput}
                placeholder="Enter buy trades note"
              />
            </div>
          </div>

          {/* Sell Trades */}
          <div className={styles.inputBlock}>
            <label className={styles.inputLabel}>Sell Trades</label>
            <div className={styles.inputContainer}>
              <Input 
                value={sellTrades}
                onChange={(e) => setSellTrades(e.target.value)}
                className={styles.manualInput}
                placeholder="Enter sell trades note"
              />
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
