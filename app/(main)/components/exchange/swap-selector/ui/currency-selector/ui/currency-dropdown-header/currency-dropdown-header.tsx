// components/CurrencyDropdownHeader.tsx
import Image from 'next/image';
import { SearchInput } from '@/app/components/SearchInput';
import { useTranslations } from 'next-intl';

interface CurrencyDropdownHeaderProps {
  searchQuery: string;
  onSearchChange: (search: string) => void;
}

const CurrencyDropdownHeader: React.FC<CurrencyDropdownHeaderProps> = ({ searchQuery, onSearchChange }) => {
  const t = useTranslations('exchange');
  return (
    <div className="px-4 py-2">
      <SearchInput
        className="w-full block px-4 py-2 rounded"
        placeholder={t('searchPlaceholder', { fallback: 'Search from currency' })}
        prefix={<Image className="mr-2" src="/icons/search.svg" width={20} height={20} alt="" />}
        value={searchQuery}
        allowClear
        onDebouncedChange={onSearchChange}
      />

      <div className="flex mt-4 space-x-2 overflow-x-auto">
        <button type="button" className="text-sm font-semibold text-gray-700 hover:text-blue-500 activeBtn">
          {t('all', { fallback: 'All' })}
        </button>
        <button
          disabled
          type="button"
          className="text-sm font-semibold text-gray-700 disabled:text-gray-400 ml-1">
          {t('new', { fallback: 'New' })}
          <span className="text-[9px] mx-1 text-blue-500">{t('soon', { fallback: 'Soon' })}</span>
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdownHeader;
