'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface ReviewData {
  count: number;
  loading: boolean;
}

interface TrustpilotApiResponse {
  count: number;
  lastUpdated: string;
  error?: string;
}

interface TrustPilotProps {
  color: string;
  variant: 'primary' | 'secondary';
  animationDelay?: number; // in seconds
}

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
}

interface CachedReviewData {
  count: number;
  timestamp: number;
}

const STORAGE_KEY = 'trustpilot_reviews';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ from, to, duration = 1.6, delay = 0.3 }) => {
  const count = useMotionValue(from);
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const timer = setTimeout(() => {
      const controls = animate(count, to, {
        duration,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        },
      });

      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [count, to, duration, delay]);

  return <motion.span>{displayValue}</motion.span>;
};

const TrustPilot = ({ color, variant = 'primary', animationDelay = 0 }: TrustPilotProps) => {
  const t = useTranslations('trustpilot');
  const [reviewData, setReviewData] = useState<ReviewData>({
    count: 13, // fallback number
    loading: true,
  });

  // Get cached data from localStorage
  const getCachedData = (): CachedReviewData | null => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsedData: CachedReviewData = JSON.parse(cached);
        const now = Date.now();

        // Check if cache is still valid (within CACHE_DURATION)
        if (now - parsedData.timestamp < CACHE_DURATION) {
          return parsedData;
        }
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
    return null;
  };

  // Save data to localStorage
  const setCachedData = (count: number): void => {
    try {
      const dataToCache: CachedReviewData = {
        count,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToCache));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  useEffect(() => {
    const fetchTrustpilotData = async (): Promise<void> => {
      try {
        // First, try to get cached data
        const cachedData = getCachedData();

        if (cachedData) {
          // Use cached data initially
          setReviewData({
            count: cachedData.count,
            loading: false,
          });
        }

        // Always fetch fresh data from API
        const response = await fetch('/api/trustpilot-reviews');
        const data: TrustpilotApiResponse = await response.json();

        // Only update if the count is different from cached data
        if (!cachedData || cachedData.count !== data.count) {
          setReviewData({
            count: data.count,
            loading: false,
          });

          // Cache the new data
          setCachedData(data.count);
        }
      } catch (error) {
        console.error('Error fetching Trustpilot data:', error);

        // If we have cached data, use it; otherwise use fallback
        const cachedData = getCachedData();
        setReviewData({
          count: cachedData ? cachedData.count : 13,
          loading: false,
        });
      }
    };

    fetchTrustpilotData();
  }, []);

  return (
    <Link
      target={'_blank'}
      rel={'noopener noreferer'}
      href={'https://www.trustpilot.com/review/lizex.io'}
      className={'flex gap-1 items-center opacity-[1.0] hover:opacity-[0.6] transition-opacity'}>
      {variant === 'primary' ? (
        <p style={{ color: color }} className={' text-[14px] md:text-[16px] font-[400] leading-[162%]'}>
          {t('seeOur')}{' '}
          <span className={'font-[700]'}>
            {!reviewData.loading && <AnimatedCounter from={0} to={reviewData.count} delay={animationDelay} />}
          </span>{' '}
          {t('reviewsOn')}
        </p>
      ) : (
        <p style={{ color: color }} className={' text-[14px] md:text-[16px] font-[400] leading-[162%]'}>
          {t('rateUsOn')}
        </p>
      )}

      <TrustPilotIcon />
      <p style={{ color: color }} className={'text-[14px] md:text-[16px] font-[400] leading-[162%]'}>Trustpilot</p>
    </Link>
  );
};

const TrustPilotIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
      <path
        d="M13.3208 18.3019L18.8303 16.9057L21.1322 24L13.3208 18.3019ZM26.0001 9.13208H16.302L13.3208 0L10.3397 9.13208H0.641602L8.49066 14.7925L5.50952 23.9245L13.3586 18.2641L18.1888 14.7925L26.0001 9.13208Z"
        fill="#219653"
      />
    </svg>
  );
};

export default TrustPilot;
