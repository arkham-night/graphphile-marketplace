
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cross, Edit, Plus, Users } from 'lucide-react';

const Segments = () => {
  // Mock segment data
  const segments = [
    {
      id: '1',
      name: 'VIP Customers',
      description: 'Customers who have spent over ₹20,000',
      customerCount: 24,
      criteria: [
        { field: 'Total Spent', operator: 'greater than', value: '₹20,000' },
      ],
      createdDate: '2023-06-15',
    },
    {
      id: '2',
      name: 'New Customers',
      description: 'Customers who registered in the last 30 days',
      customerCount: 42,
      criteria: [
        { field: 'Registration Date', operator: 'is within', value: 'Last 30 days' },
      ],
      createdDate: '2023-07-10',
    },
    {
      id: '3',
      name: 'Active Buyers',
      description: 'Customers who have made a purchase in the last 60 days',
      customerCount: 78,
      criteria: [
        { field: 'Last Purchase', operator: 'is within', value: 'Last 60 days' },
        { field: 'Total Orders', operator: 'greater than', value: '2' },
      ],
      createdDate: '2023-05-22',
    },
    {
      id: '4',
      name: 'Mumbai Customers',
      description: 'Customers located in Mumbai',
      customerCount: 65,
      criteria: [
        { field: 'Location', operator: 'is', value: 'Mumbai' },
      ],
      createdDate: '2023-07-05',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Customer Segments</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Segment
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {segments.map((segment) => (
            <Card key={segment.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <CardTitle className="text-xl flex items-center">
                    {segment.name}
                  </CardTitle>
                </div>
                <CardDescription>{segment.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <div className="text-2xl font-bold">{segment.customerCount}</div>
                    <div className="text-xs text-muted-foreground">customers</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Segment Criteria:</p>
                  <div className="space-y-2">
                    {segment.criteria.map((criterion, index) => (
                      <div key={index} className="text-sm p-2 rounded-md bg-muted">
                        <span className="font-medium">{criterion.field}</span> {criterion.operator} <span className="font-medium">{criterion.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <div className="text-xs text-muted-foreground">
                    Created on {segment.createdDate}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Cross className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Delete</span>
                    </Button>
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

export default Segments;
