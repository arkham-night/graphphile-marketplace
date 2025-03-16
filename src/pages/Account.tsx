
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { User, Package, MapPin, CreditCard, LogOut, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AccountPage = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
  };

  // Mock order data
  const orders = [
    { id: 'ORD-12345', date: '2023-06-15', status: 'Delivered', total: 1250 },
    { id: 'ORD-12346', date: '2023-07-22', status: 'Processing', total: 850 },
  ];

  // Mock address data
  const addresses = [
    { 
      id: 1, 
      name: 'Home', 
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 9876543210',
      isDefault: true
    }
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold tracking-tight text-blue-900"
            >
              My Account
            </motion.h1>
            <p className="text-muted-foreground mt-2">
              Manage your profile, orders, and preferences
            </p>
          </div>
          
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="bg-blue-50 p-1 rounded-lg">
              <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:text-blue-900">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-white data-[state=active]:text-blue-900">
                <Package className="h-4 w-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="addresses" className="data-[state=active]:bg-white data-[state=active]:text-blue-900">
                <MapPin className="h-4 w-4 mr-2" />
                Addresses
              </TabsTrigger>
              <TabsTrigger value="payment" className="data-[state=active]:bg-white data-[state=active]:text-blue-900">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Methods
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your account details and personal information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={user.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue={user.email} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue={user.phone} />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          className="bg-blue-800 hover:bg-blue-700 text-white"
                          disabled={saving}
                        >
                          {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>
                      Manage your password and account security settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div></div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-blue-800 hover:bg-blue-700 text-white">
                          Update Password
                        </Button>
                      </div>
                      
                      <div className="pt-6 border-t border-border">
                        <Button variant="destructive" className="flex items-center">
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>
                      View and manage your previous orders.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
                        <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                        <p className="mt-2 text-muted-foreground">
                          When you place orders, they will appear here.
                        </p>
                        <Button className="mt-4 bg-blue-800 hover:bg-blue-700 text-white">
                          Start Shopping
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y divide-border">
                        {orders.map((order) => (
                          <div key={order.id} className="py-4 first:pt-0 last:pb-0">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                              <div>
                                <h4 className="font-medium">{order.id}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Placed on {new Date(order.date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <span className={cn(
                                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2",
                                  order.status === 'Delivered' 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-yellow-100 text-yellow-800"
                                )}>
                                  {order.status}
                                </span>
                                <span className="font-medium">₹{order.total}</span>
                              </div>
                            </div>
                            <div className="mt-4 flex space-x-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              {order.status === 'Delivered' && (
                                <Button variant="outline" size="sm">
                                  Buy Again
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="addresses" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Saved Addresses</CardTitle>
                      <CardDescription>
                        Manage your shipping and billing addresses.
                      </CardDescription>
                    </div>
                    <Button className="bg-blue-800 hover:bg-blue-700 text-white">
                      Add New Address
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {addresses.length === 0 ? (
                      <div className="text-center py-12">
                        <MapPin className="mx-auto h-12 w-12 text-muted-foreground/50" />
                        <h3 className="mt-4 text-lg font-medium">No addresses saved</h3>
                        <p className="mt-2 text-muted-foreground">
                          Add shipping addresses to make checkout faster.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map((address) => (
                          <div 
                            key={address.id} 
                            className={cn(
                              "p-4 border rounded-lg relative",
                              address.isDefault ? "border-blue-500 bg-blue-50" : "border-border"
                            )}
                          >
                            {address.isDefault && (
                              <span className="absolute top-2 right-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                            <h4 className="font-medium">{address.name}</h4>
                            <p className="text-sm mt-1">{address.address}</p>
                            <p className="text-sm">
                              {address.city}, {address.state} {address.pincode}
                            </p>
                            <p className="text-sm mt-1">{address.phone}</p>
                            
                            <div className="flex space-x-2 mt-4">
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm" variant="outline" className="text-destructive">Delete</Button>
                              {!address.isDefault && (
                                <Button size="sm" variant="outline">Set as Default</Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="payment" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>
                        Manage your saved payment methods.
                      </CardDescription>
                    </div>
                    <Button className="bg-blue-800 hover:bg-blue-700 text-white">
                      Add Payment Method
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <CreditCard className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-medium">No payment methods saved</h3>
                      <p className="mt-2 text-muted-foreground">
                        Add a payment method to make checkout faster.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      View your transaction history.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">
                        Once you make a purchase, your transactions will appear here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
