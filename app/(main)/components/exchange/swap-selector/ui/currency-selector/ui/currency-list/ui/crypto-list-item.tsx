import { useImageFallback } from '@/hooks/useImageFallback';
import { getNetworkTextColor } from '@/config/networks.config';
import { CurrencyPropsFinal } from '@/types/coin.interface';
import Image from 'next/image';

// Separate component for list items to properly use hooks
interface CryptoListItemProps {
  cryptoId: number;
  cryptoToken: string;
  cryptoTitle: string;
  cryptoIsMemo: boolean;
  cryptoNetworkTitle: string;
  onCurrencyChange?: (currency: CurrencyPropsFinal) => void;
  setOpened: (opened: boolean) => void;
  networkColors: Record<string, string>; // Use this for simple approach
}

const CryptoListItem = ({
  cryptoId,
  cryptoToken,
  cryptoTitle,
  cryptoIsMemo,
  cryptoNetworkTitle,
  onCurrencyChange,
  setOpened,
  networkColors,
}: CryptoListItemProps) => {
  const { imgSrc: listItemImgSrc, handleError: handleListItemError } = useImageFallback(
    `/_token-logos/${cryptoToken.toLocaleUpperCase()}.png`,
    '/icons/coin.svg'
  );

  console.log(cryptoTitle);
  return (
    <li
      className="flex items-center p-2 hover:bg-blue-50 transition-colors cursor-pointer text-left"
      onClick={() => {
        if (onCurrencyChange) {
          try {
            const newCurrency: CurrencyPropsFinal = {
              title: cryptoTitle,
              token: cryptoToken,
              is_memo: cryptoIsMemo,
              network: {
                id: cryptoId,
                title: cryptoNetworkTitle,
              },
            };
            onCurrencyChange(newCurrency);
            console.log('newCurrency', newCurrency);
            setOpened(false);
          } catch (error) {
            console.error('Error setting new currency:', error);
          }
        }
      }}>
      <Image
        src={listItemImgSrc}
        onError={handleListItemError}
        width={35}
        height={35}
        alt={cryptoTitle}
        className="size-[34px] md:size-10 mr-2 rounded-full"
      />
      <div className="text-left">
        <div className=" flex gap-[5px] items-center">
          <div className="font-bold text-gray-800 text-left">{cryptoToken}</div>
          <span
            style={{
              backgroundColor:
                networkColors[cryptoNetworkTitle?.toUpperCase() as keyof typeof networkColors] ?? '#CBEDFF',
              color: getNetworkTextColor(cryptoNetworkTitle),
            }}
            className="rounded-[5px] px-1 py-0.5">
            {cryptoNetworkTitle}
          </span>
        </div>

        <span className="text-gray-500 text-sm">{cryptoTitle}</span>
      </div>
    </li>
  );
};

export default CryptoListItem;
