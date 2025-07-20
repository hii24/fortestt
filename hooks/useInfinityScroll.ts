import { useCallback, useRef, useState } from 'react';
import { CoinService } from '@/services/coin/coin.service';
import { ResponseList } from '@/types/response.interface';
import { CoinsListItem, CoinsListParams } from '@/types/coin.interface';

// Validation function to check if crypto item has required properties
// Fixed validation function to check if crypto item has required properties
const isValidCryptoItem = (crypto: any): crypto is CoinsListItem => {
  return (
    crypto &&
    typeof crypto === 'object' &&
    typeof crypto.token === 'string' &&
    typeof crypto.title === 'string' &&
    typeof crypto.is_memo === 'boolean' &&
    Array.isArray(crypto.networks) &&
    crypto.networks.length > 0 &&
    crypto.networks.every(
      (network: any) =>
        network &&
        typeof network === 'object' &&
        typeof network.id === 'number' &&
        typeof network.title === 'string'
    )
  );
};

export const useInfiniteScroll = (currencyListLimit: number = 50) => {
  const [allCurrencies, setAllCurrencies] = useState<CoinsListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const loadingRef = useRef(false);

  // Single function to fetch coins data
  const fetchCoinsData = async (page: number, search: string, isAppend: boolean = false) => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setIsLoading(true);

    try {
      const params: CoinsListParams = {
        search: search.trim(),
        page,
        page_size: currencyListLimit,
      };

      const coinsData: ResponseList<CoinsListItem> = await CoinService.getCoinsList(params);

      if (coinsData?.results) {
        const validCurrencies = coinsData.results.filter(isValidCryptoItem);

        setTotalCount(coinsData.count || 0);

        if (isAppend) {
          setAllCurrencies((prev) => [...prev, ...validCurrencies]);
        } else {
          setAllCurrencies(validCurrencies);
        }

        const totalPages = Math.ceil((coinsData.count || 0) / currencyListLimit);
        setHasNextPage(page < totalPages);
      } else {
        if (!isAppend) {
          setAllCurrencies([]);
          setTotalCount(0);
        }
        setHasNextPage(false);
      }
    } catch (error) {
      console.error('Error fetching coins list:', error);
      if (!isAppend) {
        setAllCurrencies([]);
        setTotalCount(0);
      }
      setHasNextPage(false);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  };

  const handleSearchChange = useCallback(
    (search: string) => {
      if (search === searchQuery) return;

      setSearchQuery(search);
      setCurrentPage(1);
      setAllCurrencies([]);
      setHasNextPage(true);
      fetchCoinsData(1, search, false);
    },
    [searchQuery, currencyListLimit]
  );

  const loadNextPage = useCallback(() => {
    if (loadingRef.current || !hasNextPage) return;

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchCoinsData(nextPage, searchQuery, true);
  }, [currentPage, hasNextPage, searchQuery]);

  const loadInitialData = useCallback(() => {
    if (allCurrencies.length === 0 && !loadingRef.current) {
      fetchCoinsData(1, searchQuery, false);
    }
  }, [allCurrencies.length, searchQuery]);

  const resetData = useCallback(() => {
    setAllCurrencies([]);
    setCurrentPage(1);
    setHasNextPage(true);
    setSearchQuery('');
    setTotalCount(0);
    loadingRef.current = false;
  }, []);

  return {
    allCurrencies,
    isLoading,
    hasNextPage,
    searchQuery,
    totalCount,
    handleSearchChange,
    loadNextPage,
    loadInitialData,
    resetData,
  };
};
