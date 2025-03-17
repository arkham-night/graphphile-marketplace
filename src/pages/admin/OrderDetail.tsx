
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatIndianPrice } from '@/utils/animations';
import { 
  ArrowLeft, 
  Printer, 
  Download, 
  Phone, 
  Mail, 
  MapPin, 
  Truck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MessageCircle, 
  Package
} from 'lucide-react';

const AdminOrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, this would fetch the order data from an API
  const order = {
    id: id || 'ORD123456',
    customer: {
      name: 'Amit Sharma',
      email: 'amit.sharma@example.com',
      phone: '+91 98765 43210',
    },
    date: '2023-05-15',
    amount: 4999,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'UPI',
    shippingAddress: {
      line1: '123, Green Valley Apartments',
      line2: 'Sector 18, Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560034',
      country: 'India',
    },
    billingAddress: {
      line1: '123, Green Valley Apartments',
      line2: 'Sector 18, Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560034',
      country: 'India',
    },
    items: [
      {
        id: '1',
        name: 'Geometric Harmony T-Shirt',
        price: 1499,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        sku: 'TSH-GH-001',
        color: 'White',
        size: 'L',
      },
      {
        id: '3',
        name: 'Minimalist Line Art T-Shirt',
        price: 1299,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        sku: 'TSH-MLA-003',
        color: 'Black',
        size: 'M',
      },
    ],
    timeline: [
      {
        status: 'Order Placed',
        date: '2023-05-15 10:30 AM',
        description: 'Order #ORD123456 was placed',
      },
      {
        status: 'Payment Received',
        date: '2023-05-15 10:32 AM',
        description: 'Payment of ₹4,999 received via UPI',
      },
      {
        status: 'Processing',
        date: '2023-05-15 02:45 PM',
        description: 'Order has been processed and is being prepared for shipment',
      },
      {
        status: 'Shipped',
        date: '2023-05-16 11:20 AM',
        description: 'Order has been shipped via BlueExpress. Tracking #BDX7890123',
      },
      {
        status: 'Delivered',
        date: '2023-05-18 04:15 PM',
        description: 'Order has been delivered successfully',
      },
    ],
  };
  
  // Calculate order totals
  const subtotal = order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 2000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shippingCost + tax;
  
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
  
  const { component: statusBadge, icon: statusIcon } = getStatusBadge(order.status);
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Link to="/admin/orders">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Order {order.id}</h1>
            {statusBadge}
          </div>
          
          <div className="flex gap-2">
            <Select defaultValue={order.status}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Change status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Invoice
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order details */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-md bg-muted overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <div className="text-xs text-muted-foreground">
                                <span>SKU: {item.sku}</span>
                                <span className="mx-1">•</span>
                                <span>{item.color}</span>
                                <span className="mx-1">•</span>
                                <span>Size: {item.size}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{formatIndianPrice(item.price)}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-right">
                          {formatIndianPrice(item.price * item.quantity)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatIndianPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : formatIndianPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18% GST)</span>
                    <span>{formatIndianPrice(tax)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatIndianPrice(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="timeline">
              <TabsList className="w-full">
                <TabsTrigger value="timeline" className="flex-1">Order Timeline</TabsTrigger>
                <TabsTrigger value="notes" className="flex-1">Notes & Messages</TabsTrigger>
              </TabsList>
              
              <TabsContent value="timeline" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="relative border-l-2 pl-6 pb-2 space-y-6">
                      {order.timeline.map((event, index) => (
                        <div key={index} className="relative">
                          <div className="absolute -left-[33px] -top-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                            {index === 0 ? (
                              <Package className="h-3 w-3 text-white" />
                            ) : index === order.timeline.length - 1 ? (
                              <CheckCircle className="h-3 w-3 text-white" />
                            ) : (
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <div className="mb-1">
                            <span className="text-sm font-medium">{event.status}</span>
                            <span className="text-xs text-muted-foreground ml-2">{event.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notes" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <MessageCircle className="h-5 w-5 text-muted-foreground mr-2" />
                      <h3 className="font-medium">Order Notes & Customer Messages</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">No notes or messages for this order yet.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Customer and shipping details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="font-medium">{order.customer.name}</div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{order.customer.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{order.customer.phone}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Link to={`/admin/customers/1`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Customer
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{order.customer.name}</p>
                  <p>{order.shippingAddress.line1}</p>
                  {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span>{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Status</span>
                    <Badge className={order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction ID</span>
                    <span>TXN78901234</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrderDetail;
