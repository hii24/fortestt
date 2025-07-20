'use client';

import React from 'react';
import { Modal, Form, Card, Input, Select, Button } from 'antd';
import styles from './styles.module.css';

interface ManualUpdateModal {
  isOpen: boolean;
  onClose: () => void;
}

const ManualUpdateModal: React.FC<ManualUpdateModal> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  // const onFinish = (values: { [key: string]: any }) => {
  //   console.log('Form values:', values);
  //   // Handle form submission logic here
  // };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
      maskClosable={true}
      className={styles.modal}>
      <Card title="Manual Update" variant="borderless" className={styles.card}>
        {/* // onFinish={onFinish} */}
        <Form form={form} layout="vertical">
          <Form.Item name="depositStatus" label="Deposit" initialValue="Success" className="w-1/2 pr-5">
            <Select>
              <Select.Option value="Success">Success</Select.Option>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Failed">Failed</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex items-start space-x-10 justify-between">
            <div className=" w-full">
              <div>
                <Form.Item name="withdrawals" label="Withdrawals">
                  <Input placeholder="Enter withdrawals" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="dashed"
                    block
                    onClick={() => {
                      // Logic for placing new withdrawal order
                      console.log('Place new withdrawal order');
                    }}>
                    Place new order +
                  </Button>
                </Form.Item>
              </div>
              <div>
                <Form.Item name="buyTrades" label="Buy Trades">
                  <Input placeholder="Enter buy trades" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="dashed"
                    block
                    onClick={() => {
                      // Logic for placing new buy trade
                      console.log('Place new buy trade');
                    }}>
                    Place new order
                  </Button>
                </Form.Item>
              </div>
            </div>

            <div className=" w-full">
              <div>
                <Form.Item name="depositValue" label="Deposit">
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="dashed"
                    block
                    onClick={() => {
                      // Logic for placing new sell trade
                      console.log('Place new sell trade');
                    }}>
                    Place new order
                  </Button>
                </Form.Item>
              </div>
              <div>
                <Form.Item name="sellTrades" label="Sell Trades">
                  <Input placeholder="Enter sell trades" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="dashed"
                    block
                    onClick={() => {
                      // Logic for placing new sell trade
                      console.log('Place new sell trade');
                    }}>
                    Place new order
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="bg-blue-500">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};

export default ManualUpdateModal;
