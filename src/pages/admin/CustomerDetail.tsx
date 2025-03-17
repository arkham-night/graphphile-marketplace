
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, Mail, MapPin, Phone, ShoppingBag, User } from 'lucide-react';

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock customer data - in a real app, you'd fetch this based on the ID
  const customer = {
    id,
    name: 'Vikram Malhotra',
    email: 'vikram@example.com',
    phone: '+91 98765 43210',
    totalOrders: 12,
    totalSpent: 32850,
    lastPurchaseDate: '2023-07-28',
    status: 'active',
    dateJoined: '2022-11-15',
    addresses: [
      {
        id: '1',
        type: 'Billing & Shipping',
        addressLine1: '42 Park Avenue',
        addressLine2: 'Juhu',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400049',
        country: 'India',
        default: true,
      },
      {
        id: '2',
        type: 'Shipping Only',
        addressLine1: '101 Work Plaza',
        addressLine2: 'Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400050',
        country: 'India',
        default: false,
      },
    ],
    orders: [
      {
        id: 'ORD24001',
        date: '2023-07-28',
        status: 'delivered',
        total: 5499,
        items: 3,
      },
      {
        id: 'ORD23900',
        date: '2023-06-15',
        status: 'delivered',
        total: 2999,
        items: 1,
      },
      {
        id: 'ORD23850',
        date: '2023-05-20',
        status: 'delivered',
        total: 7999,
        items: 2,
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/admin/customers">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Customer Details</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="md:col-span-4">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{customer.name}</h2>
                    <div className="flex flex-col text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Mail className="h-3.5 w-3.5 mr-2" />
                        {customer.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-3.5 w-3.5 mr-2" />
                        {customer.phone}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline">Send Email</Button>
                  <Button>Edit Details</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 py-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Since</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{customer.dateJoined}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <div className="flex items-center mt-1">
                    <ShoppingBag className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{customer.totalOrders}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="font-medium text-lg">₹{customer.totalSpent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                    ${customer.status === 'active' ? 'bg-green-100 text-green-800' : 
                    customer.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    Last 3 orders from this customer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customer.orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex justify-between items-center">
                        <div>
                          <Link to={`/admin/orders/${order.id}`} className="font-medium hover:underline">
                            {order.id}
                          </Link>
                          <div className="text-sm text-muted-foreground">
                            {order.date} • {order.items} items
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{order.total.toLocaleString()}</div>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs
                            ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t text-center">
                    <Link to="#orders" onClick={() => setActiveTab('orders')}>
                      <Button variant="link" className="p-0 h-auto">View all orders</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Primary Address</CardTitle>
                  <CardDescription>
                    Default billing and shipping address
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {customer.addresses.find(addr => addr.default) ? (
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p>{customer.addresses[0].addressLine1}</p>
                          {customer.addresses[0].addressLine2 && <p>{customer.addresses[0].addressLine2}</p>}
                          <p>
                            {customer.addresses[0].city}, {customer.addresses[0].state} {customer.addresses[0].postalCode}
                          </p>
                          <p>{customer.addresses[0].country}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t text-center">
                        <Link to="#addresses" onClick={() => setActiveTab('addresses')}>
                          <Button variant="link" className="p-0 h-auto">Manage addresses</Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">No default address set</p>
                      <Button>Add Address</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  All orders placed by this customer
                </CardDescription>
              </CardHeader>
              <CardContent>
                {customer.orders.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-4 font-medium border-b bg-muted/50">
                      <div>Order</div>
                      <div>Date</div>
                      <div>Items</div>
                      <div>Status</div>
                      <div className="text-right">Total</div>
                    </div>
                    
                    {customer.orders.map((order) => (
                      <div key={order.id} className="grid grid-cols-5 p-4 border-b last:border-0">
                        <div>
                          <Link to={`/admin/orders/${order.id}`} className="font-medium hover:underline">
                            {order.id}
                          </Link>
                        </div>
                        <div>{order.date}</div>
                        <div>{order.items}</div>
                        <div>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs
                            ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="text-right font-medium">₹{order.total.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No orders found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="addresses" className="space-y-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">Saved Addresses</h3>
              <Button>Add New Address</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customer.addresses.map((address) => (
                <Card key={address.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{address.type}</span>
                      {address.default && (
                        <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-muted-foreground">
                      <p>{customer.name}</p>
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>
                        {address.city}, {address.state} {address.postalCode}
                      </p>
                      <p>{address.country}</p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t flex justify-end gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      {!address.default && (
                        <Button size="sm">Set as Default</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default CustomerDetail;
