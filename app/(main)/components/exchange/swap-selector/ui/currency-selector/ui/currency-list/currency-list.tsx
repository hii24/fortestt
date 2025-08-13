// components/CurrencyList.tsx
import { useEffect, useRef, useMemo } from 'react';
import { CoinsListItem, CurrencyPropsFinal } from '@/types/coin.interface';
import { networkColors } from '@/config/networks.config';
import CryptoListItem from '@/app/(main)/components/exchange/swap-selector/ui/currency-selector/ui/currency-list/ui/crypto-list-item';

// Interface for flattened coin-network combination
interface FlattenedCoinNetwork {
  coin: {
    token: string;
    title: string;
    is_memo: boolean;
  };
  network: {
    id: number;
    title: string;
  };
}

interface CurrencyListProps {
  currencies: CoinsListItem[];
  isLoading: boolean;
  hasNextPage: boolean;
  searchQuery: string;
  onLoadMore: () => void;
  onCurrencyChange?: (currency: CurrencyPropsFinal) => void;
  setOpened: (opened: boolean) => void;
  maxHeight?: string;
}

const CurrencyList: React.FC<CurrencyListProps> = ({
  currencies,
  isLoading,
  hasNextPage,
  searchQuery,
  onLoadMore,
  onCurrencyChange,
  setOpened,
  maxHeight,
}) => {
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  // Flatten the currencies array to create individual entries for each coin-network combination
  const flattenedCurrencies = useMemo(() => {
    const flattened: FlattenedCoinNetwork[] = [];

    currencies.forEach((coin) => {
      // Ensure the coin has networks
      if (coin.networks && Array.isArray(coin.networks) && coin.networks.length > 0) {
        coin.networks.forEach((network) => {
          flattened.push({
            coin: {
              token: coin.token,
              title: coin.title,
              is_memo: coin.is_memo,
            },
            network: {
              id: network.id,
              title: network.title,
            },
          });
        });
      }
    });

    return flattened;
  }, [currencies]);

  // Add scroll event listener - handleScroll moved inside useEffect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Handle scroll for pagination - now defined inside useEffect
    const handleScroll = () => {
      if (!container || isLoading || !hasNextPage) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const threshold = 50;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      if (scrollPercentage >= 0.9 || scrollTop + clientHeight >= scrollHeight - threshold) {
        onLoadMore();
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, hasNextPage, onLoadMore]); // Only the actual dependencies needed

  return (
    <>
      <ul
        ref={scrollContainerRef}
        className="max-h-[calc(theme(spacing.11)*7)] scroll-smooth overflow-y-scroll px-1 relative scrollbar-thumb-[#3c4252] hover:scrollbar-thumb-[#4c5262]"
        style={{ maxHeight: maxHeight ?? '300px', scrollbarWidth: 'auto', scrollbarColor: '#616E85 transparent' }}>
        {flattenedCurrencies.map((crypto) => {
          const cryptoId = crypto.network.id;
          const cryptoToken = crypto.coin.token;
          const cryptoTitle = crypto.coin.title;
          const cryptoIsMemo = crypto.coin.is_memo;
          const cryptoNetworkTitle = crypto.network.title;

          if (!cryptoToken || !cryptoTitle || !cryptoNetworkTitle) {
            return null;
          }

          return (
            <CryptoListItem
              key={cryptoId}
              cryptoId={cryptoId}
              cryptoToken={cryptoToken}
              cryptoTitle={cryptoTitle}
              cryptoIsMemo={cryptoIsMemo}
              cryptoNetworkTitle={cryptoNetworkTitle}
              onCurrencyChange={onCurrencyChange}
              setOpened={setOpened}
              networkColors={networkColors}
            />
          );
        })}

        {/* Empty state */}
        {!isLoading && flattenedCurrencies.length === 0 && (
          <li className="flex items-center justify-center p-4 text-gray-500">
            {searchQuery ? 'No currencies found for your search' : 'No currencies found'}
          </li>
        )}
      </ul>
    </>
  );
};

export default CurrencyList;
