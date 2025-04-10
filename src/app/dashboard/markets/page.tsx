'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search } from 'lucide-react';

// Mock stock market data
const MOCK_STOCKS = [
  { id: 1, symbol: 'AAPL', name: 'Apple Inc.', price: 175.25, change: 2.45, changePercent: 1.42 },
  { id: 2, symbol: 'MSFT', name: 'Microsoft Corporation', price: 330.12, change: -0.75, changePercent: -0.23 },
  { id: 3, symbol: 'GOOGL', name: 'Alphabet Inc.', price: 140.50, change: 1.20, changePercent: 0.86 },
  { id: 4, symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 178.75, change: -2.30, changePercent: -1.27 },
  { id: 5, symbol: 'META', name: 'Meta Platforms, Inc.', price: 325.80, change: 5.40, changePercent: 1.68 },
  { id: 6, symbol: 'TSLA', name: 'Tesla, Inc.', price: 245.65, change: 7.80, changePercent: 3.28 },
  { id: 7, symbol: 'NFLX', name: 'Netflix, Inc.', price: 577.40, change: 3.25, changePercent: 0.57 },
  { id: 8, symbol: 'NVDA', name: 'NVIDIA Corporation', price: 120.75, change: 4.30, changePercent: 3.69 },
  { id: 9, symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 145.20, change: -1.10, changePercent: -0.75 },
  { id: 10, symbol: 'DIS', name: 'The Walt Disney Company', price: 95.40, change: 0.85, changePercent: 0.90 },
];

export default function MarketsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [stocks, setStocks] = useState(MOCK_STOCKS);

  // Filter stocks based on search term
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Markets</h1>
        <p className="text-gray-500">Browse available stocks and market data</p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search by stock symbol or name..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stock Market</CardTitle>
          <CardDescription>Live stock prices and market data</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">Change %</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.map((stock) => (
                <TableRow key={stock.id}>
                  <TableCell className="font-medium">{stock.symbol}</TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                  <TableCell className={`text-right ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                  </TableCell>
                  <TableCell className={`text-right ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => window.location.href = '/dashboard'}>
                      Trade
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 