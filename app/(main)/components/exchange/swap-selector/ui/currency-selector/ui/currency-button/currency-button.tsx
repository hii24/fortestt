// components/CurrencyButton.tsx
import Image from 'next/image';
import clsx from 'clsx';
import { useImageFallback } from '@/hooks/useImageFallback';
import { getNetworkTextColor, networkColors } from '@/config/networks.config';
import styles from '@/app/(main)/components/exchange/styles.module.css';

interface CurrencyButtonProps {
  currencyToken?: string;
  currencyTitle?: string;
  networkTitle?: string;
  opened: boolean;
  onClick: () => void;
}

const CurrencyButton: React.FC<CurrencyButtonProps> = ({
  currencyToken,
  currencyTitle,
  networkTitle,
  opened,
  onClick,
}) => {
  const { imgSrc, handleError } = useImageFallback(
    `/_token-logos/${currencyToken?.toLocaleUpperCase()}.png`,
    '/icons/coin.svg'
  );

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${styles.coinsend} ${opened ? `${styles.coinsendOpen} bg-[#F2F2F2]` : ''} transition-colors pl-5 p-2 rounded-lg`}>
      <Image
        className="-ml-2 rounded-full size-[35px]"
        src={imgSrc}
        width={35}
        height={35}
        alt={`${currencyTitle} image`}
        onError={handleError}
      />
      <div className="flex flex-col items-start gap-x-2">
        <p className="text-[#1B1B1B] text-[16px] font-[400]">{currencyToken}</p>
        <div className="flex gap-[10px] items-center">
          <p
            className={clsx(
              '!text-left max-w-[50px] md:max-w-[150px] w-full truncate',
              'text-[#7D7878] text-[12px] font-[300]'
            )}>
            {currencyTitle}
          </p>
          <p
            style={{
              backgroundColor:
                networkColors[networkTitle?.toUpperCase() as keyof typeof networkColors] ?? '#CBEDFF',
              color: getNetworkTextColor(networkTitle),
            }}
            className="leading-normal px-1 py-[2px] text-[10px] font-[400] text-white rounded-[5px]">
            {networkTitle}
          </p>
        </div>
      </div>
      <Image
        src="/icons/arrow-down.svg"
        width={20}
        height={20}
        alt="arrow-down"
        className={styles.arrowDown}
      />
    </button>
  );
};

export default CurrencyButton;
