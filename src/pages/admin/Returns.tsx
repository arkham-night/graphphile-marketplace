
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, ChevronRight, RefreshCcw, X } from 'lucide-react';

const Returns = () => {
  // Mock return data
  const returns = [
    {
      id: 'RTN10001',
      orderId: 'ORD23957',
      customer: 'Vikram Malhotra',
      date: '2023-08-10',
      items: [{ name: 'Classic White Sneakers', quantity: 1 }],
      reason: 'Wrong size',
      status: 'pending',
      refundAmount: 2499,
    },
    {
      id: 'RTN10002',
      orderId: 'ORD23890',
      customer: 'Neha Sharma',
      date: '2023-08-09',
      items: [{ name: 'Denim Jacket', quantity: 1 }],
      reason: 'Damaged product',
      status: 'approved',
      refundAmount: 3999,
    },
    {
      id: 'RTN10003',
      orderId: 'ORD23845',
      customer: 'Rajesh Kumar',
      date: '2023-08-08',
      items: [{ name: 'Cotton T-Shirt', quantity: 2 }],
      reason: 'Didn\'t like the color',
      status: 'completed',
      refundAmount: 1998,
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Returns & Refunds</h1>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-col md:flex-row gap-4">
            <Input className="max-w-xs" placeholder="Search by order ID or customer..." />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Returns</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          {returns.map((returnItem) => (
            <Card key={returnItem.id}>
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    Return #{returnItem.id}
                    <span className="text-sm font-normal text-muted-foreground">
                      for Order #{returnItem.orderId}
                    </span>
                  </CardTitle>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                      ${returnItem.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        returnItem.status === 'approved' ? 'bg-blue-100 text-blue-800' : 
                        returnItem.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {returnItem.status === 'completed' && <Check className="h-3 w-3 mr-1" />}
                      {returnItem.status === 'approved' && <RefreshCcw className="h-3 w-3 mr-1" />}
                      {returnItem.status === 'pending' && <div className="h-2 w-2 rounded-full bg-yellow-400 mr-1" />}
                      {returnItem.status === 'rejected' && <X className="h-3 w-3 mr-1" />}
                      {returnItem.status.charAt(0).toUpperCase() + returnItem.status.slice(1)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-medium">{returnItem.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Return Date</p>
                    <p className="font-medium">{returnItem.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reason</p>
                    <p className="font-medium">{returnItem.reason}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Refund Amount</p>
                    <p className="font-medium">₹{returnItem.refundAmount.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Items</p>
                  <div className="space-y-2">
                    {returnItem.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.quantity} × {item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  {returnItem.status === 'pending' && (
                    <>
                      <Button variant="outline" size="sm">Reject</Button>
                      <Button size="sm">Approve</Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Returns;
