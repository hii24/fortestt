import { copyToClipboard } from '@/utils/copyToClipboard';
import { Image, Tooltip, message } from 'antd';
import { FC } from 'react';

export const CopyClipboardButton: FC<{
  value: string;
  className?: string;
  alt: string;
  width?: number;
  height?: number;
}> = ({ value, alt, className = '', width = 20, height = 20 }) => {
  const handleCopy = async () => {
    try {
      await copyToClipboard(value);
      message.success('Copied to clipboard!');
    } catch {
      message.error('Failed to copy to clipboard!');
    }
  };

  return (
    <Tooltip title={alt}>
      <Image
        width={width}
        height={height}
        src="/icons/copy.svg"
        alt={alt}
        className={className}
        onClick={handleCopy}
      />
    </Tooltip>
  );
};
