
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { formatIndianPrice } from '@/utils/animations';
import { Search, Filter, Download, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Dummy order data
  const orders = [
    {
      id: 'ORD123456',
      customer: 'Amit Sharma',
      date: '2023-05-15',
      amount: 4999,
      status: 'delivered',
      items: 3,
      paymentMethod: 'UPI',
    },
    {
      id: 'ORD123457',
      customer: 'Priya Patel',
      date: '2023-05-16',
      amount: 2499,
      status: 'processing',
      items: 1,
      paymentMethod: 'Credit Card',
    },
    {
      id: 'ORD123458',
      customer: 'Rahul Verma',
      date: '2023-05-16',
      amount: 9499,
      status: 'pending',
      items: 4,
      paymentMethod: 'Cash on Delivery',
    },
    {
      id: 'ORD123459',
      customer: 'Anjali Singh',
      date: '2023-05-17',
      amount: 1999,
      status: 'cancelled',
      items: 1,
      paymentMethod: 'Debit Card',
    },
    {
      id: 'ORD123460',
      customer: 'Vikram Reddy',
      date: '2023-05-17',
      amount: 6999,
      status: 'delivered',
      items: 2,
      paymentMethod: 'Net Banking',
    },
  ];
  
  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return { 
          component: <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>,
          icon: <CheckCircle className="h-4 w-4 text-green-500" />
        };
      case 'processing':
        return { 
          component: <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>,
          icon: <Truck className="h-4 w-4 text-blue-500" />
        };
      case 'pending':
        return { 
          component: <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>,
          icon: <Clock className="h-4 w-4 text-yellow-500" />
        };
      case 'cancelled':
        return { 
          component: <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>,
          icon: <XCircle className="h-4 w-4 text-red-500" />
        };
      default:
        return { 
          component: <Badge>Unknown</Badge>,
          icon: null
        };
    }
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Orders</h1>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Orders
          </Button>
        </div>
        
        {/* Order summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">32</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-md">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+12% from last month</p>
          </div>
          
          <div className="bg-white rounded-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-md">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-yellow-600 mt-2">Needs attention</p>
          </div>
          
          <div className="bg-white rounded-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="p-2 bg-green-100 rounded-md">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">On time delivery rate 98%</p>
          </div>
          
          <div className="bg-white rounded-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Cancelled</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-2 bg-red-100 rounded-md">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Cancellation rate 6.25%</p>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders by ID or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
        
        {/* Orders table */}
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No orders found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => {
                  const { component: statusBadge, icon: statusIcon } = getStatusBadge(order.status);
                  
                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Link 
                          to={`/admin/orders/${order.id}`}
                          className="font-medium hover:text-primary"
                        >
                          {order.id}
                        </Link>
                      </TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString('en-IN')}</TableCell>
                      <TableCell>{formatIndianPrice(order.amount)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {statusIcon}
                          {statusBadge}
                        </div>
                      </TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>{order.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        <Link to={`/admin/orders/${order.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
