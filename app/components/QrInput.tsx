'use client';

import { useState } from 'react';
import { Input, Tooltip, Modal } from 'antd';
import Image from 'next/image';
import QrScanner from './QRCodeReader';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
};

const QrInput = ({ value, onChange, placeholder, required }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openScanner = () => setIsModalOpen(true);
  const closeScanner = () => setIsModalOpen(false);

  return (
    <>
      <Input
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="large"
        suffix={
          <Tooltip title="QR">
            <Image
              width={20}
              height={20}
              src="/icons/qr.svg"
              alt="qr"
              className="text-gray-400 cursor-pointer"
              onClick={openScanner}
            />
          </Tooltip>
        }
      />

      <Modal
        title="Scan QR Code"
        open={isModalOpen}
        onCancel={closeScanner}
        footer={null}
        centered
        destroyOnClose>
        <QrScanner
          className="min-h-72"
          onScan={async (data) => {
            onChange(data);
            closeScanner();
          }}
        />
      </Modal>
    </>
  );
};

export default QrInput;
