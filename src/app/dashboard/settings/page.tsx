'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notifications, setNotifications] = useState({
    email: true,
    trades: true,
    marketUpdates: false,
    news: true,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile in Firebase
    alert('Profile updated successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account information and personal details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                  <p className="text-sm text-gray-500">
                    Your email address cannot be changed
                  </p>
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what kinds of notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked: boolean) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="trade-notifications">Trade Alerts</Label>
                  <p className="text-sm text-gray-500">
                    Notifications about your trades and orders
                  </p>
                </div>
                <Switch
                  id="trade-notifications"
                  checked={notifications.trades}
                  onCheckedChange={(checked: boolean) =>
                    setNotifications({ ...notifications, trades: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="market-notifications">Market Updates</Label>
                  <p className="text-sm text-gray-500">
                    Daily updates about market movements
                  </p>
                </div>
                <Switch
                  id="market-notifications"
                  checked={notifications.marketUpdates}
                  onCheckedChange={(checked: boolean) =>
                    setNotifications({ ...notifications, marketUpdates: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="news-notifications">News and Articles</Label>
                  <p className="text-sm text-gray-500">
                    Articles and news related to your stocks
                  </p>
                </div>
                <Switch
                  id="news-notifications"
                  checked={notifications.news}
                  onCheckedChange={(checked: boolean) =>
                    setNotifications({ ...notifications, news: checked })
                  }
                />
              </div>

              <Button className="mt-4">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 