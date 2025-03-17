
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, FileText, Plus, Trash2 } from 'lucide-react';

const ContentBlocks = () => {
  // Mock content blocks data
  const contentBlocks = [
    {
      id: '1',
      name: 'About Us Section',
      type: 'text',
      lastUpdated: '2023-07-20',
      usedIn: ['About Page', 'Homepage'],
      status: 'published',
    },
    {
      id: '2',
      name: 'Shipping & Returns',
      type: 'text',
      lastUpdated: '2023-07-15',
      usedIn: ['Product Page', 'Footer'],
      status: 'published',
    },
    {
      id: '3',
      name: 'Size Guide',
      type: 'html',
      lastUpdated: '2023-08-01',
      usedIn: ['Product Page'],
      status: 'published',
    },
    {
      id: '4',
      name: 'Store Locator',
      type: 'map',
      lastUpdated: '2023-06-30',
      usedIn: ['Contact Page'],
      status: 'published',
    },
    {
      id: '5',
      name: 'Holiday Announcement',
      type: 'text',
      lastUpdated: '2023-08-05',
      usedIn: [],
      status: 'draft',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Content Blocks</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Block
          </Button>
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <Input className="max-w-xs" placeholder="Search content blocks..." />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="map">Map</SelectItem>
              <SelectItem value="video">Video</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="overflow-hidden rounded-md border">
          <div className="bg-muted/50">
            <div className="grid grid-cols-10 p-4 text-sm font-medium">
              <div className="col-span-4">Name</div>
              <div className="col-span-1">Type</div>
              <div className="col-span-2">Last Updated</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
          </div>
          
          <div>
            {contentBlocks.map((block) => (
              <div key={block.id} className="grid grid-cols-10 p-4 border-t items-center text-sm">
                <div className="col-span-4">
                  <div className="font-medium">{block.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {block.usedIn.length > 0 ? (
                      <>Used in: {block.usedIn.join(', ')}</>
                    ) : (
                      'Not in use'
                    )}
                  </div>
                </div>
                <div className="col-span-1 capitalize">{block.type}</div>
                <div className="col-span-2">{block.lastUpdated}</div>
                <div className="col-span-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                    ${block.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {block.status.charAt(0).toUpperCase() + block.status.slice(1)}
                  </span>
                </div>
                <div className="col-span-2 text-right space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Recently Edited</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contentBlocks.slice(0, 3).map((block) => (
              <Card key={block.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="bg-muted h-8 w-8 rounded-md flex items-center justify-center mr-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">{block.name}</h3>
                        <p className="text-xs text-muted-foreground capitalize">{block.type}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm mt-3 pt-3 border-t flex justify-between">
                    <span className="text-muted-foreground">Last updated: {block.lastUpdated}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                      ${block.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {block.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContentBlocks;
