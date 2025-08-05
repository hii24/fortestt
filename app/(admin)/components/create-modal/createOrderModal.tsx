'use client';

import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import styles from './styles.module.css';
import { AdminService } from '@/services/admin/admin.service';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSuccess?: () => void; // Коллбэк для обновления данных в родительском компоненте
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({ isOpen, onClose, onCreateSuccess }) => {
  const [pair, setPair] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [platform, setPlatform] = useState<'whitebit' | 'mexc'>('whitebit');
  const [isLoading, setIsLoading] = useState(false);

  // Состояния для управления видимостью секций
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isOrderTypeOpen, setIsOrderTypeOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);

  const handleSubmit = async () => {
    // Validate fields
    if (!pair || !amount || !price) {
      alert('Please fill all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const orderData = {
        pair,
        amount,
        price,
        side,
        order_type: orderType,
        platform,
      };

      console.log('Creating order with data:', orderData);

      const result = await AdminService.createOrder(orderData);
      
      if (result && !result.error) {
        console.log('Order created successfully:', result);
        
        // Вызываем коллбэк для обновления данных в родительском компоненте
        if (onCreateSuccess) {
          onCreateSuccess();
        }
        
        // Reset fields and close modal
        setPair('');
        setAmount('');
        setPrice('');
        setSide('buy');
        setOrderType('market');
        setPlatform('whitebit');
        onClose();
      } else {
        console.error('Failed to create order:', result?.error || 'Unknown error');
        alert('Failed to create order: ' + (result?.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={444}
      centered
      maskClosable={true}
      className={styles.modal}
      closeIcon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 6L18 18" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create order</h2>
        </div>

        <div className={styles.formSection}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Pair</label>
            <div className={styles.inputWrapper}>
              <Input
                value={pair}
                onChange={(e) => setPair(e.target.value)}
                className={styles.input}
                placeholder="BTC_USDT"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Amount</label>
            <div className={styles.inputWrapper}>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={styles.input}
                placeholder="0.1"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Price</label>
            <div className={styles.inputWrapper}>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={styles.input}
                placeholder="118337.49"
              />
            </div>
          </div>
        </div>

        <div className={styles.selectorSection}>
          <div className={styles.selectorGroup}>
            <div 
              className={styles.selectorHeader}
              onClick={() => setIsSideOpen(!isSideOpen)}>
              <span className={styles.selectorLabel}>Side</span>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.arrow} ${isSideOpen ? styles.arrowRotated : ''}`}>
                <path d="M19.92 9.41L13.4 15.93C12.63 16.7 11.37 16.7 10.6 15.93L4.08 9.41" stroke="#1B1B1B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {isSideOpen && (
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={`${styles.selectorButton} ${side === 'buy' ? styles.buyActive : styles.buyInactive}`}
                  onClick={() => setSide('buy')}>
                  Buy
                </button>
                <button
                  type="button"
                  className={`${styles.selectorButton} ${side === 'sell' ? styles.sellActive : styles.sellInactive}`}
                  onClick={() => setSide('sell')}>
                  Sell
                </button>
              </div>
            )}
          </div>

          <div className={styles.selectorGroup}>
            <div 
              className={styles.selectorHeader}
              onClick={() => setIsOrderTypeOpen(!isOrderTypeOpen)}>
              <span className={styles.selectorLabel}>Order Type</span>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.arrow} ${isOrderTypeOpen ? styles.arrowRotated : ''}`}>
                <path d="M19.92 9.41L13.4 15.93C12.63 16.7 11.37 16.7 10.6 15.93L4.08 9.41" stroke="#1B1B1B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {isOrderTypeOpen && (
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={`${styles.selectorButton} ${orderType === 'market' ? styles.marketActive : styles.marketInactive}`}
                  onClick={() => setOrderType('market')}>
                  Market
                </button>
                <button
                  type="button"
                  className={`${styles.selectorButton} ${orderType === 'limit' ? styles.limitActive : styles.limitInactive}`}
                  onClick={() => setOrderType('limit')}>
                  Limit
                </button>
              </div>
            )}
          </div>

          <div className={styles.selectorGroup}>
            <div 
              className={styles.selectorHeader}
              onClick={() => setIsPlatformOpen(!isPlatformOpen)}>
              <span className={styles.selectorLabel}>Platform</span>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.arrow} ${isPlatformOpen ? styles.arrowRotated : ''}`}>
                <path d="M19.92 9.41L13.4 15.93C12.63 16.7 11.37 16.7 10.6 15.93L4.08 9.41" stroke="#1B1B1B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {isPlatformOpen && (
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={`${styles.selectorButton} ${platform === 'whitebit' ? styles.platformActive : styles.platformInactive}`}
                  onClick={() => setPlatform('whitebit')}>
                  Whitebit
                </button>
                <button
                  type="button"
                  className={`${styles.selectorButton} ${platform === 'mexc' ? styles.platformActive : styles.platformInactive}`}
                  onClick={() => setPlatform('mexc')}>
                  Mexc
                </button>
              </div>
            )}
          </div>

        </div>

        <Button 
          onClick={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
          className={styles.submitButton}>
          {isLoading ? 'Creating...' : 'Submit'}
        </Button>
      </div>
    </Modal>
  );
};

export default CreateOrderModal;
