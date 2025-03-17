
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, ChevronRight, Package, Truck } from 'lucide-react';

const Shipments = () => {
  // Mock shipment data
  const shipments = [
    {
      id: 'SHP10001',
      orderId: 'ORD24001',
      customer: 'Anil Kapoor',
      date: '2023-08-12',
      courier: 'Delhivery',
      trackingNumber: 'DL8374927493',
      status: 'in_transit',
      items: [
        { name: 'Premium Leather Wallet', quantity: 1 },
        { name: 'Classic White Sneakers', quantity: 1 },
      ],
    },
    {
      id: 'SHP10002',
      orderId: 'ORD23995',
      customer: 'Meena Iyer',
      date: '2023-08-11',
      courier: 'Blue Dart',
      trackingNumber: 'BD6473829102',
      status: 'delivered',
      items: [
        { name: 'Denim Jacket', quantity: 1 },
      ],
    },
    {
      id: 'SHP10003',
      orderId: 'ORD23990',
      customer: 'Suresh Patel',
      date: '2023-08-11',
      courier: 'DTDC',
      trackingNumber: 'DT9374628192',
      status: 'processing',
      items: [
        { name: 'Cotton T-Shirt', quantity: 2 },
        { name: 'Track Pants', quantity: 1 },
      ],
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Shipments</h1>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-col md:flex-row gap-4">
            <Input className="max-w-xs" placeholder="Search by order ID or tracking #..." />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Shipments</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button>Create Shipment</Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {shipments.map((shipment) => (
            <Card key={shipment.id}>
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    Shipment #{shipment.id}
                    <span className="text-sm font-normal text-muted-foreground">
                      for Order #{shipment.orderId}
                    </span>
                  </CardTitle>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                      ${shipment.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                        shipment.status === 'in_transit' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {shipment.status === 'delivered' && <Check className="h-3 w-3 mr-1" />}
                      {shipment.status === 'in_transit' && <Truck className="h-3 w-3 mr-1" />}
                      {shipment.status === 'processing' && <Package className="h-3 w-3 mr-1" />}
                      {shipment.status === 'delivered' ? 'Delivered' : 
                       shipment.status === 'in_transit' ? 'In Transit' : 'Processing'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-medium">{shipment.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Courier</p>
                    <p className="font-medium">{shipment.courier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tracking Number</p>
                    <p className="font-medium">{shipment.trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Shipment Date</p>
                    <p className="font-medium">{shipment.date}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Items</p>
                  <div className="space-y-2">
                    {shipment.items.map((item, index) => (
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
                  
                  {shipment.status !== 'delivered' && (
                    <Button variant="outline" size="sm">
                      Update Status
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm">
                    Print Label
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Shipments;
