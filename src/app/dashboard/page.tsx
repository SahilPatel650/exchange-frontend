'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';

// Mock data for stocks
const MOCK_STOCKS = [
  { id: 1, symbol: 'AAPL', name: 'Apple Inc.' },
  { id: 2, symbol: 'MSFT', name: 'Microsoft Corporation' },
  { id: 3, symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { id: 4, symbol: 'AMZN', name: 'Amazon.com, Inc.' },
  { id: 5, symbol: 'META', name: 'Meta Platforms, Inc.' },
];

// Mock data for orders
const MOCK_ORDERS = [
  {
    id: 1,
    stockSymbol: 'AAPL',
    stockName: 'Apple Inc.',
    quantity: 10,
    price: 175.25,
    type: 'buy',
    status: 'filled',
    date: '2023-06-15T14:30:00',
  },
  {
    id: 2,
    stockSymbol: 'MSFT',
    stockName: 'Microsoft Corporation',
    quantity: 5,
    price: 330.12,
    type: 'buy',
    status: 'filled',
    date: '2023-06-14T09:45:00',
  },
  {
    id: 3,
    stockSymbol: 'GOOGL',
    stockName: 'Alphabet Inc.',
    quantity: 2,
    price: 140.50,
    type: 'sell',
    status: 'filled',
    date: '2023-06-13T11:20:00',
  },
];

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [openDialog, setOpenDialog] = useState(false);
  const [newOrder, setNewOrder] = useState({
    stockSymbol: '',
    quantity: '',
    price: '',
    type: 'buy',
  });

  const handleCreateOrder = () => {
    // In a real app, this would submit to your API
    const order = {
      id: orders.length + 1,
      stockSymbol: newOrder.stockSymbol,
      stockName: MOCK_STOCKS.find(s => s.symbol === newOrder.stockSymbol)?.name || '',
      quantity: parseFloat(newOrder.quantity),
      price: parseFloat(newOrder.price),
      type: newOrder.type,
      status: 'filled',
      date: new Date().toISOString(),
    };

    setOrders([order, ...orders]);
    setOpenDialog(false);
    setNewOrder({
      stockSymbol: '',
      quantity: '',
      price: '',
      type: 'buy',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-gray-500">Manage your stock orders and create new ones</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              New Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Order</DialogTitle>
              <DialogDescription>
                Enter the details for your new stock order
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Select
                  value={newOrder.stockSymbol}
                  onValueChange={(value: string) => 
                    setNewOrder({ ...newOrder, stockSymbol: value })
                  }
                >
                  <SelectTrigger id="stock">
                    <SelectValue placeholder="Select a stock" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_STOCKS.map((stock) => (
                      <SelectItem key={stock.id} value={stock.symbol}>
                        {stock.symbol} - {stock.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Order Type</Label>
                <Select
                  value={newOrder.type}
                  onValueChange={(value: string) => 
                    setNewOrder({ ...newOrder, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newOrder.quantity}
                  onChange={(e) => 
                    setNewOrder({ ...newOrder, quantity: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={newOrder.price}
                  onChange={(e) => 
                    setNewOrder({ ...newOrder, price: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateOrder}>
                Create Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
          <CardDescription>View your recent order history</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stock</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.stockSymbol}
                    <span className="block text-xs text-gray-500">{order.stockName}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`capitalize ${order.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                      {order.type}
                    </span>
                  </TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>${order.price.toFixed(2)}</TableCell>
                  <TableCell>${(order.quantity * order.price).toFixed(2)}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.status}
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