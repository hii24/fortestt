'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface ICurrency {
  token: string;
  title: string;
  network: { id: number; title: string };
  is_memo: false;
}

interface PopularExchangeBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fromCurrency: ICurrency;
  toCurrency: ICurrency;
  children?: React.ReactNode;
}

export const PopularExchangeBtn: FC<PopularExchangeBtnProps> = ({
  fromCurrency,
  toCurrency,
  className,
  children,
  ...rest
}) => {
  const router = useRouter();

  const handleExchange = () => {
    /*    localStorage.setItem('fixed', String(false));
    localStorage.setItem('amount', '1'); */
    localStorage.setItem('from', JSON.stringify(fromCurrency));
    localStorage.setItem('to', JSON.stringify(toCurrency));
    router.push(`/transfer/`);
  };

  return (
    <button {...rest} onClick={handleExchange} className={`${className ?? ''}`}>
      {children}
    </button>
  );
};
