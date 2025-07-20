'use client';

import React, { useState } from 'react';
import { Modal, Card, Input, Select, Button } from 'antd';
import styles from './styles.module.css';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({ isOpen, onClose }) => {
  const [base, setBase] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [orderType, setOrderType] = useState<'buy' | 'sell' | ''>('');

  const handleSubmit = () => {
    // Validate fields
    if (!base || !amount || !price || !orderType) {
      console.log('Please fill all fields');
      return;
    }

    // Process form submission
    const formValues = { base, amount, price, orderType };
    console.log('Form values:', formValues);

    // Reset fields and close modal
    setBase('');
    setAmount('');
    setPrice('');
    setOrderType('');
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={340}
      centered
      maskClosable={true}
      className={styles.modal}>
      <Card title="Create Order" variant="borderless" className={styles.card}>
        <div className={styles.formContainer}>
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block mb-2 font-medium">Base</label>
              <Input
                placeholder="Enter base currency"
                value={base}
                onChange={(e) => setBase(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Price</label>
              <Input
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Order Type</label>
              <Select
                placeholder="Select order type"
                style={{ width: '100%' }}
                value={orderType}
                onChange={(value) => setOrderType(value)}>
                <Select.Option value="buy">Buy</Select.Option>
                <Select.Option value="sell">Sell</Select.Option>
              </Select>
            </div>

            <div className="flex justify-end mt-6">
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default CreateOrderModal;
