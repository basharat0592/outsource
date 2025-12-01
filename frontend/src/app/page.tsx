'use client'

import { useAuthStore } from '@/store/authStore';
import { useState, useEffect } from 'react';
import { Loader2, } from 'lucide-react';
import LoginPage from './(auth)/login/page';
import DashboardPage from './(app)/dashboard/page';

export default function Home() {
  const { token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 dark:text-indigo-400" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return <LoginPage />;
  }

  return <DashboardPage />
}