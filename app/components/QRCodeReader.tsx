'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { FC, useEffect, useRef } from 'react';
// @ts-ignore
import { Html5Qrcode } from 'html5-qrcode';

type QrScannerProps = {
  onScan: (decodedText: string) => Promise<void>;
  className?: string;
  style?: React.CSSProperties;
};

const QrScanner: FC<QrScannerProps> = ({ onScan, className, style }) => {
  const qrRef = useRef<any>(null);
  const isStarting = useRef(false);

  useEffect(() => {
    const init = async () => {
      try {
        if (!qrRef.current) {
          qrRef.current = new Html5Qrcode('reader');
        }

        const devices = await Html5Qrcode.getCameras();
        if (!devices.length) return;

        const cameraId = devices[0].id;

        // Уникаємо повторного запуску під час транзішну
        if (!qrRef.current._isScanning && !isStarting.current) {
          isStarting.current = true;
          await qrRef.current.start(
            cameraId,
            { fps: 10, qrbox: { width: 250, height: 250 } },
            async (decodedText: string) => {
              try {
                await onScan(decodedText);
              } catch (err) {
                console.error('Scan handler error:', err);
              }
            },
            (errorMessage: string) => {
              console.warn('QR error:', errorMessage);
            }
          );
          isStarting.current = false;
        }
      } catch (err) {
        isStarting.current = false;
        console.error('Camera error:', err);
      }
    };

    init();

    return () => {
      const stopAndClear = async () => {
        try {
          if (qrRef.current?.isScanning) {
            await qrRef.current.stop();
            await qrRef.current.clear();
          }
        } catch (err) {
          console.error('Cleanup error:', err);
        }
      };
      stopAndClear();
    };
  }, [onScan]);

  return <div id="reader" className={className} style={style} />;
};

export default QrScanner;
