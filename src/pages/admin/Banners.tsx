
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Edit, Image, Trash2 } from 'lucide-react';

const Banners = () => {
  // Mock banners data
  const banners = [
    {
      id: '1',
      name: 'Summer Sale Banner',
      image: '/placeholder.svg',
      location: 'homepage_hero',
      startDate: '2023-08-01',
      endDate: '2023-08-31',
      active: true,
    },
    {
      id: '2',
      name: 'New Collection Promo',
      image: '/placeholder.svg',
      location: 'category_pages',
      startDate: '2023-08-15',
      endDate: '2023-09-15',
      active: true,
    },
    {
      id: '3',
      name: 'Seasonal Discount',
      image: '/placeholder.svg',
      location: 'product_pages',
      startDate: '2023-09-01',
      endDate: '2023-09-30',
      active: false,
    },
    {
      id: '4',
      name: 'Festival Special Offer',
      image: '/placeholder.svg',
      location: 'homepage_middle',
      startDate: '2023-10-01',
      endDate: '2023-10-31',
      active: false,
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Banner Management</h1>
          <Button>
            <Image className="h-4 w-4 mr-2" />
            Create Banner
          </Button>
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <Input className="max-w-xs" placeholder="Search banners..." />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Banners</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="homepage_hero">Homepage Hero</SelectItem>
              <SelectItem value="homepage_middle">Homepage Middle</SelectItem>
              <SelectItem value="category_pages">Category Pages</SelectItem>
              <SelectItem value="product_pages">Product Pages</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          {banners.map((banner) => (
            <Card key={banner.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-64 h-32 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={banner.image} 
                      alt={banner.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">{banner.name}</h3>
                      <div className="flex items-center mt-2 md:mt-0">
                        <div className="flex items-center mr-4">
                          <Checkbox 
                            id={`active-${banner.id}`} 
                            checked={banner.active} 
                            className="mr-2"
                          />
                          <label htmlFor={`active-${banner.id}`} className="text-sm">
                            Active
                          </label>
                        </div>
                        
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="text-sm text-muted-foreground w-24">Location:</span>
                        <span className="text-sm capitalize">
                          {banner.location.replace('_', ' ').replace('homepage', 'Homepage')}
                        </span>
                      </div>
                      
                      <div className="flex">
                        <span className="text-sm text-muted-foreground w-24">Schedule:</span>
                        <span className="text-sm flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {banner.startDate} to {banner.endDate}
                        </span>
                      </div>
                      
                      <div className="flex">
                        <span className="text-sm text-muted-foreground w-24">Status:</span>
                        <span className={`text-sm px-2 py-0.5 rounded-full inline-flex items-center
                          ${banner.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {banner.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">Preview</Button>
                        <Button variant="outline" size="sm">View Statistics</Button>
                      </div>
                    </div>
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

export default Banners;
