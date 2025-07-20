import { headers } from 'next/headers';
import { isMobile as checkIsMobile, getScreenSize as checkScreenSize } from '@/app/(main)/lib/device';

export async function getIsMobile() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  return checkIsMobile(userAgent);
}

export async function getScreenSize() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  return checkScreenSize(userAgent);
}

export default async function DeviceDetector() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isMobile = await getIsMobile();
  return <></>;
}
