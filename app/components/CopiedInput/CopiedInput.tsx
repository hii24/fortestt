import { copyToClipboard } from '@/utils/copyToClipboard';
import { Input, Tooltip } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import Image from 'next/image';
import React, { useState } from 'react';

interface CopiedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  copyTooltipTitle?: string;
  copyTooltipIcon?: string;
  suffix?: React.ReactNode;
  copyTooltipAlt: string;
}

export const CopiedInput: React.FC<CopiedInputProps> = ({
  copyTooltipTitle,
  copyTooltipAlt,
  copyTooltipIcon = '/icons/copy.svg',
  suffix,
  ...rest
}) => {
  const [coping, setCoping] = useState(false);
  return (
    <>
      <div
        className={`fixed inset-0 flex justify-center items-center z-50  transition-opacity duration-300 ${
          coping ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        <p className="flex gap-1 shadow-md bg-[#4169fe] rounded-xl py-2 px-4 text-white">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.1406 10.2085V13.9585C14.1406 17.0835 12.8906 18.3335 9.76562 18.3335H6.01562C2.89062 18.3335 1.64062 17.0835 1.64062 13.9585V10.2085C1.64063 7.0835 2.89062 5.8335 6.01562 5.8335H9.76562C12.8906 5.8335 14.1406 7.0835 14.1406 10.2085Z"
              stroke="white"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3073 4.87484V7.62484C18.3073 9.9165 17.3906 10.8332 15.099 10.8332H14.1406V10.2082C14.1406 7.08317 12.8906 5.83317 9.76562 5.83317H9.14062V4.87484C9.14062 2.58317 10.0573 1.6665 12.349 1.6665H15.099C17.3906 1.6665 18.3073 2.58317 18.3073 4.87484Z"
              stroke="white"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span> {copyTooltipAlt} copied to yor clipboard!</span>
        </p>
      </div>
      <Input
        {...rest}
        required
        size={`${rest.size ?? 'large'}` as SizeType}
        suffix={
          <>
            {suffix}
            {copyTooltipIcon && (
              <Tooltip title={copyTooltipTitle}>
                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard(`${rest.value ?? ''}`);
                    setCoping(true);
                    setTimeout(() => setCoping(false), 1000);
                  }}>
                  <Image
                    src={copyTooltipIcon}
                    width={20}
                    height={20}
                    alt={`${copyTooltipAlt ?? ''}`}
                    className="text-gray-400 cursor-pointer"
                  />
                </button>
              </Tooltip>
            )}
          </>
        }
      />
    </>
  );
};
