'use client';

import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { ExchangeTransfer } from '../components/exchange/ExchangeTransfer/ExchangeTransfer';

export default function ExchangeScreen() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isClient ? <ExchangeTransfer /> : <div>Loading...</div>}
    </Suspense>
  );
}
