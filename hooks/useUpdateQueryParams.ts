'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useUpdateQueryParams() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQueryParams = (newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  return updateQueryParams;
}
