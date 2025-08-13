'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CurrencyPropsFinal } from '@/types/coin.interface';
import { DebouncedInput } from '@/app/components/DebouncedInput';
import styles from '@/app/(main)/components/exchange/styles.module.css';
import { useInfiniteScroll } from '@/hooks/useInfinityScroll';
import CurrencyList from '@/app/(main)/components/exchange/swap-selector/ui/currency-selector/ui/currency-list/currency-list';
import CurrencyDropdownHeader from '@/app/(main)/components/exchange/swap-selector/ui/currency-selector/ui/currency-dropdown-header/currency-dropdown-header';
import CurrencyButton from '@/app/(main)/components/exchange/swap-selector/ui/currency-selector/ui/currency-button/currency-button';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import clsx from 'clsx';

interface CurrencySelectorProps {
  className?: string;
  currency: CurrencyPropsFinal | null;
  onCurrencyChange?: (currency: CurrencyPropsFinal) => void;
  onAmountChange?: (amount: string) => void;
  amount?: string;
  disabledAmound?: boolean;
  currencyListLimit?: number;
  cuted?: boolean;
  fixed?: boolean;
  showFloatIcon?: boolean;
  isCalculating?: boolean; // Add loading prop
}

// Animation variants for the dots
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

const dotVariants: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0.3,
  },
  visible: (i: number) => ({
    scale: [0.8, 1.2, 1, 0.8, 1.2, 1],
    opacity: [0.3, 1, 0.8, 0.3, 1, 0.8],
    backgroundColor: [
      '#3460FD', // Start gray
      '#3460FD', // Stay gray (darker phase)
      '#3460FD', // Turn blue
      '#3460FD', // Back to gray
      '#3460FD', // Stay gray (darker phase)
      '#3460FD', // Turn blue again
    ],
    transition: {
      duration: 1,
      delay: i * 0.05,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
      backgroundColor: {
        duration: 1,
        delay: i * 0.05,
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  }),
};

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  className,
  amount = '0',
  currency,
  onCurrencyChange,
  onAmountChange,
  disabledAmound = false,
  currencyListLimit = 50,
  fixed = true,
  cuted = false,
  showFloatIcon = false,
  isCalculating = false, // Default to false
}) => {
  const [opened, setOpened] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const {
    allCurrencies,
    isLoading,
    hasNextPage,
    searchQuery,
    handleSearchChange,
    loadNextPage,
    loadInitialData,
    resetData,
  } = useInfiniteScroll(currencyListLimit);

  // Prefetch on mount for faster first-open
  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Safe access to currency properties
  const currencyToken = currency?.token;
  const currencyTitle = currency?.title;
  const networkTitle = currency?.network.title;

  // Handle animation timing to ensure minimum 500ms duration and restart on change
  useEffect(() => {
    if (isCalculating) {
      setShowAnimation(true);
      // Restart animation by changing key
      setAnimationKey((prev) => prev + 1);
      // Clear any existing timer
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    } else {
      // When isCalculating becomes false, set a timer to hide after minimum duration
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
      animationTimerRef.current = setTimeout(() => {
        setShowAnimation(false);
      }, 500);
    }

    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, [isCalculating]);

  // Load initial data when dropdown opens (kept, but usually prefetch covers it)
  useEffect(() => {
    if (opened) loadInitialData();
  }, [opened, loadInitialData]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Do not reset data on close to avoid refetch on next open

  // Detect mobile viewport and lock scroll on mobile when opened
  useEffect(() => {
    const checkMobile = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const scrollContainer = document.documentElement;
    if (isMobile && opened) {
      scrollContainer.style.overflow = 'hidden';
    } else {
      scrollContainer.style.overflow = '';
    }
    return () => {
      scrollContainer.style.overflow = '';
    };
  }, [isMobile, opened]);

  const validateCryptoAmount = (value: string) => {
    const raw = value.replace(',', '.');
    const cleaned = raw.replace(/[^0-9.]/g, '');
    const dotCount = (cleaned.match(/\./g) || []).length;

    if (dotCount > 1) return null;
    if (!/^\d*\.?\d{0,18}$/.test(cleaned)) return null;

    return cleaned;
  };

  const pattern = '^\d*\.?\d{0,18}$';

  return (
    <div className={`relative !w-full ${styles.fromSelect} ${className} lg:min-w-0 w-full`}>
      <div className={styles.floatIcon}>
        {showFloatIcon && !fixed && <span>{'~'}</span>}
        {showFloatIcon && fixed && (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.18512 12.8796V8.60887C3.18512 7.93497 3.73142 7.38867 4.40532 7.38867H11.7265C12.4004 7.38867 12.9467 7.93498 12.9467 8.60887V12.8796C12.9467 13.5535 12.4004 14.0998 11.7265 14.0998H4.40532C3.73142 14.0998 3.18512 13.5535 3.18512 12.8796Z"
              stroke="#3460FD"
              strokeWidth="1.13333"
              strokeLinecap="round"
            />
            <path
              d="M4.36365 7.27272V5.53437C4.36365 3.52604 5.99174 1.89798 8.00007 1.89801V1.89801C10.0084 1.89804 11.6364 3.52609 11.6364 5.53437V7.27272"
              stroke="#3460FD"
              strokeWidth="1.13333"
              strokeLinecap="round"
            />
            <path d="M8 10L8 11.3333" stroke="#3460FD" strokeWidth="1.13333" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {cuted ? (
        <div
          className={clsx(
            ' w-full flex-1 !relative',
            isCalculating && 'pointer-events-none select-none',
            styles.toAmount
          )}>
          {/* Loading overlay for cuted display with dot animation */}
          <AnimatePresence mode="wait">
            {showAnimation && (
              <motion.div
                key={animationKey}
                style={{ pointerEvents: 'none' }}
                className="absolute inset-0 flex items-center justify-start bg-[#FFFAFA] z-[1] mx-2 px-2 py-4"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <motion.div
                  className="flex space-x-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible">
                  {[...Array(window.innerWidth > 768 ? 10 : 8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="size-[10px] md:size-3 rounded-full bg-gray-600"
                      variants={dotVariants}
                      custom={i}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <span className="lg:text-sm xl:text-base">
            {String(amount).includes('.')
              ? String(amount).split('.')[0] + '.' + String(amount).split('.')[1].slice(0, 8)
              : String(amount)}
          </span>
        </div>
      ) : (
        <DebouncedInput
          disabled={disabledAmound}
          className="flex-1 pt-[19px] pb-[14px] lg:text-sm xl:text-base w-full min-w-0"
          type="text"
          inputMode="decimal"
          pattern={pattern}
          value={amount}
          validate={validateCryptoAmount}
          onDebouncedChange={(value) => onAmountChange?.(value)}
        />
      )}

      <div className="relative border-b border-[#E6E7EB]">
        <CurrencyButton
          currencyToken={currencyToken}
          currencyTitle={currencyTitle}
          networkTitle={networkTitle}
          opened={opened}
          onClick={() => setOpened((prev) => !prev)}
        />

        {opened && !isMobile && (
          <div
            ref={ref}
            className={`${styles.currencyDD} w-full max-w-md mx-auto mt-4 bg-white shadow-md rounded-lg overflow-hidden relative`}>
            <CurrencyDropdownHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} />

            <CurrencyList
              currencies={allCurrencies}
              isLoading={isLoading}
              hasNextPage={hasNextPage}
              searchQuery={searchQuery}
              onLoadMore={loadNextPage}
              onCurrencyChange={onCurrencyChange}
              setOpened={setOpened}
            />
          </div>
        )}

        {opened && isMobile && typeof document !== 'undefined' &&
          createPortal(
            <div className="fixed inset-0 z-[9999] flex flex-col bg-white">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#E6E7EB]">
                <p className="text-[16px] font-[500]">Select a currency</p>
                <button
                  aria-label="Close"
                  className="p-1"
                  onClick={() => setOpened(false)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6L18 18" stroke="#1B1B1B" strokeWidth="2" strokeLinecap="round" />
                    <path d="M18 6L6 18" stroke="#1B1B1B" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="px-4 py-2 border-b border-[#E6E7EB]">
                <CurrencyDropdownHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} />
              </div>

              <div className="flex-1 px-3 pt-2">
                <CurrencyList
                  currencies={allCurrencies}
                  isLoading={isLoading}
                  hasNextPage={hasNextPage}
                  searchQuery={searchQuery}
                  onLoadMore={loadNextPage}
                  onCurrencyChange={onCurrencyChange}
                  setOpened={setOpened}
                  maxHeight={'calc(100vh - 120px)'}
                />
              </div>
            </div>,
            document.body
          )}
      </div>
    </div>
  );
};

export default CurrencySelector;
