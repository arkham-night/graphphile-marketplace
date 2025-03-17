
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Image, Plus, Search, Filter, MoreHorizontal, Trash, Download, FolderOpen } from 'lucide-react';

const Media = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock media data
  const mediaItems = [
    { id: '1', name: 'product-hero-1.jpg', type: 'image', size: '245 KB', dimensions: '1200 x 800', uploaded: '2023-07-15', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
    { id: '2', name: 'banner-summer.jpg', type: 'image', size: '1.2 MB', dimensions: '1920 x 600', uploaded: '2023-07-10', url: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8' },
    { id: '3', name: 'product-detail-2.jpg', type: 'image', size: '380 KB', dimensions: '1200 x 1200', uploaded: '2023-07-05', url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a' },
    { id: '4', name: 'catalog-video.mp4', type: 'video', size: '8.5 MB', dimensions: '1920 x 1080', uploaded: '2023-06-28', url: 'https://example.com/video' },
    { id: '5', name: 'lookbook-spring.pdf', type: 'document', size: '3.2 MB', dimensions: '-', uploaded: '2023-06-20', url: 'https://example.com/document' },
    { id: '6', name: 'product-white-shoes.jpg', type: 'image', size: '420 KB', dimensions: '1200 x 1200', uploaded: '2023-06-15', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772' },
  ];
  
  // Filter media based on active tab and search query
  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeTab === 'all' || 
                        (activeTab === 'images' && item.type === 'image') ||
                        (activeTab === 'videos' && item.type === 'video') ||
                        (activeTab === 'documents' && item.type === 'document');
    return matchesSearch && matchesType;
  });
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Media Library</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Media</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select defaultValue="date">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date Uploaded</SelectItem>
                  <SelectItem value="name">File Name</SelectItem>
                  <SelectItem value="size">File Size</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.length > 0 ? (
                filteredMedia.map((item) => (
                  <MediaCard key={item.id} item={item} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No media files found matching your criteria
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="images" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.length > 0 ? (
                filteredMedia.map((item) => (
                  <MediaCard key={item.id} item={item} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No image files found matching your criteria
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.length > 0 ? (
                filteredMedia.map((item) => (
                  <MediaCard key={item.id} item={item} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No video files found matching your criteria
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.length > 0 ? (
                filteredMedia.map((item) => (
                  <MediaCard key={item.id} item={item} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No document files found matching your criteria
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

// Media Card Component
const MediaCard = ({ item }: { item: any }) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative bg-muted flex items-center justify-center">
        {item.type === 'image' ? (
          <img 
            src={item.url} 
            alt={item.name} 
            className="h-full w-full object-cover"
          />
        ) : item.type === 'video' ? (
          <div className="flex flex-col items-center justify-center h-full w-full bg-black text-white">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs mt-2">Video File</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full bg-blue-50 text-blue-500">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs mt-2">Document</span>
          </div>
        )}
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div className="truncate pr-2">
            <p className="font-medium text-sm truncate" title={item.name}>
              {item.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {item.dimensions} • {item.size}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Image className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FolderOpen className="h-4 w-4 mr-2" />
                Add to Folder
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default Media;
