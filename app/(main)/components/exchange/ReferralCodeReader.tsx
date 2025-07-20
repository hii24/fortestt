'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ReferralCodeReader() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const rParam = searchParams.get('r');
    if (rParam) {
      localStorage.setItem('r', `${rParam}`);
      // router.replace(`/transfer/?r=${rParam}`);
    }
  }, [searchParams, router]);

  return null;
}
