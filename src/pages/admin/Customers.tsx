
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, MailIcon, PhoneIcon, UserPlus } from 'lucide-react';

const Customers = () => {
  // Mock customer data
  const customers = [
    {
      id: '1',
      name: 'Vikram Malhotra',
      email: 'vikram@example.com',
      phone: '+91 98765 43210',
      totalOrders: 12,
      totalSpent: 32850,
      lastPurchaseDate: '2023-07-28',
      status: 'active',
    },
    {
      id: '2',
      name: 'Ananya Singh',
      email: 'ananya@example.com',
      phone: '+91 87654 32109',
      totalOrders: 5,
      totalSpent: 12490,
      lastPurchaseDate: '2023-06-15',
      status: 'active',
    },
    {
      id: '3',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 76543 21098',
      totalOrders: 1,
      totalSpent: 2999,
      lastPurchaseDate: '2023-08-01',
      status: 'new',
    },
    {
      id: '4',
      name: 'Priya Patel',
      email: 'priya@example.com',
      phone: '+91 65432 10987',
      totalOrders: 0,
      totalSpent: 0,
      lastPurchaseDate: null,
      status: 'inactive',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Customers</h1>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-col md:flex-row gap-4">
            <Input className="max-w-xs" placeholder="Search customers..." />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">Export</Button>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {customers.map((customer) => (
            <Card key={customer.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex flex-col">
                      <Link to={`/admin/customers/${customer.id}`} className="text-lg font-medium hover:underline">
                        {customer.name}
                      </Link>
                      <div className="flex flex-col text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MailIcon className="h-3 w-3 mr-2" />
                          {customer.email}
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="h-3 w-3 mr-2" />
                          {customer.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 md:gap-8">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="font-medium">{customer.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="font-medium">₹{customer.totalSpent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Purchase</p>
                      <p className="font-medium">{customer.lastPurchaseDate || 'Never'}</p>
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
                  
                  <div className="md:min-w-32 flex items-center justify-end">
                    <Link to={`/admin/customers/${customer.id}`}>
                      <Button variant="outline" size="sm">
                        View
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Customers;
