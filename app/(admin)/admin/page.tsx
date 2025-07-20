'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the history page when accessing /admin directly
    router.replace('/admin/dashboard/exchange');
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-600">Redirecting to dashboard...</p>
    </div>
  );
}
