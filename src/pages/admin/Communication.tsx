
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Mail, MessageSquare, Plus, Send, Users } from 'lucide-react';

const Communication = () => {
  // Mock campaigns data
  const emailCampaigns = [
    {
      id: '1',
      name: 'Summer Sale Announcement',
      subject: 'Exclusive Summer Sale - Up to 50% Off!',
      audience: 'All Customers',
      status: 'sent',
      sentDate: '2023-07-10',
      openRate: '35%',
      clickRate: '12%',
    },
    {
      id: '2',
      name: 'New Collection Launch',
      subject: 'Introducing Our Latest Collection',
      audience: 'VIP Customers',
      status: 'scheduled',
      scheduledDate: '2023-08-15',
      scheduledTime: '10:00 AM',
    },
    {
      id: '3',
      name: 'Welcome Email Series',
      subject: 'Welcome to Our Store - Here\'s What You Need to Know',
      audience: 'New Customers',
      status: 'draft',
      lastEdited: '2023-08-01',
    },
  ];
  
  const smsMessages = [
    {
      id: '1',
      name: 'Flash Sale Alert',
      content: 'Flash Sale! Get 30% off on all products for the next 24 hours. Shop now: link.to/shop',
      audience: 'All Customers',
      status: 'sent',
      sentDate: '2023-07-20',
      deliveryRate: '95%',
    },
    {
      id: '2',
      name: 'Abandoned Cart Reminder',
      content: 'You left items in your cart! Complete your purchase now to avoid missing out: link.to/cart',
      audience: 'Cart Abandoners',
      status: 'active',
      triggered: 'On cart abandonment',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Communication</h1>
        </div>
        
        <Tabs defaultValue="email" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
            <TabsTrigger value="email">Email Campaigns</TabsTrigger>
            <TabsTrigger value="sms">SMS Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Email Campaigns</h2>
                <p className="text-muted-foreground">Create and manage email campaigns</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>
            
            <div className="flex mb-4">
              <Input className="max-w-xs" placeholder="Search campaigns..." />
            </div>
            
            <div className="space-y-4">
              {emailCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">{campaign.name}</h3>
                        <p className="text-muted-foreground">Subject: {campaign.subject}</p>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{campaign.audience}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col mt-4 md:mt-0 md:items-end">
                        <div className="flex items-center mb-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                            ${campaign.status === 'sent' ? 'bg-green-100 text-green-800' : 
                              campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {campaign.status === 'sent' ? 'Sent' : 
                             campaign.status === 'scheduled' ? 'Scheduled' : 'Draft'}
                          </span>
                        </div>
                        
                        {campaign.status === 'sent' && (
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            Sent on {campaign.sentDate}
                          </div>
                        )}
                        
                        {campaign.status === 'scheduled' && (
                          <div className="text-sm text-muted-foreground flex flex-col">
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              {campaign.scheduledDate}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              {campaign.scheduledTime}
                            </div>
                          </div>
                        )}
                        
                        {campaign.status === 'draft' && (
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            Last edited {campaign.lastEdited}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {campaign.status === 'sent' && (
                      <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Open Rate</p>
                          <p className="font-medium">{campaign.openRate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Click Rate</p>
                          <p className="font-medium">{campaign.clickRate}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      
                      {campaign.status === 'draft' && (
                        <Button size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Continue Editing
                        </Button>
                      )}
                      
                      {campaign.status === 'scheduled' && (
                        <Button size="sm" variant="destructive">
                          Cancel Schedule
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sms" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">SMS Messages</h2>
                <p className="text-muted-foreground">Create and manage SMS communications</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create SMS
              </Button>
            </div>
            
            <div className="flex mb-4">
              <Input className="max-w-xs" placeholder="Search messages..." />
            </div>
            
            <div className="space-y-4">
              {smsMessages.map((message) => (
                <Card key={message.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">{message.name}</h3>
                        <p className="text-muted-foreground border-l-4 pl-3 py-1 border-muted">
                          {message.content}
                        </p>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{message.audience}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col mt-4 md:mt-0 md:items-end">
                        <div className="flex items-center mb-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                            ${message.status === 'sent' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'}`}>
                            {message.status === 'sent' ? 'Sent' : 'Active Trigger'}
                          </span>
                        </div>
                        
                        {message.status === 'sent' && (
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            Sent on {message.sentDate}
                          </div>
                        )}
                        
                        {message.status === 'active' && (
                          <div className="text-sm text-muted-foreground flex items-center">
                            <MessageSquare className="h-3.5 w-3.5 mr-1" />
                            Trigger: {message.triggered}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {message.status === 'sent' && (
                      <div className="mt-4 pt-4 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground">Delivery Rate</p>
                          <p className="font-medium">{message.deliveryRate}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      
                      {message.status === 'active' && (
                        <Button size="sm" variant="destructive">
                          Deactivate
                        </Button>
                      )}
                      
                      {message.status === 'sent' && (
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Send Again
                        </Button>
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

export default Communication;
