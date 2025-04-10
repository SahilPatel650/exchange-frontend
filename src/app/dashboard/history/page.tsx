'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

// Mock transaction history data
const MOCK_TRANSACTIONS = [
  {
    id: 1,
    stockSymbol: 'AAPL',
    stockName: 'Apple Inc.',
    quantity: 10,
    price: 175.25,
    type: 'buy',
    status: 'completed',
    date: '2023-06-15T14:30:00',
    total: 1752.50,
  },
  {
    id: 2,
    stockSymbol: 'MSFT',
    stockName: 'Microsoft Corporation',
    quantity: 5,
    price: 330.12,
    type: 'buy',
    status: 'completed',
    date: '2023-06-14T09:45:00',
    total: 1650.60,
  },
  {
    id: 3,
    stockSymbol: 'GOOGL',
    stockName: 'Alphabet Inc.',
    quantity: 2,
    price: 140.50,
    type: 'sell',
    status: 'completed',
    date: '2023-06-13T11:20:00',
    total: 281.00,
  },
  {
    id: 4,
    stockSymbol: 'TSLA',
    stockName: 'Tesla, Inc.',
    quantity: 3,
    price: 245.65,
    type: 'buy',
    status: 'completed',
    date: '2023-06-10T15:10:00',
    total: 736.95,
  },
  {
    id: 5,
    stockSymbol: 'META',
    stockName: 'Meta Platforms, Inc.',
    quantity: 8,
    price: 325.80,
    type: 'sell',
    status: 'completed',
    date: '2023-06-07T10:05:00',
    total: 2606.40,
  },
];

export default function HistoryPage() {
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [filterType, setFilterType] = useState('all');
  const [date, setDate] = useState<Date | undefined>(undefined);

  // Filter transactions based on the selected filters
  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by type
    if (filterType !== 'all' && transaction.type !== filterType) {
      return false;
    }

    // Filter by date
    if (date && !format(new Date(transaction.date), 'yyyy-MM-dd').includes(format(date, 'yyyy-MM-dd'))) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Trading History</h1>
        <p className="text-gray-500">View your past transactions and trading activity</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="w-[200px]">
          <Select
            value={filterType}
            onValueChange={(value: string) => setFilterType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="buy">Buy Orders</SelectItem>
              <SelectItem value="sell">Sell Orders</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {date && (
          <Button variant="ghost" onClick={() => setDate(undefined)}>
            Clear date
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">
                    {transaction.stockSymbol}
                    <span className="block text-xs text-gray-500">
                      {transaction.stockName}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'buy'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>${transaction.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${transaction.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className="capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {transaction.status}
                    </span>
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