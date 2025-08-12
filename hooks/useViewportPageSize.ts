import { MutableRefObject, useEffect, useRef, useState } from 'react';

type UseViewportPageSizeOptions = {
  minRows?: number;
  maxRows?: number;
  paginationReservePx?: number; // space reserved for pagination + margins
  bottomPaddingPx?: number;
  storageKey?: string; // optional: persist last computed size
  debounceMs?: number;
  // Static computation (no DOM measuring)
  topReservePx?: number; // approximate space above the table until its top (filters, margins, headers)
  tableHeaderPx?: number; // approximate table header height
  rowHeightPx?: number; // approximate row height
};

export function useViewportPageSize(
  _tableRef: MutableRefObject<HTMLElement | null>,
  {
    minRows = 5,
    maxRows = 100,
    paginationReservePx = 72,
    bottomPaddingPx = 16,
    storageKey,
    debounceMs = 150,
    topReservePx = 220,
    tableHeaderPx = 48,
    rowHeightPx = 44,
  }: UseViewportPageSizeOptions = {}
) {
  const [pageSize, setPageSize] = useState<number | undefined>(() => {
    if (storageKey && typeof window !== 'undefined') {
      const raw = window.localStorage.getItem(storageKey);
      const parsed = raw ? Number(raw) : undefined;
      return Number.isFinite(parsed as number) ? (parsed as number) : undefined;
    }
    return undefined;
  });

  const lastSizeRef = useRef<number | undefined>(pageSize);
  const resizeTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const computeStatic = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const availableHeight = Math.max(0, viewportHeight - topReservePx - paginationReservePx - bottomPaddingPx);
      const rowsFitRaw = Math.floor(Math.max(0, availableHeight - tableHeaderPx) / Math.max(1, rowHeightPx));
      const clamped = Math.max(minRows, Math.min(rowsFitRaw || minRows, maxRows));

      if (clamped !== lastSizeRef.current) {
        lastSizeRef.current = clamped;
        setPageSize(clamped);
        if (storageKey) {
          try {
            window.localStorage.setItem(storageKey, String(clamped));
          } catch {}
        }
      }
    };

    // Initial compute synchronously-ish via rAF
    const initId = window.requestAnimationFrame(computeStatic);

    const onResize = () => {
      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = window.setTimeout(() => {
        computeStatic();
      }, debounceMs);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(initId);
      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [bottomPaddingPx, paginationReservePx, minRows, maxRows, debounceMs, storageKey, topReservePx, tableHeaderPx, rowHeightPx]);

  return pageSize;
}


