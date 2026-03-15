'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">🏙️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">CaaS Platform</h1>
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    </div>
  );
}
