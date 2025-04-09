'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const { user, logout, isOffline } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Dashboard</CardTitle>
              {isOffline && (
                <span className="text-sm text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                  Offline Mode
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Welcome, {user.displayName}!</h2>
                <p className="text-gray-600">Email: {user.email}</p>
                {isOffline && (
                  <p className="text-sm text-yellow-600 mt-2">
                    You are currently offline. Some features may be limited.
                  </p>
                )}
              </div>
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 